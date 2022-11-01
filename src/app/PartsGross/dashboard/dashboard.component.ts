import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/Core/api.service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public apiSrvc: ApiService, private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal) {
    const data={
      title:'Parts Gross',
      path1:'All Dealerships',
      path2:'All Advisor ',
      path3:'Open - Closed'
}
  this.apiSrvc.SetHeaderData({
    obj: data
  })
   }

  ngOnInit(): void {
    this.apiSrvc.setTitle('Parts Gross');
  }

}
