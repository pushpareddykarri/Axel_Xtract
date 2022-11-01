import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  // { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
 // { path: '', loadChildren: () => import('./SalesGross/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
  { path: 'dashboard2', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },

  { path: 'SalesGrossold', loadChildren: () => import('./SalesGross/dashboard/dashboard.module').then(m => m.DashboardModule) }, 
  { path: 'SalesGross/details', loadChildren: () => import('./SalesGross/details/details.module').then(m => m.DetailsModule) },
  { path: 'SalesGross/sales-reports', loadChildren: () => import('./SalesGross/sales-reports/sales-reports.module').then(m => m.SalesReportsModule) },

  { path: 'ServiceGross2', loadChildren: () => import('./ServiceGross/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'ServiceGross/reports', loadChildren: () => import('./ServiceGross/service-reports/service-reports.module').then(m => m.ServiceReportsModule) },

  { path: 'AccountMapping', loadChildren: () => import('./AccountMapping/account-mapping/account-mapping.module').then(m => m.AccountMappingModule) },

  { path: 'analyse', loadChildren: () => import('./analyse/analyse.module').then(m => m.AnalyseModule) }, 

  { path: 'PartsGrossOLD', loadChildren: () => import('./PartsGross/dashboard/dashboard.module').then(m => m.DashboardModule) },

  { path: 'Inventory', loadChildren: () => import('./Inventory/dashboard/dashboard.module').then(m => m.DashboardModule) },

  { path: 'SalesGrossOLDV2', loadChildren: () => import('./SalesGross/dashboard-new/dashboard-new.module').then(m => m.DashboardNewModule) },

  //{ path: '', loadChildren: () => import('./dashboard-new/dashboard-new.module').then(m => m.DashboardNewModule) },
  { path: 'dashboard4', loadChildren: () => import('./dashboard-new/dashboard-new.module').then(m => m.DashboardNewModule) },

 { path: 'adminroles', loadChildren: () => import('./Admin/roles/roles.module').then(m => m.RolesModule) },

 
  { path: '', loadChildren: () => import('./dashboard-new2/dashboard-new2.module').then(m => m.DashboardNew2Module) },

  { path: 'dashboard', loadChildren: () => import('./dashboard-new2/dashboard-new2.module').then(m => m.DashboardNew2Module) },

  { path: 'ServiceGross', loadChildren: () => import('./ServiceGross/dashboard-new/dashboard-new.module').then(m => m.DashboardNewModule) },

  { path: 'jobititles', loadChildren: () => import('./Admin/job-titles/job-titles.module').then(m => m.JobTitlesModule) },

  { path: 'permissions', loadChildren: () => import('./Admin/permissions/permissions.module').then(m => m.PermissionsModule) },

  { path: 'adminmodules', loadChildren: () => import('./Admin/admin-modules/admin-modules.module').then(m => m.AdminModulesModule) },

  { path: 'floorplanOld', loadChildren: () => import('./AccountMapping/floorplan/floorplan.module').then(m => m.FloorplanModule) },

  { path: 'SalesGross', loadChildren: () => import('./SalesGross/dashboard-new2/dashboard-new2.module').then(m => m.DashboardNew2Module) },

  { path: 'balancesheet', loadChildren: () => import('./AccountMapping/balance-sheet/balance-sheet.module').then(m => m.BalanceSheetModule) },

  { path: 'salesreconciliation', loadChildren: () => import('./SalesGross/sales-reconciliation/sales-reconciliation.module').then(m => m.SalesReconciliationModule) },

  { path: 'servicereconciliation', loadChildren: () => import('./ServiceGross/service-reconciliation/service-reconciliation.module').then(m => m.ServiceReconciliationModule) },

  { path: 'partsreconciliation', loadChildren: () => import('./PartsGross/parts-reconciliation/parts-reconciliation.module').then(m => m.PartsReconciliationModule) },

  { path: 'salesconversionOld', loadChildren: () => import('./SalesGross/sales-conversion/sales-conversion.module').then(m => m.SalesConversionModule) },

  { path: 'schedulesOld', loadChildren: () => import('./AccountMapping/schedules/schedules.module').then(m => m.SchedulesModule) },

  { path: 'ServiceGross/details', loadChildren: () => import('./ServiceGross/details/details.module').then(m => m.DetailsModule) },

  { path: 'PartsGross', loadChildren: () => import('./PartsGross/dashboard-new/dashboard-new.module').then(m => m.DashboardNewModule) },

  { path: 'AccountMapping/balance-sheet-reports', loadChildren: () => import('./AccountMapping/balance-sheet-reports/balance-sheet-reports.module').then(m => m.BalanceSheetReportsModule) },

  { path: 'financialsummary', loadChildren: () => import('./AccountMapping/financial-summary/financial-summary-new/financial-summary-new.module').then(m => m.FinancialSummaryNewModule) },

  { path: 'financialsummarydetails', loadChildren: () => import('./AccountMapping/financial-summary/details/details.module').then(m => m.DetailsModule) },


  { path: 'floorplan', loadChildren: () => import('./AccountMapping/Floorplan/cit-floorplan/cit-floorplan.module').then(m => m.CitFloorplanModule) },

  { path: 'schedules', loadChildren: () => import('./AccountMapping/schedules/schedules/schedules.module').then(m => m.SchedulesModule) },

  { path: 'AccountMapping/schedules/schedules-reports', loadChildren: () => import('./AccountMapping/schedules/schedules-report/schedules-report.module').then(m => m.SchedulesReportModule) },

  { path: 'AccountMapping/schedules/schedules-transactions', loadChildren: () => import('./AccountMapping/schedules/schedules-transactions/schedules-transactions.module').then(m => m.SchedulesTransactionsModule) },

  { path: 'floorplans', loadChildren: () => import('./AccountMapping/FloorPlans/dashboard/dashboard.module').then(m => m.DashboardModule) },

  { path: 'AccountMapping/FloorPlans/cit-analyse', loadChildren: () => import('./AccountMapping/FloorPlans/cit-analyse/cit-analyse.module').then(m => m.CitAnalyseModule) },

  { path: 'AccountMapping/FloorPlans/cit-report', loadChildren: () => import('./AccountMapping/FloorPlans/cit-report/cit-report.module').then(m => m.CitReportModule) },

  { path: 'salesconversion', loadChildren: () => import('./SalesGross/SalesConversions/dashboard/dashboard.module').then(m => m.DashboardModule) },

  { path: 'SalesGross/SalesConversions/sc-reports', loadChildren: () => import('./SalesGross/SalesConversions/sc-reports/sc-reports.module').then(m => m.ScReportsModule) },

  { path: 'SalesGross/SalesConversions/sc-details', loadChildren: () => import('./SalesGross/SalesConversions/sc-details/sc-details.module').then(m => m.ScDetailsModule) },

  { path: 'SalesGross/sales-reports-new', loadChildren: () => import('./SalesGross/sales-reports-new/sales-reports-new.module').then(m => m.SalesReportsNewModule) },

  { path: 'PartsGross/parts-report', loadChildren: () => import('./PartsGross/parts-report/parts-report.module').then(m => m.PartsReportModule) },

  { path: 'PartsGross/details', loadChildren: () => import('./PartsGross/details/details.module').then(m => m.DetailsModule) },

  { path: '**', loadChildren: () => import('./dashboard-new2/dashboard-new2.module').then(m => m.DashboardNew2Module) },
  
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
