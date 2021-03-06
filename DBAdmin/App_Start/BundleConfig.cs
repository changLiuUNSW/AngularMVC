﻿using System.Web;
using System.Web.Optimization;

namespace DBAdmin
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {


            bundles.Add(new ScriptBundle("~/bundles/modernizr")
          .Include("~/Scripts/modernizr-2.6.2-respond-1.1.0.js"));
            bundles.Add(new ScriptBundle("~/bundles/scripts")
                .Include("~/Scripts/jquery/jquery-{version}.js")
                .Include("~/Scripts/bootstrap.js")
                .Include("~/Scripts/angular/angular.js")
                .Include("~/Scripts/angular/angular-cookies.js")
                .Include("~/Scripts/angular/angular-route.js")
                .Include("~/Scripts/angular/angular-resource.js")
                .Include("~/Scripts/angular/angular-animate.js")
                .Include("~/Scripts/angular/angular-sanitize.js")
                .Include("~/Scripts/angular/angular-touch.js")
                .Include("~/Scripts/breeze.debug.js")
                .Include("~/Scripts/breeze.angular.js")
                .Include("~/Scripts/toastr.js")
                .Include("~/Scripts/q.min.js")
                .Include("~/Scripts/breeze.savequeuing.js")
                .Include("~/Scripts/angular-ui/ui-bootstrap.js")
                .Include("~/Scripts/angular-ui/ui-bootstrap-tpls.js")
//                .Include("~/Scripts/kendo/2014.1.318/kendo.web.min.js")
//                .Include("~/Scripts/angular-kendo.js")
                .Include("~/Scripts/app/modules/loading-bar.js")
                .Include("~/Scripts/app/modules/ng-table.js")
                .Include("~/Scripts/moment.js")
                .Include("~/Scripts/daterangepicker.js")
                .Include("~/Scripts/app/modules/ng-bs-daterangepicker.js"));
            bundles.Add(new Bundle("~/bundles/appScripts").Include("~/Scripts/app/DBadminApp.js"));
#if DEBUG
            BundleTable.EnableOptimizations = false;
#else
            BundleTable.EnableOptimizations = true;
#endif
        }
    }
}
