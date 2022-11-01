import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/Core/api.service/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() Fsdetails: any ;

  FSDetailsData : any =[];
  NoData: boolean;
  spinnerLoader:boolean=true
  constructor(private ngbmodel: NgbModal, private renderer: Renderer2, private apiSrvc: ApiService) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement
      if (TagName.className === 'd-block modal fade show modal-static') {
        // this.closeBtn.nativeElement.click();
        this.close()
      }
    });
   }

  ngOnInit(): void {
    console.log(this.Fsdetails);
    this.GetDetails();
    
  }

  GetDetails(){
   const Obj ={
      "Type": this.Fsdetails.TYPE,
      "Date": this.Fsdetails.DATE,
      "Stores": ""
  }
  this.apiSrvc.postmethod('xtract/GetFinacialSummaryDetails', Obj).subscribe(
    res => {

      if (res.status == 200) {
        this.FSDetailsData=res.response
        console.log(this.FSDetailsData);
        // this.spinner.hide()
        this.spinnerLoader=false;
        if (this.FSDetailsData.length > 0) {
          this.NoData = false
        }
        else {
          this.NoData = true
        }
      }
    })
  }
  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }
  
  close() {
    this.ngbmodel.dismissAll()
  }


}
