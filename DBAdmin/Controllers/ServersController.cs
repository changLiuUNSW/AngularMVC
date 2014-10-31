using System.Web.Mvc;

namespace DBAdmin.Controllers
{
    [Authorize]
    public class ServersController : Controller
    {
        // GET: Servers
        public ActionResult Index()
        {
            ViewBag.Title = "Servers";
            return View();
        }
    }
}