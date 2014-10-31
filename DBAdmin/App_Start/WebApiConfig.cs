using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using Newtonsoft.Json.Serialization;

namespace DBAdmin.App_Start
{
    public static class WebApiConfig
    {
        public static string UrlPrefixRelative { get { return "/api"; } }
        public static void Register(HttpConfiguration config)
        {
            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Filters.Add(new AuthorizeAttribute());
            config.Routes.MapHttpRoute("DefaultApi",
                //routeTemplate: "api/{controller}/{action}/{id}",
                "api/{controller}/{id}", new {id = RouteParameter.Optional}
                );
            JsonMediaTypeFormatter jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}