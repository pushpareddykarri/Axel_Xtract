import { Component, Input,Output,EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { MenuComponent } from '../menu/menu.component';
import { ApiService } from '../Core/api.service/api.service';
import {ServiceReportsComponent} from '../ServiceGross/service-reports/service-reports.component'
import {SalesReportsComponent} from '../SalesGross/sales-reports/sales-reports.component';
import {AnalyseComponent} from '../analyse/analyse.component'
import { ExcelService } from '../Core/excel.service/excel.service';
import { PdfService } from '../Core/pdf.service/pdf.service';
import { BalanceSheetReportsComponent } from '../AccountMapping/balance-sheet-reports/balance-sheet-reports.component';
import { SchedulesReportComponent } from '../AccountMapping/schedules/schedules-report/schedules-report.component';
import{CitAnalyseComponent} from '../AccountMapping/FloorPlans/cit-analyse/cit-analyse.component';
import{CitReportComponent} from '../AccountMapping/FloorPlans/cit-report/cit-report.component'
import { ScReportsComponent } from '../SalesGross/SalesConversions/sc-reports/sc-reports.component';
import { PartsReportComponent } from '../PartsGross/parts-report/parts-report.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() Parentcomponent;
updatedDate:any='-'
updatedTime:any='-'
@Output() UpdatedDateFun = new EventEmitter();
ModulesData : any = [];
ShowModules : any ;
  title: String;
  isShown = true;
  componentDetails:any;

  constructor(private ngbmodal: NgbModal,
              private ngbmodalActive: NgbActiveModal,
              public apiSrvc: ApiService,
              private excelService: ExcelService,
              private pdfService: PdfService) {
    this.apiSrvc.GetHeaderData().subscribe(res =>{ this.componentDetails = res.obj
    console.log(this.componentDetails)
      
     } );
  if(this.componentDetails.path1==''){
  this.isShown = false;
   }
   }

  ngOnInit() {
    this.apiSrvc.getTitle().subscribe(appTitle => this.title = appTitle);
    console.log(this.title);
    const Data={
      state:true
    }
  this.apiSrvc.setBackgroundstate({obj: Data})
    
    if(this.title == 'Account Mapping')
    {
      this.isShown = false;
    }

  const obj={}
  this.apiSrvc.postmethod('xtract/LastUpdated',obj).subscribe(res=>{
    console.log(res.response[0].LastUpdatedDate);
    console.log(res.response[0].LastUpdatedTime);
    this.updatedTime=res.response[0].LastUpdatedTime
    this.updatedDate=res.response[0].LastUpdatedDate
      })
this.getData()


  }
  getData(){
  
    this.ShowModules =[];
    let Obj = {
      "RoleID": "1",
      "expression": "mod_status='Y'"
    }
    this.apiSrvc.postmethod('permissionsbasedonroles/get', Obj).subscribe(res => {
      this.ModulesData = res.response;    
     console.log(this.ModulesData);
     this.ModulesData.forEach(e =>{
      if(e.status == "Y"){
        this.ShowModules.push(e);
        // console.log(this.ShowModules)
      } 
     })  
    });
  };

  openMenu(){
    // this.ngbmodalActive=this.ngbmodal.open(MenuComponent, {
    //   size:'xl',
    //   backdrop: "static"
    // });
    const modalRef = this.ngbmodal.open(MenuComponent,{
      size:'xl',
      backdrop: "static",
    });
    modalRef.componentInstance.Parentcomponent = this.ShowModules;
  } 
  // openAnalyze(){
  //   this.ngbmodalActive=this.ngbmodal.open(AnalyseComponent, {
  //     size:'xl',
  //     backdrop: "static"
  //   });
  // } 

  openAnalyze(){
    if(this.componentDetails.title=='Cit Floorplan Report'){
    this.ngbmodalActive=this.ngbmodal.open(CitAnalyseComponent, {
      size:'xl',
      backdrop: "static"
    });

  }
    
  if(this.componentDetails.title=='Sales Gross'){
    this.ngbmodalActive=this.ngbmodal.open(AnalyseComponent, {
      size:'xl',
      backdrop: "static"
    });
  }
  }
 
  openFilter(){
    // this.ngbmodalActive=this.ngbmodal.open(ReportsComponent, {
    //   size:'xl',
    //   backdrop: "static",
      
    // });
if(this.componentDetails.title=='Sales Gross'){
  const Data={
    state:false
  }
this.apiSrvc.setBackgroundstate({obj: Data})
  const modalRef = this.ngbmodal.open(SalesReportsComponent,{
    size:'xl',
    backdrop: "static",
  });
  modalRef.componentInstance.Parentcomponent = 'SG';
  modalRef.result.then((data) => {
  }, (reason) => {
// on dismiss
const Data={
  state:true
}
this.apiSrvc.setBackgroundstate({obj: Data})
});
}
if(this.componentDetails.title=='Service Gross'){
  const modalRef = this.ngbmodal.open(ServiceReportsComponent,{
    size:'xl',
    backdrop: "static",
  });
  modalRef.componentInstance.Parentcomponent = 'SrvcG';
}
if(this.componentDetails.title=='Balance Sheet'){
  const modalRef = this.ngbmodal.open(BalanceSheetReportsComponent,{
    size:'xl',
    backdrop: "static",
  });
  modalRef.componentInstance.Parentcomponent = 'BS';
}
if(this.componentDetails.title=='Schedules / Managed Accounts'){
  const modalRef = this.ngbmodal.open(SchedulesReportComponent,{
    size:'xl',
    backdrop: "static",
  });
  modalRef.componentInstance.Parentcomponent = 'SMA';
}

if(this.componentDetails.title=='Cit Floorplan Report'){
  const modalRef = this.ngbmodal.open(CitReportComponent,{
        size:'xl',
        backdrop: "static",
      });
    modalRef.componentInstance.Parentcomponent = 'SR';
 }
 if(this.componentDetails.title=='Sales Conversion'){
  const modalRef = this.ngbmodal.open(ScReportsComponent,{
    size:'xl',
    backdrop: "static",
  });
  modalRef.componentInstance.Parentcomponent = 'SR';
}
if (this.componentDetails.title == 'Parts Gross') {
  const modalRef = this.ngbmodal.open(PartsReportComponent, {
    size: 'xl',
    backdrop: "static",
  });
  modalRef.componentInstance.Parentcomponent = 'PG';
}

// if(this.componentDetails.title=='Account Mapping'){
//   const modalRef = this.ngbmodal.open(SalesReportsComponent,{
//     size:'xl',
//     backdrop: "static",
//   });
//   modalRef.componentInstance.Parentcomponent = 'AM';
// }

  }
  onclosemsg() {​​​​​​​​
 
    this.ngbmodalActive.close();
      }​​​​​​​​
  exportAsXLSX(){
     this.excelService.SalesReportsXLSX();
      
  }
  exportAsPDF(){
    this.pdfService.GetPrintData();
  }

}
