import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../Core/api.service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() Parentcomponent: any;
  

  
  
TodayDate:any;
  NoData: boolean = false;
  store:any=0;
  unitsandgross: any =[];
  Time:any;

  constructor(public apiSrvc: ApiService, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService,
    private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal) {

      const data={
        title:'Dashboard',
        path1:'',
        path2:'',
        path3:''}
        this.apiSrvc.SetHeaderData({obj: data})

      
  }
  ngOnInit(): void {
    let date=new Date()
    this.TodayDate=date.getFullYear()+'-'+("0" + (date.getMonth() + 1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2)
    this.Time=date
    //this.TodayDate=date.getFullYear()+'-'+date.getMonth()+1+'-'+date.getDate()
    this.GetData();
    this.apiSrvc.setTitle('Dashboard');

  }

  GetData() {
   
    this.spinner.show();
    const obj = {
      "date1": "2022-07-14"
    };

    this.apiSrvc.postmethod('xtract/GetUnitsGrossMTD', obj).subscribe(
      res => {
        if (res.status == 200) {
          this.unitsandgross = res.response;     
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
