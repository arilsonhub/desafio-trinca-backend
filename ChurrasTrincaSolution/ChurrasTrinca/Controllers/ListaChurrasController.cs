using ChurrasTrinca.Data;
using ChurrasTrinca.Models;
using ChurrasTrinca.ModelsVO;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace ChurrasTrinca.Controllers
{
    public class ListaChurrasController : Controller
    {

        private ChurrasTrincaContext db = new ChurrasTrincaContext();

        // GET: ListaChurras
        public ActionResult Index()
        {
            if (Session["isLogado"] != null)
                return View();
            else
                return RedirectToAction("Index", "Home");
        }

        public JsonResult ListarChurrascos()
        {
            if (Session["isLogado"] != null)
            {
                Churrasco[] churrascoArray = db.Churrasco.ToArray();
                List<ChurrascoVO> listaChurrascos = new List<ChurrascoVO>();

                foreach (Churrasco c in churrascoArray)
                {
                    Participante[] participantesChurrasArray = db.Participante.Where(p => p.churrascoId == c.id).ToArray();
                    int quantidadeParticipantes = participantesChurrasArray.Length;

                    ChurrascoVO churrasVO = new ChurrascoVO();
                    churrasVO.id = c.id;
                    churrasVO.data = c.data;
                    churrasVO.descricao = c.descricao;
                    churrasVO.quantidadeParticipantes = quantidadeParticipantes;

                    decimal valorArrecadado = new decimal();
                    foreach (Participante participante in participantesChurrasArray)
                    {
                        if (participante.isPago == 1) {
                            valorArrecadado = decimal.Add(valorArrecadado,participante.valorContribuicao);
                        }
                    }

                    churrasVO.totalArrecadado = valorArrecadado;
                    listaChurrascos.Add(churrasVO);
                }

                return Json(listaChurrascos);
            }

            return null;
        }

        public JsonResult DetalhesChurrasco(long id)
        {
            if (Session["isLogado"] != null)
            {
                Churrasco churrasco = db.Churrasco.FirstOrDefault(c => c.id == id);
                ChurrascoVO churrascoVO = new ChurrascoVO();
                Participante[] participantesChurrasArray = db.Participante.Where(p => p.churrascoId == churrasco.id).ToArray();
                int quantidadeParticipantes = participantesChurrasArray.Length;

                churrascoVO.id = churrasco.id;
                churrascoVO.data = churrasco.data;
                churrascoVO.descricao = churrasco.descricao;
                churrascoVO.observacao = churrasco.observacao;
                churrascoVO.quantidadeParticipantes = quantidadeParticipantes;

                decimal valorASerArrecadado = new decimal();
                decimal valorJaPago = new decimal();
                int quantidadeBebuns = 0;
                int quantidadeSaudaveis = 0;
                foreach (Participante participante in participantesChurrasArray)
                {                    
                   valorASerArrecadado = decimal.Add(valorASerArrecadado, participante.valorContribuicao);
                    if (participante.isPago == 1)
                    {
                        valorJaPago = decimal.Add(valorJaPago, participante.valorContribuicao);
                    }

                    if (participante.isBebida == 1)
                    {
                        quantidadeBebuns++;
                    }
                    else {
                        quantidadeSaudaveis++;
                    }
                }
                churrascoVO.valorASerArrecadado = valorASerArrecadado;
                churrascoVO.totalArrecadado = valorJaPago;
                churrascoVO.quantidadeBebuns = quantidadeBebuns;
                churrascoVO.quantidadeSaudaveis = quantidadeSaudaveis;

                return Json(churrascoVO);
            }

            return null;
        }

        public JsonResult AdicionarParticipante(Participante participante)
        {
            if (Session["isLogado"] != null)
            {
                bool result = false;                
                db.Set<Participante>().Add(participante);
                db.SaveChanges();
                result = true;

                var jsonResult = new { insertResult = result };
                return Json(jsonResult);
            }

            return null;
        }

        public JsonResult ListarParticipantes(long churrascoId)
        {
            if (Session["isLogado"] != null)
            {
                Participante[] participantesArray = db.Participante.Where(c => c.churrascoId == churrascoId).ToArray();

                return Json(participantesArray);
            }

            return null;
        }

        public JsonResult AdicionarChurrasco(Churrasco churrasco)
        {
            if (Session["isLogado"] != null)
            {
                bool result = false;
                db.Set<Churrasco>().Add(churrasco);
                db.SaveChanges();
                result = true;

                var jsonResult = new { insertResult = result };
                return Json(jsonResult);
            }

            return null;
        }

        public JsonResult CancelarChurrasco(long id)
        {
            if (Session["isLogado"] != null)
            {
                bool result = false;

                Churrasco churrasco = db.Churrasco.FirstOrDefault(c => c.id == id);
                List<Participante> listaParticipantes = db.Participante.Where(c => c.churrascoId == churrasco.id).ToList();
                
                foreach (Participante p in listaParticipantes)
                {
                    db.Participante.Remove(p);
                }

                db.Churrasco.Remove(churrasco);
                db.SaveChanges();
                result = true;

                var jsonResult = new { deleteResult = result };
                return Json(jsonResult);
            }

            return null;
        }

        public JsonResult RemoverParticipante(long id)
        {
            if (Session["isLogado"] != null)
            {
                bool result = false;

                Participante participante = db.Participante.FirstOrDefault(c => c.id == id);
                db.Participante.Remove(participante);
                db.SaveChanges();
                result = true;

                var jsonResult = new { deleteResult = result };
                return Json(jsonResult);
            }

            return null;
        }
    }
}