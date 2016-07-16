using System;
using System.Collections.Generic;
using System.Linq;
using Glimpse.Agent.Internal.Inspectors.Mvc.Proxies;
using Glimpse.Agent.Messages;
using Glimpse.Internal;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.DiagnosticAdapter;
using Microsoft.Extensions.Logging;

namespace Glimpse.Agent.Internal.Inspectors
{
    public partial class WebDiagnosticsInspector
    {
        partial void MvcOnCreated()
        {
            _proxyAdapter.Register("Microsoft.AspNet.Mvc.ViewResult");
            _proxyAdapter.Register("Microsoft.AspNet.Mvc.ContentResult");
            _proxyAdapter.Register("Microsoft.AspNet.Mvc.ObjectResult");
            _proxyAdapter.Register("Microsoft.AspNet.Routing.Template.TemplateRoute");
            _proxyAdapter.Register("Microsoft.AspNet.Mvc.Controllers.ControllerActionDescriptor");
            _proxyAdapter.Register("Microsoft.AspNet.Mvc.Abstractions.ActionDescriptor");
            _proxyAdapter.Register("Microsoft.AspNet.Mvc.FileResult");
        }

        // NOTE: This event is the start of the action pipeline. The action has been selected, the route
        //       has been selected but no filters have run and model binding hasn't occured.
        [DiagnosticName("Microsoft.AspNet.Mvc.BeforeAction")]
        public void OnBeforeAction(object actionDescriptor, HttpContext httpContext, IRouteData routeData)
        {
            var startDateTime = DateTime.UtcNow;
            var typedActionDescriptor = ConvertActionDescriptor(actionDescriptor);

            var message = new BeforeActionMessage
            {
                ActionId = typedActionDescriptor.Id,
                ActionDisplayName = typedActionDescriptor.DisplayName,
                ActionName = typedActionDescriptor.Name,
                ActionControllerName = typedActionDescriptor.ControllerName,
                ActionStartTime = startDateTime,
                RouteData = routeData.Values?.ToDictionary(x => x.Key, x => x.Value?.ToString())
            };

            // NOTE: Template data is only available in the TemplateRoute, so we need to try and 
            //       promote that type into something we can use
            var router = routeData.Routers[routeData.Routers.Count - 2];
            if (router.GetType().FullName == "Microsoft.AspNet.Routing.Template.TemplateRoute")
            {
                var templateRoute = _proxyAdapter.Process<IRouter>("Microsoft.AspNet.Routing.Template.TemplateRoute", router);
                
                message.RouteName = templateRoute.Name;
                message.RoutePattern = templateRoute.RouteTemplate;
                message.RouteConfiguration = templateRoute.ParsedTemplate?.Parameters?.ToDictionary(x => x.Name,
                    x => new RouteConfigurationData { Default = x.DefaultValue?.ToString(), Optional = x.IsOptional });
            }

            _broker.BeginLogicalOperation(message, startDateTime);
            _broker.SendMessage(message);
        }

        [DiagnosticName("Microsoft.AspNet.Mvc.AfterAction")]
        public void OnAfterAction(object actionDescriptor, HttpContext httpContext)
        {
            var timing = _broker.EndLogicalOperation<BeforeActionMessage>();
            if (timing != null)
            {
                var typedActionDescriptor = ConvertActionDescriptor(actionDescriptor);

                var message = new AfterActionMessage()
                {
                    ActionId = typedActionDescriptor.Id,
                    ActionName = typedActionDescriptor.Name,
                    ActionControllerName = typedActionDescriptor.ControllerName,
                    ActionEndTime = timing.End,
                    ActionDuration = timing.Elapsed,
                    ActionOffset = timing.Offset
                };

                _broker.SendMessage(message);
            }
            else
            {
                _logger.LogCritical("OnAfterAction: Couldn't publish `AfterActionMessage` as `BeforeActionMessage` wasn't found in stack");
            }
        }

