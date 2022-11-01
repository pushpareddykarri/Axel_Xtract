import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../Core/api.service/api.service';

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.component.html',
  styleUrls: ['./financial-summary.component.scss']
})
export class FinancialSummaryComponent implements OnInit {

  constructor(public apiSrvc: ApiService, private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal) { 
    const data={
      title:'Financial Summary',
      path1:'',
      path2:'',
      path3:''
}
  this.apiSrvc.SetHeaderData({
    obj: data
  })
  }

  ngOnInit(): void {
  }

}
