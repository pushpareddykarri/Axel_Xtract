import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ApiService } from '../../Core/api.service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap'
import {SalesReportsComponent} from '../sales-reports/sales-reports.component'
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-dashboard-new',
  templateUrl: './dashboard-new.component.html',
  styleUrls: ['./dashboard-new.component.scss']
})
export class DashboardNewComponent implements OnInit {
  @Input() Parentcomponent: any;
  @Input() Salesdetails: any=[];

  
  SalesData: any = [];
  IndividualSalesGross: any = [];
  TotalSalesGross: any = [];

  FromDate: any 
  ToDate: any 
  TotalReport: any = 'T';

  NoData: boolean = false;
  store:any=0;

  type='1';
  path2:any;
  path3:any;

  CompleteComponentState:boolean=true
  constructor(public apiSrvc: ApiService, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService,
    private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal) {

      const data={
        title:'Sales Gross',
        path1:'All Dealerships',
        path2:'New - Used',
        path3:'All Salespeople'}
        this.apiSrvc.SetHeaderData({obj: data})

        this.path2='New - Used'
        this.path3='All Salespeople'

  }


  ngOnInit(): void {
    this.apiSrvc.setTitle('Sales Gross');
  let today=  new Date();
  
    this.FromDate=today.getFullYear()+'-'+("0" + (today.getMonth() +1  )).slice(-2)+'-01'

    this.ToDate=today.getFullYear()+'-'+("0" + (today.getMonth() +1 )).slice(-2)+'-'+("0" + today.getDate()).slice(-2)
    this.GetData();

  }

