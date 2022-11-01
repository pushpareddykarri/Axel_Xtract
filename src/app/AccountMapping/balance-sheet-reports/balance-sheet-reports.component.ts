import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarCellViewModel } from 'ngx-bootstrap/datepicker/models';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApiService } from 'src/app/Core/api.service/api.service';

@Component({
  selector: 'app-balance-sheet-reports',
  templateUrl: './balance-sheet-reports.component.html',
  styleUrls: ['./balance-sheet-reports.component.scss']
})
export class BalanceSheetReportsComponent implements OnInit {

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  HideShow : any ;
  toporbottom: any = ['T'];
  constructor(private ngbmodel: NgbModal, private renderer: Renderer2, private service: ApiService,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private formBuilder: FormBuilder) { 
      this.renderer.listen('window', 'click', (e: Event) => {
        const TagName = e.target as HTMLButtonElement
        if (TagName.className === 'd-block modal fade show modal-static') {
          // this.closeBtn.nativeElement.click();
          this.close()
        }
      });

      let today=  new Date();
      this.fromDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, 1);
      this.toDate = new NgbDate(today.getFullYear() ,  today.getMonth() + 1, today.getDate());
    }

  ngOnInit(): void {
   this.HideAndShow('H')
  }

 
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  save(){

  }

  HideAndShow(e){
    this.HideShow = e;
  }
  viewreport(){
  console.log(this.HideShow);
  this.service.SetReports({
    obj: this.HideShow
  })
  this.close();
  }

  
  close() {
    this.ngbmodel.dismissAll()
  }
  
}
