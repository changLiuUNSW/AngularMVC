using System.Linq;
using System.Web.Http;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using DBAdmin.Models;

namespace DBAdmin.API
{
    [Authorize]
    [BreezeController]
    public class QPBreezeController : ApiController
    {
        private readonly EFContextProvider<IMSEntities> _contextProvider = new EFContextProvider<IMSEntities>();

        [HttpGet]
        public IQueryable<NewJobPublicHoliday> Todos()
        {
            return _contextProvider.Context.NewJobPublicHolidays;
        }

        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }
    }
}