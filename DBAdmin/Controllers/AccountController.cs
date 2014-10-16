using System.Threading.Tasks;
using System.Web.Mvc;
using DBAdmin.ViewModels;

namespace DBAdmin.Controllers
{
    public class AccountController : Controller
    {
        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
//                var user = await UserManager.FindAsync(model.Email, model.Password);
//                if (user != null)
//                {
//                    await SignInAsync(user, model.RememberMe);

                return RedirectToLocal(returnUrl);
                //}
            }

            // If we got this far, something failed, redisplay form
            ViewBag.StatusMessage = "The username or password you entered is incorrect.";
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
    }
}