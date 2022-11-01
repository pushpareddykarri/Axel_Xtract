import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../Core/api.service/api.service';

@Component({
  selector: 'app-parts-reconciliation',
  templateUrl: './parts-reconciliation.component.html',
  styleUrls: ['./parts-reconciliation.component.scss']
})
export class PartsReconciliationComponent implements OnInit {

  constructor(public apiSrvc: ApiService, private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal) { 
    const data={
      title:'Parts-Reconciliation',
      path1:'',
      path2:'',
      path3:''
  }
  this.apiSrvc.SetHeaderData({
    obj: data
  })
  }

  ngOnInit(): void {
    this.apiSrvc.setTitle('Parts Reconciliation');

  }

}
