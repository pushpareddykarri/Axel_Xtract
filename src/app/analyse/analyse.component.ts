import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbCalendar, NgbDateParserFormatter, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss']
})
export class AnalyseComponent implements OnInit {

  constructor(private ngbmodel: NgbModal,) { }


  ngOnInit(): void {
  }
  close() {
    this.ngbmodel.dismissAll()
  }

}
