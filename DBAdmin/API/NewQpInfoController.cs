using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.UI.WebControls;
using DBAdmin.Models;
using DBAdmin.ViewModels;

namespace DBAdmin.API
{
    [RoutePrefix("api/NewQpInfo")]
    public class NewQpInfoController : ApiController
    {
        private readonly IMSEntities db = new IMSEntities();

        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(db.NewJobPublicHolidays.ToList());
        }

        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            NewJobPublicHoliday model = db.NewJobPublicHolidays.SingleOrDefault(l => l.ID == id);
            if (model == null)
            {
                return NotFound();
            }
            return Ok(model);
        }


        public IHttpActionResult Post(GridParams gridParam)
        {
            var col = typeof (NewJobPublicHoliday).GetProperty(gridParam.SortColumn);
            return Ok();
        }
    }
}