using System.Web.Mvc;

namespace DBAdmin.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "DashBoard";

            return View();
        }
    }
}