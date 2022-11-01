import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../../Core/api.service/api.service';

@Component({
  selector: 'app-service-reconciliation',
  templateUrl: './service-reconciliation.component.html',
  styleUrls: ['./service-reconciliation.component.scss']
})
export class ServiceReconciliationComponent implements OnInit {

  constructor(public apiSrvc: ApiService, private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal) { 
    const data={
      title:'Service-Reconciliation',
      path1:'',
      path2:'',
      path3:''
  }
  this.apiSrvc.SetHeaderData({
    obj: data
  })
  }

  ngOnInit(): void {
    this.apiSrvc.setTitle('Service Reconciliation');

  }

}
