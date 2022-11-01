
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../Core/api.service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class  DashboardComponent implements OnInit {


  constructor(public apiSrvc: ApiService, private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal) { 
    const data={
      title:'Cit Floorplan Report',
      path1:'',
      path2:'',
      path3:''
}
  this.apiSrvc.SetHeaderData({
    obj: data
  })
  }

  ngOnInit(): void {
    this.apiSrvc.setTitle('Cit Floorplan Report');
  }

  avgdays(template){
    this.ngbmodalActive = this.ngbmodal.open(template, { size: 'sm', backdrop: 'static' });

  }

  onclose() {
    this.ngbmodalActive.close();
      }
}

