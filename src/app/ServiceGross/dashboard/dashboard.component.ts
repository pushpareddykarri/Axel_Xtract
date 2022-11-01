import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap'
// import {DetailsComponent} from '../details/details.component'
import { ApiService } from '../../Core/api.service/api.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public apiSrvc: ApiService, private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal) {
    const data={
      title:'Service Gross',
      path1:'All Dealerships',
      path2:'All Advisor ',
      path3:'Open - Closed'
}
  this.apiSrvc.SetHeaderData({
    obj: data
  })

   }


  ngOnInit() {
    this.apiSrvc.setTitle('Service Gross');
  }


}
