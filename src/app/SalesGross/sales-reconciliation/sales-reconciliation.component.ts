import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../Core/api.service/api.service';
@Component({
  selector: 'app-sales-reconciliation',
  templateUrl: './sales-reconciliation.component.html',
  styleUrls: ['./sales-reconciliation.component.scss']
})
export class SalesReconciliationComponent implements OnInit {

  constructor(public apiSrvc: ApiService, private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal) {
  const data={
    title:'Sales-Reconciliation',
    path1:'',
    path2:'',
    path3:''
}
this.apiSrvc.SetHeaderData({
  obj: data
})
}
  ngOnInit(): void {
    this.apiSrvc.setTitle('Sales Reconciliation');

  }

}
