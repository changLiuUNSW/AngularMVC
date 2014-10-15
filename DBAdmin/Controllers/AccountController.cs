using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DBAdmin.Controllers
{

    public class AccountController : Controller
    {
        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        public JsonResult Login(string username, string password, string returnUrl)
        {
            return Json(new
            {
                username="haha",
                password="haha"
            });
        }
    }
}