        // NOTE: This event is the start of the action execution. The action has been selected, the route
        //       has been selected, filters have run and model binding has occured.
        [DiagnosticName("Microsoft.AspNet.Mvc.BeforeActionMethod")]
        public void OnBeforeActionMethod(
            IActionContext actionContext,
            IDictionary<string, object> arguments)
        {
            var startDateTime = DateTime.UtcNow;
            var actionDescriptor = ConvertActionDescriptor(actionContext.ActionDescriptor);

            var message = new BeforeActionInvokedMessage
            {
                ActionId = actionDescriptor.Id,
                ActionDisplayName = actionDescriptor.DisplayName,
                ActionName = actionDescriptor.Name,
                ActionControllerName = actionDescriptor.ControllerName,
                ActionTargetClass = actionDescriptor.ControllerTypeInfo.Name,
                ActionTargetMethod = actionDescriptor.MethodInfo.Name,
                ActionInvokedStartTime = startDateTime,
                Binding = arguments?.Select(x => new BindingData { Type = TypeNameHelper.GetTypeDisplayName(x.Value, false), TypeFullName = TypeNameHelper.GetTypeDisplayName(x.Value), Name = x.Key, Value = SanitizeUserObjectsHelper.GetSafeObject(x.Value) }).ToList()
            };

            _broker.BeginLogicalOperation(message, startDateTime);
            _broker.SendMessage(message);
        }

        [DiagnosticName("Microsoft.AspNet.Mvc.AfterActionMethod")]
        public void OnAfterActionMethod(
            IActionContext actionContext)
        {
            var timing = _broker.EndLogicalOperation<BeforeActionInvokedMessage>();
            if (timing != null)
            {
                var actionDescriptor = ConvertActionDescriptor(actionContext.ActionDescriptor);

                var message = new AfterActionInvokedMessage()
                {
                    ActionId = actionDescriptor.Id,
                    ActionName = actionDescriptor.Name,
                    ActionControllerName = actionDescriptor.ControllerName,
                    ActionInvokedEndTime = timing.End,
                    ActionInvokedDuration = timing.Elapsed,
                    ActionInvokedOffset = timing.Offset
                };

                _broker.SendMessage(message);
            }
            else
            {
                _logger.LogCritical("OnAfterActionMethod: Couldn't publish `AfterActionInvokedMessage` as `BeforeActionInvokedMessage` wasn't found in stack");
            }
        }

        // NOTE: This event is the start of the result pipeline. The action has been executed, but
        //       we haven't yet determined which view (if any) will handle the request
        [DiagnosticName("Microsoft.AspNet.Mvc.BeforeActionResult")]
        public void OnBeforeActionResult(
            IActionContext actionContext,
            object result)
        {
            var startDateTime = DateTime.UtcNow;
            var actionDescriptor = ConvertActionDescriptor(actionContext.ActionDescriptor);

            // TODO: Need to work off the inheritence chain 
            //var inheritancHierarchy = result.GetType().GetInheritancHierarchy().ToList();

            // TODO: currently looking to see if this switch code and ProxyAdapter can be
            //       consumed by Microsoft.Extensions.DiagnosticAdapter
            var message = (BeforeActionResultMessage)null;
            switch (result.GetType().FullName)
            {
                case "Microsoft.AspNet.Mvc.ViewResult":
                    var viewResult = _proxyAdapter.Process<ActionResultTypes.IViewResult>("Microsoft.AspNet.Mvc.ViewResult", result);

                    message = new BeforeActionViewResultMessage
                    {
                        ViewName = viewResult.ViewName,
                        StatusCode = viewResult.StatusCode,
                        ContentType = viewResult.ContentType?.ToString()
                    };

                    break;
                case "Microsoft.AspNet.Mvc.ContentResult":
                    var contentResult = _proxyAdapter.Process<ActionResultTypes.IContentResult>("Microsoft.AspNet.Mvc.ContentResult", result);

                    message = new BeforeActionContentResultMessage
                    {
                        StatusCode = contentResult.StatusCode,
                        Content = contentResult.Content,
                        ContentType = contentResult.ContentType?.ToString()
                    };

                    break;
                case "Microsoft.AspNet.Mvc.ObjectResult":
                    var objectResult = _proxyAdapter.Process<ActionResultTypes.IObjectResult>("Microsoft.AspNet.Mvc.ContentResult", result);

                    message = new BeforeActionObjectResultMessage
                    {
                        StatusCode = objectResult.StatusCode,
                        //Value = objectResult.Value,
                        //Formatters = objectResult.Formatters?.Select(x => x.GetType()).ToList(),
                        //ContentTypes = objectResult.ContentTypes?.Select(x => x.ToString()).ToList()
                    };

                    break;
               /* case "Microsoft.AspNet.Mvc.FileResult":
                case "Microsoft.AspNet.Mvc.FileContentResult":
                case "Microsoft.AspNet.Mvc.FileStreamResult":
                    var fileResult = _proxyAdapter.Process<ActionResultTypes.IFileResult>("Microsoft.AspNet.Mvc.FileResult", result);

                    message = new BeforeActionFileResultMessage
                    {
                        FileDownloadName = fileResult.FileDownloadName,
                        ContentType = fileResult.ContentType
                    };

                    break;*/
                default:
                    message = new BeforeActionResultMessage();

                    break;
            }

