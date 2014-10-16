using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using DBAdmin.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;

namespace DBAdmin.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        //
        // GET: /Account/Login

        private IAuthenticationManager AuthenticationManager
        {
            get { return HttpContext.GetOwinContext().Authentication; }
        }

        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }
        // POST: /Account/LogOff
        [HttpPost]
        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut();
            return RedirectToAction("Index", "Home");
        }
    
        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Login(LoginViewModel model, string returnUrl)
        {
            var repo = new AuthRepository();
            if (ModelState.IsValid)
            {
                ClaimsIdentity identity;
                bool result = repo.Validate(model.UserName, model.Password, out identity);
                if (!result)
                {
                    ViewBag.StatusMessage = "The username or password you entered is incorrect.";
                    return View(model);
                }
                SignIn(identity, false);
                return RedirectToLocal(returnUrl);
                //}
            }

            // If we got this far, something failed, redisplay form
            ViewBag.StatusMessage = "Please input the username and password.";
            return View(model);
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        private void SignIn(ClaimsIdentity identity, bool isPersistent)
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
            AuthenticationManager.SignIn(new AuthenticationProperties {IsPersistent = isPersistent}, identity);
        }
    }
}