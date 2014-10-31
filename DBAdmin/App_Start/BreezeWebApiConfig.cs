using System.Web.Http;

[assembly: WebActivator.PreApplicationStartMethod(
    typeof(DBAdmin.App_Start.BreezeWebApiConfig), "RegisterBreezePreStart")]
namespace DBAdmin.App_Start {
  ///<summary>
  /// Inserts the Breeze Web API controller route at the front of all Web API routes
  ///</summary>
  ///<remarks>
  /// This class is discovered and run during startup; see
  /// http://blogs.msdn.com/b/davidebb/archive/2010/10/11/light-up-your-nupacks-with-startup-code-and-webactivator.aspx
  ///</remarks>
  public static class BreezeWebApiConfig {
      public static string UrlPrefixRelative { get { return "/breeze"; } }
    public static void RegisterBreezePreStart() {
      GlobalConfiguration.Configuration.Routes.MapHttpRoute(
          name: "BreezeApi",
          routeTemplate: "breeze/{controller}/{action}"
      );
    }
  }
}