            // TODO: Need to implement the following 
            // https://github.com/aspnet/Mvc/blob/dev/src/Microsoft.AspNet.Mvc.Formatters.Json/JsonResult.cs
            // https://github.com/aspnet/Mvc/blob/dev/src/Microsoft.AspNet.Mvc.Core/RedirectResult.cs
            // https://github.com/aspnet/Mvc/blob/dev/src/Microsoft.AspNet.Mvc.Core/RedirectToRouteResult.cs
            // https://github.com/aspnet/Mvc/blob/dev/src/Microsoft.AspNet.Mvc.Core/HttpStatusCodeResult.cs

            message.ActionId = actionDescriptor.Id;
            message.ActionDisplayName = actionDescriptor.DisplayName;
            message.ActionName = actionDescriptor.Name;
            message.ActionControllerName = actionDescriptor.ControllerName;
            message.ActionResultStartTime = startDateTime;

            _broker.BeginLogicalOperation(message, startDateTime);
            _broker.SendMessage(message);
        }

        [DiagnosticName("Microsoft.AspNet.Mvc.AfterActionResult")]
        public void OnAfterActionResult(
            IActionContext actionContext,
            IActionResult result)
        {
            var timing = _broker.EndLogicalOperation<BeforeActionResultMessage>();
            if (timing != null)
            {
                var actionDescriptor = ConvertActionDescriptor(actionContext.ActionDescriptor);

                var message = new AfterActionResultMessage()
                {
                    ActionId = actionDescriptor.Id,
                    ActionName = actionDescriptor.Name,
                    ActionControllerName = actionDescriptor.ControllerName,
                    ActionResultEndTime = timing.End,
                    ActionResultDuration = timing.Elapsed,
                    ActionResultOffset = timing.Offset
                };

                _broker.SendMessage(message);
            }
            else
            {
                _logger.LogCritical("OnAfterActionResult: Couldn't publish `AfterActionResultMessage` as `BeforeActionResultMessage` wasn't found in stack");
            }
        }

        // NOTE: This event is only fired when we dont find any matches at all. This executes
        //       at the end of the matching process. You will never get a ViewResultViewNotFound 
        //       and ViewResultViewFound event firing for the same view resolution.
        [DiagnosticName("Microsoft.AspNet.Mvc.ViewNotFound")]
        public void OnViewResultViewNotFound(
            IActionContext actionContext,
            ActionResultTypes.IViewResult result,
            string viewName,
            IReadOnlyList<string> searchedLocations)
        {
            var actionDescriptor = ConvertActionDescriptor(actionContext.ActionDescriptor);

            var message = new ActionViewNotFoundMessage()
            {
                ActionId = actionDescriptor.Id,
                ActionName = actionDescriptor.Name,
                ActionControllerName = actionDescriptor.ControllerName,
                ViewName = viewName,
                ViewSearchedLocations = searchedLocations,
                ViewDidFind = false,
                ViewSearchedTime = DateTime.UtcNow
            };

            _broker.SendMessage(message);
        }

        // NOTE: This event is only fired when we do find a match. This executes at the end of
        //       the matching process. You will never get a ViewResultViewNotFound and 
        //       ViewResultViewFound event firing for the same view resolution.
        [DiagnosticName("Microsoft.AspNet.Mvc.ViewFound")]
        public void OnViewResultViewFound(
            IActionContext actionContext,
            object result,
            string viewName,
            IView view)
        {
            var actionDescriptor = ConvertActionDescriptor(actionContext.ActionDescriptor);

            var message = new ActionViewDidFoundMessage
            {
                ActionId = actionDescriptor.Id,
                ActionName = actionDescriptor.Name,
                ActionControllerName = actionDescriptor.ControllerName,
                ViewName = viewName,
                ViewPath = view.Path,
                ViewDidFind = true,
                ViewSearchedTime = DateTime.UtcNow
            };

            _broker.SendMessage(message);
        }

