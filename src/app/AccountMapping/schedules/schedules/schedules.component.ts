import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/Core/api.service/api.service';
import { SchedulesTransactionsComponent } from '../schedules-transactions/schedules-transactions.component';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {

  componentDetails:any;
  constructor(public apiSrvc: ApiService, private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal) { 
    const data={
      title:'Schedules / Managed Accounts',
      path1:'',
      path2:'',
      path3:''
}
  this.apiSrvc.SetHeaderData({
    obj: data
  })
  this.apiSrvc.GetHeaderData().subscribe(res => this.componentDetails = res.obj);
  if(this.componentDetails.path1==''){

   }
  }

  ngOnInit(): void {
    this.apiSrvc.setTitle('Schedules / Managed Accounts');
  }

  openMenu(){
    const modalRef = this.ngbmodal.open(SchedulesTransactionsComponent,{
      size:'xl',
      backdrop: "static",
    });
    modalRef.componentInstance.Parentcomponent = 'SMA';
  }

}
