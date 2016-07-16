using System.Collections.Generic;
using System.Linq;
using Glimpse.Initialization;
using Glimpse.Platform;
using Microsoft.AspNet.Http;

namespace Glimpse.Agent.Configuration
{
    public class DefaultRequestIgnorerManager : IRequestIgnorerManager
    {
        public DefaultRequestIgnorerManager(IExtensionProvider<IRequestIgnorer> requestIgnorerProvider, IHttpContextAccessor httpContextAccessor)
        {
            RequestIgnorers = requestIgnorerProvider.Instances;
            HttpContextAccessor = httpContextAccessor;
        }

        private IEnumerable<IRequestIgnorer> RequestIgnorers { get; }

        private IHttpContextAccessor HttpContextAccessor { get; }

        public bool ShouldIgnore()
        {
            return ShouldIgnore(HttpContextAccessor.HttpContext);
        }

        public bool ShouldIgnore(HttpContext context)
        {
            if (context == null)
            {
                // TODO: This should throw but is just returning atm because of bug in hosting
                return false;  //throw new ArgumentNullException(nameof(context));
            }

            var result = GetCachedResult(context);
            if (result == null)
            {
                if (RequestIgnorers.Any())
                {
                    foreach (var policy in RequestIgnorers)
                    {
                        if (policy.ShouldIgnore(context))
                        {
                            result = true;
                            break;
                        }
                    }
                }

                if (!result.HasValue)
                {
                    result = false;
                }

                SetCachedResult(context, result);
            }

            return result.Value;
        }

        private bool? GetCachedResult(HttpContext context)
        {
            return context.Items["Glimpse.ShouldIgnoreRequest"] as bool?;
        }

        private void SetCachedResult(HttpContext context, bool? value)
        {
            context.Items["Glimpse.ShouldIgnoreRequest"] = value;
        }
    }
}