        [DiagnosticName("Microsoft.AspNet.Mvc.BeforeView")]
        public void OnBeforeView(IView view, IViewContext viewContext)
        {
            var startDateTime = DateTime.UtcNow;
            var actionDescriptor = ConvertActionDescriptor(viewContext.ActionDescriptor);
            
            var message = new BeforeActionViewInvokedMessage
            {
                ActionId = actionDescriptor.Id,
                ActionName = actionDescriptor.Name,
                ActionControllerName = actionDescriptor.ControllerName,
                ViewPath = view.Path,
                //ViewData = new ViewResult {      // TODO: because we switch threads, we need to make sure we get
                //    ViewData = result.ViewData,  //       what we need off the thread before publishing
                //    TempData = result.TempData
                //},
                ViewStartTime = startDateTime
            };

            _broker.BeginLogicalOperation(message, startDateTime);
            _broker.SendMessage(message);
        }

        [DiagnosticName("Microsoft.AspNet.Mvc.AfterView")]
        public void OnAfterView(IView view, IViewContext viewContext)
        {
            var timing = _broker.EndLogicalOperation<BeforeActionViewInvokedMessage>();
            if (timing != null)
            {
                var actionDescriptor = ConvertActionDescriptor(viewContext.ActionDescriptor);

                var message = new AfterActionViewInvokedMessage
                {
                    ActionId = actionDescriptor.Id,
                    ActionName = actionDescriptor.Name,
                    ActionControllerName = actionDescriptor.ControllerName,
                    ViewEndTime = timing.End,
                    ViewDuration = timing.Elapsed,
                    ViewOffset = timing.Offset
                };

                _broker.SendMessage(message);
            }
            else
            {
                _logger.LogCritical("OnAfterView: Couldn't publish `AfterActionViewInvokedMessage` as `BeforeActionViewInvokedMessage` wasn't found in stack");
            }
        }
        
        [DiagnosticName("Microsoft.AspNet.Mvc.BeforeViewComponent")]
        public void OnBeforeViewComponent(IViewComponentContext viewComponentContext)
        {
            var startDateTime = DateTime.UtcNow;

            var message = new BeforeViewComponentMessage
            {
                ComponentId = viewComponentContext.ViewComponentDescriptor.Id,
                ComponentDisplayName = viewComponentContext.ViewComponentDescriptor.FullName,
                ComponentName = viewComponentContext.ViewComponentDescriptor.ShortName,
                ComponentStartTime = startDateTime,
                Arguments = viewComponentContext.Arguments?.Select(x => new ArgumentData { Type = TypeNameHelper.GetTypeDisplayName(x.Value, false), TypeFullName = TypeNameHelper.GetTypeDisplayName(x.Value), Name = null, Value = SanitizeUserObjectsHelper.GetSafeObject(x.Value) }).ToList()
            };
            
            _broker.BeginLogicalOperation(message, startDateTime);
            _broker.SendMessage(message);
        }

        [DiagnosticName("Microsoft.AspNet.Mvc.AfterViewComponent")]
        public void OnAfterViewComponent(IViewComponentContext viewComponentContext)
        {
            var timing = _broker.EndLogicalOperation<BeforeViewComponentMessage>();
            if (timing != null)
            {
                var message = new AfterViewComponentMessage
                {
                    ComponentId = viewComponentContext.ViewComponentDescriptor.Id,
                    ComponentName = viewComponentContext.ViewComponentDescriptor.ShortName,
                    ComponentEndTime = timing.End,
                    ComponentDuration = timing.Elapsed,
                    ComponentOffset = timing.Offset
                };

                _broker.SendMessage(message);
            }
            else
            {
                _logger.LogCritical("OnAfterViewComponent: Couldn't publish `AfterViewComponentMessage` as `BeforeViewComponentMessage` wasn't found in stack");
            }
        }

        private IActionDescriptor ConvertActionDescriptor(object actionDescriptor)
        {
            var typedActionDescriptor = (IActionDescriptor)null;

            // NOTE: ActionDescriptor is usually ControllerActionDescriptor but the compile time type is
            //       ActionDescriptor. This is a problem because we are misisng the ControllerName which 
            //       we use a lot.
            switch (actionDescriptor.GetType().FullName)
            {
                case "Microsoft.AspNet.Mvc.Controllers.ControllerActionDescriptor":
                    typedActionDescriptor = _proxyAdapter.Process<IActionDescriptor>("Microsoft.AspNet.Mvc.Controllers.ControllerActionDescriptor", actionDescriptor);
                    break;
                case "Microsoft.AspNet.Mvc.Abstractions.ActionDescriptor":
                    typedActionDescriptor = _proxyAdapter.Process<IActionDescriptor>("Microsoft.AspNet.Mvc.Abstractions.ActionDescriptor", actionDescriptor);
                    break;
            }

            return typedActionDescriptor;
        }
    }
}