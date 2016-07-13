using System.Collections.Generic;
using System.Reflection;

namespace Glimpse.Platform
{
    public static class AppDomainAssemblyBlackList
    {
        private readonly static HashSet<string> BlackList = new HashSet<string>();

        static AppDomainAssemblyBlackList()
        {
            BlackList.Add("mscorlib");
            BlackList.Add("System.Web");
            BlackList.Add("System");
            BlackList.Add("System.Core");
            BlackList.Add("System.Web.ApplicationServices");
            BlackList.Add("System.Configuration");
            BlackList.Add("System.Xml");
            BlackList.Add("System.Runtime.Caching");
            BlackList.Add("Microsoft.Build.Utilities.v4.0");
            BlackList.Add("Microsoft.JScript");
            BlackList.Add("Microsoft.CSharp");
            BlackList.Add("System.Data");
            BlackList.Add("System.Web.Services");
            BlackList.Add("System.Drawing");
            BlackList.Add("System.EnterpriseServices");
            BlackList.Add("System.IdentityModel");
            BlackList.Add("System.Runtime.Serialization");
            BlackList.Add("System.ServiceModel");
            BlackList.Add("System.ServiceModel.Activation");
            BlackList.Add("System.ServiceModel.Web");
            BlackList.Add("System.Activities");
            BlackList.Add("System.ServiceModel.Activities");
            BlackList.Add("System.WorkflowServices");
            BlackList.Add("System.Web.Extensions");
            BlackList.Add("System.Data.DataSetExtensions");
            BlackList.Add("System.Xml.Linq");
            BlackList.Add("System.ComponentModel.DataAnnotations");
            BlackList.Add("System.Web.DynamicData");
            BlackList.Add("AntiXssLibrary");
            BlackList.Add("Antlr3.Runtime");
            BlackList.Add("Antlr4.StringTemplate");
            BlackList.Add("Castle.Core");
            BlackList.Add("DotNetOpenAuth.AspNet");
            BlackList.Add("DotNetOpenAuth.Core");
            BlackList.Add("DotNetOpenAuth.OAuth.Consumer");
            BlackList.Add("DotNetOpenAuth.OAuth");
            BlackList.Add("DotNetOpenAuth.OpenId");
            BlackList.Add("DotNetOpenAuth.OpenId.RelyingParty");
            BlackList.Add("EntityFramework");
            BlackList.Add("EntityFramework.SqlServer");
            BlackList.Add("Microsoft.Web.Infrastructure");
            BlackList.Add("Microsoft.Web.WebPages.OAuth");
            BlackList.Add("Mono.Math");
            BlackList.Add("Newtonsoft.Json");
            BlackList.Add("NLog");
            BlackList.Add("Org.Mentalis.Security.Cryptography");
            BlackList.Add("System.Net.Http");
            BlackList.Add("System.Net.Http.Formatting");
            BlackList.Add("System.Net.Http.WebRequest");
            BlackList.Add("System.Web.Helpers");
            BlackList.Add("System.Web.Http");
            BlackList.Add("System.Web.Http.WebHost");
            BlackList.Add("System.Web.Mvc");
            BlackList.Add("System.Web.Optimization");
            BlackList.Add("System.Web.Razor");
            BlackList.Add("System.Web.WebPages.Deployment");
            BlackList.Add("System.Web.WebPages");
            BlackList.Add("System.Web.WebPages.Razor");
            BlackList.Add("Tavis.UriTemplates");
            BlackList.Add("WebGrease");
            BlackList.Add("WebMatrix.Data");
            BlackList.Add("WebMatrix.WebData");
            BlackList.Add("Microsoft.VisualStudio.Web.PageInspector.Loader");
            BlackList.Add("Microsoft.VisualStudio.Web.PageInspector.Runtime");
            BlackList.Add("Microsoft.VisualStudio.Web.PageInspector.Tracing");
            BlackList.Add("System.Xaml");
            BlackList.Add("System.Numerics");
            BlackList.Add("System.Data.OracleClient");
            BlackList.Add("System.Data.SqlServerCe");
            BlackList.Add("System.Web.RegularExpressions");
            BlackList.Add("System.Data.Services.Design");
            BlackList.Add("System.Windows.Forms");
            BlackList.Add("System.ServiceModel.Internals");
            BlackList.Add("System.Workflow.ComponentModel");
            BlackList.Add("System.Workflow.Activities");
            BlackList.Add("System.Workflow.Runtime");
            BlackList.Add("System.Data.Linq");
            BlackList.Add("System.Transactions");
            BlackList.Add("System.Data.SqlXml");
            BlackList.Add("Microsoft.Build.Framework");
            BlackList.Add("System.Xaml.Hosting");
            BlackList.Add("Microsoft.VisualBasic.Activities.Compiler");
            BlackList.Add("System.Runtime.DurableInstancing");
            BlackList.Add("System.Security");
            BlackList.Add("System.Dynamic");
        }

        public static bool IsBlackListed(Assembly assembly)
        {
            return BlackList.Contains(assembly.GetName().Name);
        }
    }
}