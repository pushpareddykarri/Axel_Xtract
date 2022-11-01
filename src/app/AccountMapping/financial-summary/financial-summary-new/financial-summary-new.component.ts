import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/Core/api.service/api.service';
import { DetailsComponent } from '../details/details.component';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-financial-summary-new',
  templateUrl: './financial-summary-new.component.html',
  styleUrls: ['./financial-summary-new.component.scss']
})
export class FinancialSummaryNewComponent implements OnInit {

   PresentMonth: any; 
   LastYearMonth:any;
   Today=new Date();

   PresentYear: any;
   PrsntDate:any;
   PresentFullDate:any; 

   LYMdate:any;
   lm_date=new Date();
   LastMonth: any;
  
   PDate=new Date();
   FSData: any = [];
   FS_Design:any =[
     { "SNo": 1,"LABLE1": "Unit Retail Sales","FS_Symbol": 1},
     { "SNo": 2,"LABLE1": "Pure Gross","FS_Symbol": 1},
     { "SNo": 3,"LABLE1": "Variable Gross","FS_Symbol": 1},
     { "SNo": 4,"LABLE1": "Total Fixed","FS_Symbol": 1},
     { "SNo": 5,"LABLE1": "Total Store Gross","FS_Symbol": 1},
     { "SNo": 6,"LABLE1": "Total Store Super Gross","FS_Symbol": 1},
     { "SNo": 7,"LABLE1": "Total Expenses","FS_Symbol": 1},
     { "SNo": 8,"LABLE1": "Operating Profit","FS_Symbol": 1},
     { "SNo": 9,"LABLE1": "Net Adds/Deducts","FS_Symbol": 1},
     { "SNo": 10,"LABLE1": "Net Profit","FS_Symbol": 1},
   ];

   NoData: boolean=false;
  constructor(public apiSrvc: ApiService, private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal,private spinner: NgxSpinnerService) {
    const data={
      title:'Financial Summary',
      path1:'',
      path2:'',
      path3:''
}
  this.apiSrvc.SetHeaderData({
    obj: data
  })
   }

  ngOnInit(): void {
    let today=  new Date();   
     
   
     const format = 'MM-yyyy';
     const locale = 'en-US';
     const myDate = this.PDate;
     const formattedDate = formatDate(myDate, format, locale); 
     this.PrsntDate = formattedDate;
     console.log(this.PrsntDate);

     this.PresentMonth = today;
     this.Today.setMonth(this.Today.getMonth()-12);        
     this.LastYearMonth = this.Today.toISOString().slice(0,10);
     const  lymformatedDate = formatDate(this.LastYearMonth,format,locale)
     this.LYMdate = lymformatedDate
     console.log(this.LYMdate);
     
     const format2 = "yyyy-MM-dd"
     const presentDate = this.PresentMonth
     const PrstFormattedDate = formatDate( presentDate, format2, locale); 
     this.PresentFullDate = PrstFormattedDate
     console.log(this.PresentFullDate);
     
      
      this.lm_date.setMonth(this.lm_date.getMonth()-1);
      this.LastMonth=this.lm_date.toISOString().slice(0,10);
      this.GetData();

  }

  GetData(){
   this.FSData = [];
   this.spinner.show();
   let Obj ={
    "as_Id":"0",
    "SalesDate":this.PresentFullDate
    }
   this.apiSrvc.postmethod('xtract/GetFinancialSummaryReport', Obj).subscribe(
    res => {
      if (res.status == 200) {
        this.FSData = res.response
        console.log(this.FSData);  
        this.FSData = this.FSData.map(v => ({ ...v, FS_Symbol :'3' }))
        console.log(this.FSData);

        this.FSData.forEach((val,i)=>{
          if(i == 2 || i == 5 || i == 8 || i==12 || i==13 
            || i==18 || i == 29 || i == 30 || i == 36 || i ==37){
            val.FS_Symbol = '2'
          }
        })
        console.log("Fs Data", this.FSData);
        
        if (this.FSData.length == 0) {
          this.NoData = true;
        }
        else {
          this.NoData = false
        }     
        this.spinner.hide(); 
      }
      else {
        alert('Invalid Details');
      }
    },
    (error) => {
      console.log(error);
    })
  }


  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }
  
  openMenu(Object,Date){
    console.log(Object);
    console.log(Date);
    
    const DetailsSalesPeron = this.ngbmodal.open(DetailsComponent,{
      size:'xl',
      backdrop: "static",
    });
    DetailsSalesPeron.componentInstance.Fsdetails = {"TYPE":Object.LABLE1Val,"NAME":Object.LABLE1,"DATE":Date,"STORES":""};
  }

}