  GetData() {
    this.SalesData = [];
    this.IndividualSalesGross = []
    this.spinner.show();
    const obj = {
      "StartDate": this.FromDate,
      "EndDate": this.ToDate,  
      "type": this.type,
      "Rowtype":"D",
    };

    this.apiSrvc.postmethod('xtract/GetDealsSummaryDashboard', obj).subscribe(
      res => {
        if (res.status == 200) {
          this.IndividualSalesGross = res.response
           this.GetTotalData();
        //   this.SalesData.some(function(x:any){
        //     x.New_User=JSON.parse(x.New_User);  
        //     x.Used_User = JSON.parse(x.Used_User);
        //     x.Dealer ='+';
        //     x.NewDealer ='-';
        //     x.UsedDealer = '-';  
        //     return false;  
        //   });
        //   console.log(this.SalesData)
        //  this.spinner.hide()
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      })
  }
  GetTotalData() { 
    this.TotalSalesGross = []
    const obj = {
      "StartDate": this.FromDate,
      "EndDate": this.ToDate,  
      "type": this.type,
      "Rowtype":"T",
    }
    this.apiSrvc.postmethod('xtract/GetDealsSummaryDashboard', obj).subscribe(
      totalres => {
        if (totalres.status == 200) {
          this.TotalSalesGross = totalres.response
          // this.TotalSalesGross.forEach(val => {
          //   val.DealerName = "Reports Total"
          // })
          if (this.TotalReport == 'B') {
            this.IndividualSalesGross.push(this.TotalSalesGross[0])
          }
          else {
            this.IndividualSalesGross.unshift(this.TotalSalesGross[0])
          }
          this.SalesData=this.IndividualSalesGross
             this.SalesData.some(function(x:any){
               if(x.Store_Name != 'Reports Total'){
               
            x.New_User=JSON.parse(x.New_User);  
            x.Used_User = JSON.parse(x.Used_User);
               }
            x.Dealer ='+';
            x.NewDealer ='-';
            x.UsedDealer = '-';  
            return false;  
          });
          console.log(this.SalesData)
         this.spinner.hide()
          // this.IndividualSalesGross.forEach((val,i) => {
          //   if(val.DealerName== "Reports Total") {
          //     // val.Newbysalesperson = ""
          //     val.New = JSON.parse(val.New)
          //     val.Used = JSON.parse(val.Used)
          //     // val.Usedbysalesperson = ""
          //     val.Dealer ='+';
          //     val.NewDealer ='-';
          //     val.UsedDealer = '-';       
          //    // val.DealerName=val.DealerName.toLowerCase()       
          //     val.Name=val.DealerName 
          //     this.SalesData.push(val)
               
          //   }
          //   else{
          
          //     val.Newbysalesperson = JSON.parse(val.Newbysalesperson)
          //     val.New = JSON.parse(val.New)
          //     val.Used = JSON.parse(val.Used)
          //     val.Usedbysalesperson = JSON.parse(val.Usedbysalesperson)
          //     val.Dealer ='+';
          //     val.NewDealer ='-';
          //     val.UsedDealer = '-';       
          //    // val.DealerName=val.DealerName.toLowerCase() 
          //     val.Name=val.DealerName 

          //     this.SalesData.push(val)
          //   }
          
          // })

          if (this.SalesData.length == 0) {
            this.NoData = true;
          }
          else {
            this.NoData = false
          }
          this.spinner.hide();
         console.log(this.SalesData);
         
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      })
  }

 
  ngAfterViewInit(): void {
      this.apiSrvc.GetReports().subscribe((data) => {
      if (data.obj.Reference == 'SG') {
        this.TotalReport = data.obj.TotalReport
        let p1,p2,p3  
    //     data.obj.dataGroupingvalues.forEach((val,i)=>{
    //       if(i==0){
    //           p1=val.ARG_LABEL
    //       }
    //       if(i==1){
    //         p2=val.ARG_LABEL
    //       }
    //       if(i==2){
    //         p3=val.ARG_LABEL
    //       }
      
    //     })
    //  const  headerdata={
    //       title:'Sales Gross',
    //       path1:p1 == undefined? '': p1 ,
    //       path2:p2 == undefined? '': p2 ,
    //       path3:p3 == undefined? '': p3 ,
    // }
    //    console.log(headerdata)
    //   this.apiSrvc.SetHeaderData({
    //     obj: headerdata
    //   })

    const  headerdata={
            title:'Sales Gross',
            path1:data.obj.dataGroupingvalues[0] == undefined? '': data.obj.dataGroupingvalues[0].ARG_LABEL ,
            path2:data.obj.dataGroupingvalues[1] == undefined? '': data.obj.dataGroupingvalues[1].ARG_LABEL ,
            path3:data.obj.dataGroupingvalues[2] == undefined? '': data.obj.dataGroupingvalues[2].ARG_LABEL ,
      }
      this.path2=data.obj.dataGroupingvalues[1] == undefined? '': data.obj.dataGroupingvalues[1].ARG_LABEL
      this.path3=data.obj.dataGroupingvalues[2] == undefined? '': data.obj.dataGroupingvalues[2].ARG_LABEL

      
       if(data.obj.dataGroupingvalues[0] == undefined || data.obj.dataGroupingvalues[0].ARG_LABEL != 'Store' ){
        this.path2='New - Used'
        this.path3='All Salespeople'
      }
    else if(this.path2=='New/Used'){
        this.path2='New - Used'
        // this.path3='All Salespeople'
      }
      else if(this.path2 == ''){
        this.path3=''
      }
  
      else{
        this.path3='All Salespeople'
      }
         console.log(headerdata)
        this.apiSrvc.SetHeaderData({
          obj: headerdata
        })
        if(data.obj.dataGroupingvalues[2] != undefined){
          if(data.obj.dataGroupingvalues[2].ARG_LABEL=='Sales Manager'){
            this.type='2'
          }
            if(data.obj.dataGroupingvalues[2].ARG_LABEL=='F&I Manager'){
            this.type='3'
          }
            if(data.obj.dataGroupingvalues[2].ARG_LABEL=='Salesperson'){
            this.type='1'
          }
          if(data.obj.dataGroupingvalues[2].ARG_LABEL=='Sale Type'){
            this.type='10'
          }
        }

   
      // this.apiSrvc.SetHeaderData({
      //   obj: headerdata
      // })
        if (data.obj.FromDate != undefined && data.obj.ToDate != undefined) {
          this.FromDate = data.obj.FromDate;
          this.ToDate = data.obj.ToDate;
          this.store=data.obj.storeValues;
        
          this.GetData()
        }
        else {
          this.FromDate = this.FromDate;
          this.ToDate = this.ToDate;
          this.store=data.obj.storeValues;
          this.GetData()
        }
      }
    })
  }
 
  expandorcollapse(ind, e,ref,Item) {
    let id = (e.target as Element).id  
    if (id == 'D_' + ind) {
      if(ref=='-'){    
      Item.Dealer='+'   
      }
      if(ref == '+'){
        Item.Dealer='-'      
      }
     }
     if (id == 'DN_' + ind) {
       if(ref=='-'){   
      Item.NewDealer='+'
       }
       if(ref == '+'){
      Item.NewDealer='-'       
         }
      }
      if (id == 'DU_' + ind) {
       if(ref=='-'){     
      Item.UsedDealer='+'
       }
       if(ref == '+'){
        Item.UsedDealer='-'     
       }
      }
  }
  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }
  openMenu(){
    const modalRef = this.ngbmodal.open(SalesReportsComponent,{
      size:'xl',
      backdrop: "static",
    });
    modalRef.componentInstance.Parentcomponent = 'SG';
  }
  openDetails(Item,ParentItem, type){
    if(this.type != '10'){   
    this.CompleteComponentState=false
    const DetailsSalesPeron = this.ngbmodal.open(DetailsComponent,{
      // size:'xl',
      backdrop: "static",
    });
    DetailsSalesPeron.componentInstance.Salesdetails = [{"storeId":ParentItem.Store_ID,"SPID":Item.UserID,"StartDate":this.FromDate,"EndDate":this.ToDate,"salesPerson":Item.UserName, "dealType":type}];
    DetailsSalesPeron.result.then((data) => {
        }, (reason) => {
      // on dismiss
      this.CompleteComponentState=true
    
    });
  }
  }

  isDesc: boolean = false;
  column: string = 'CategoryName';

  sort(property) {
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    let direction = this.isDesc ? 1 : -1;
console.log(property)
    this.SalesData.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  };

  currentElement: string;

  @ViewChild('scrollOne') scrollOne: ElementRef;
  @ViewChild('scrollTwo') scrollTwo: ElementRef;

  updateVerticalScroll(event): void {
    if (this.currentElement === 'scrollTwo') {
      this.scrollOne.nativeElement.scrollTop = event.target.scrollTop;
    } else if (this.currentElement === 'scrollOne') {
      this.scrollTwo.nativeElement.scrollTop = event.target.scrollTop;
    }
  }

  updateCurrentElement(element: 'scrollOne' | 'scrollTwo') {
    this.currentElement = element;
  }

}
