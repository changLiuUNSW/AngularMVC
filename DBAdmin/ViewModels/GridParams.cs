using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DBAdmin.ViewModels
{
    public class GridParams
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortColumn { get; set; }
        public string SortOrder { get; set; }
        public string SearchTerm { get; set; }
    }
}