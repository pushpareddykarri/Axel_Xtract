import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/Core/api.service/api.service';


@Component({
  selector: 'app-sc-details',
  templateUrl: './sc-details.component.html',
  styleUrls: ['./sc-details.component.scss']
})
export class ScDetailsComponent implements OnInit {
  @Input() SalesCondetails: any = [];
  constructor(private ngbmodel: NgbModal, private renderer: Renderer2, private service: ApiService) { 
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement
      if (TagName.className === 'd-block modal fade show modal-static') {
        // this.closeBtn.nativeElement.click();
        this.close()
      }
    });
  }

  ngOnInit(): void {
  }
  viewreport(){

  }
  save(){

  }
  close() {
    this.ngbmodel.dismissAll()
  }
}
