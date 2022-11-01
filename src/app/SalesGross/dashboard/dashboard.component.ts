import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ApiService } from '../../Core/api.service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap'
import {SalesReportsComponent} from '../sales-reports/sales-reports.component'
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() Parentcomponent: any;
  @Input() Salesdetails: any=[];

  
  SalesData: any = [];
  IndividualSalesGross: any = [];
  TotalSalesGross: any = [];

  FromDate: any = '1';
  ToDate: any = '';
  TotalReport: any = 'T';

  NoData: boolean = false;
  store:any=0;

  constructor(public apiSrvc: ApiService, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService,
    private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal) {

      const data={
        title:'Sales Gross',
        path1:'All Dealerships',
        path2:'New - Used',
        path3:'All Salespeople'}
        this.apiSrvc.SetHeaderData({obj: data})
  }
  ngOnInit(): void {
    this.apiSrvc.setTitle('Sales Gross');
    let today=  new Date();
    this.FromDate=today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-01'
    this.ToDate=today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+("0" + today.getDate()).slice(-2)
    this.GetData();
  }

  GetData() {
    this.SalesData = [];
    this.IndividualSalesGross = []
    this.spinner.show();
    const obj = {
      "store_id": this.store,
      "startdealdate": this.FromDate,
      "enddealdate": this.ToDate,
      "type": "A"
    };

    this.apiSrvc.postmethod('xtract/GetDealsSummary', obj).subscribe(
      res => {
        if (res.status == 200) {
          this.IndividualSalesGross = res.response
                    this.GetTotalData();
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

      "store_id": this.store,
      "startdealdate": this.FromDate,
      "enddealdate": this.ToDate,
      "type": "R"
    }
    this.apiSrvc.postmethod('xtract/GetDealsSummary', obj).subscribe(
      totalres => {
        if (totalres.status == 200) {
          this.TotalSalesGross = totalres.response
          this.TotalSalesGross.forEach(val => {
            val.DealerName = "Reports Total"
          })
          if (this.TotalReport == 'B') {
            this.IndividualSalesGross.push(this.TotalSalesGross[0])
          }
          else {
            this.IndividualSalesGross.unshift(this.TotalSalesGross[0])
          }
          this.IndividualSalesGross.forEach((val,i) => {
            if(val.DealerName== "Reports Total") {
              val.Newbysalesperson = ""
              val.New = JSON.parse(val.New)
              val.Used = JSON.parse(val.Used)
              val.Usedbysalesperson = ""
              val.Dealer ='+';
              val.NewDealer ='-';
              val.UsedDealer = '-';       
             // val.DealerName=val.DealerName.toLowerCase()       
              val.Name=val.DealerName 
              this.SalesData.push(val)
               
            }
            else{
          
              val.Newbysalesperson = JSON.parse(val.Newbysalesperson)
              val.New = JSON.parse(val.New)
              val.Used = JSON.parse(val.Used)
              val.Usedbysalesperson = JSON.parse(val.Usedbysalesperson)
              val.Dealer ='+';
              val.NewDealer ='-';
              val.UsedDealer = '-';       
             // val.DealerName=val.DealerName.toLowerCase() 
              val.Name=val.DealerName 

              this.SalesData.push(val)
            }
          
          })
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
        const headerdata={
          title:'Sales Gross',
          path1:data.obj.dataGroupingvalues[0].ARG_LABEL,
          path2:data.obj.dataGroupingvalues[1].ARG_LABEL,
          path3:data.obj.dataGroupingvalues[2].ARG_LABEL,
    }
      this.apiSrvc.SetHeaderData({
        obj: headerdata
      })
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
    const DetailsSalesPeron = this.ngbmodal.open(DetailsComponent,{
      // size:'xl',
      backdrop: "static",
    });
    DetailsSalesPeron.componentInstance.Salesdetails = [{"storeId":ParentItem.Storeid,"SPID":Item.SPID,"StartDate":this.FromDate,"EndDate":this.ToDate,"salesPerson":Item.spname, "dealType":type}];

  }

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
