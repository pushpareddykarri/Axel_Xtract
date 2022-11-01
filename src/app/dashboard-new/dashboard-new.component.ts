import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../Core/api.service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-dashboard-new',
  templateUrl: './dashboard-new.component.html',
  styleUrls: ['./dashboard-new.component.scss'],
 
})
export class DashboardNewComponent implements OnInit {
  @Input() Parentcomponent: any; 
  
  TodayDate:any;
  NoData: boolean = false; 
  store:any=0;
  unitsandgross: any =[];
  FromDate: string;

  constructor(public apiSrvc: ApiService, private route: ActivatedRoute, private router: Router,
     private spinner: NgxSpinnerService,
    private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal) {

      const data={
        title:'Dashboard',
        path1:'',
        path2:'',
        path3:''}
        this.apiSrvc.SetHeaderData({obj: data})
        this.apiSrvc.setTitle('Dashboard');

      
  }
  time:any;
  ngOnInit(): void {
  let date=new Date()
  this.time=date
  this.TodayDate=date.getFullYear()+'-'+("0" + (date.getMonth() + 1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2)
  console.log(this.TodayDate)
  this.FromDate=date.getFullYear()+'-'+("0" + (date.getMonth() + 1)).slice(-2)+'-01'
 
    this.GetData();

  }

  GetData() {
    this.spinner.show();
    const obj = {
    
      "StartDate": this.FromDate,
      "EndDate": this.TodayDate
    };
    this.apiSrvc.postmethod('xtract/GetDealsSummarySalesDashboard', obj).subscribe(
      res => {
        if (res.status == 200) {
          this.unitsandgross = res.response.SalesGrossDashboardData;    
          console.log(this.unitsandgross);
          this.spinner.hide()
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
 
}
