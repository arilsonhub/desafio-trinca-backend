using ChurrasTrinca.Data;
using ChurrasTrinca.Models;
using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Security;

namespace ChurrasTrinca.Controllers
{
    public class HomeController : Controller
    {
        private ChurrasTrincaContext db = new ChurrasTrincaContext();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LogOut()
        {
            Session["isLogado"] = null;
            return RedirectToAction("Index", "Home");
        }

        /// <param name="returnURL"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Autenticar(Usuario usuarioRegistro, String returnUrl) {

            ViewBag.ReturnUrl = returnUrl;            

            if (ModelState.IsValid) {

                Usuario usuarioLogado = db.Usuario.FirstOrDefault(u => u.login == usuarioRegistro.login && u.senha == usuarioRegistro.senha);

                if (usuarioLogado != null)
                {

                    FormsAuthentication.SetAuthCookie(usuarioLogado.login, false);
                    if (Url.IsLocalUrl(returnUrl)
                    && returnUrl.Length > 1
                    && returnUrl.StartsWith("/")
                    && !returnUrl.StartsWith("//")
                    && returnUrl.StartsWith("/\\"))
                    {
                        return Redirect(returnUrl);
                    }

                    /*código abaixo cria uma session para armazenar o nome do usuário*/
                    Session["isLogado"] = true;
                    Session["usuario.nome"] = usuarioLogado.login;
                    /*Vai para área restrita*/
                    return RedirectToAction("Index", "ListaChurras");
                }
                else {

                    /*Escreve na tela a mensagem de erro informada*/
                    ModelState.AddModelError("login.invalido", "Acesso negado");                    
                }
            }

            return RedirectToAction("Index", "Home");
        }
    }
}