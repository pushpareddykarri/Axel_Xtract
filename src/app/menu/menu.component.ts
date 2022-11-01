import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private route:Router, private renderer: Renderer2,private ngbmodel: NgbModal,) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement
      if (TagName.className === 'd-block modal fade show modal-static') {
        // this.closeBtn.nativeElement.click();
        this.close()
      }
    });
   }

  ngOnInit() {
  }
  navigate(val){
 
    if(val == 'sa')
    {
      this.route.navigateByUrl('/SalesGross');
    }
    else if(val == 'am')
    {
      this.route.navigateByUrl('/AccountMapping');
    }
    else if(val == 'PG')
    {
      this.route.navigateByUrl('/PartsGross');
    }
    else if(val == 'ID')
    {
      this.route.navigateByUrl('/Inventory');
    }
    else if(val == 'se'){
      this.route.navigateByUrl('/ServiceGross');
    }
    else if(val == 'ar'){
      this.route.navigateByUrl('/adminroles');
    }
    else if(val == 'jt'){
      this.route.navigateByUrl('/jobititles');
    }
    else if(val == 'ms'){
      this.route.navigateByUrl('/adminmodules');
    }
    else if(val == 'ps'){
      this.route.navigateByUrl('/permissions');
    }
    else if(val == 'fr'){
      this.route.navigateByUrl('/floorplan');
    }
    else if(val == 'bc'){
      this.route.navigateByUrl('/balancesheet');
    }
    else if(val == 'slar'){
      this.route.navigateByUrl('/salesreconciliation');
    }
    else if(val == 'sar'){
      this.route.navigateByUrl('/servicereconciliation');
    }
    else if(val == 'par'){
      this.route.navigateByUrl('/partsreconciliation');
    }
    else if(val == 'sh'){
      this.route.navigateByUrl('/schedules');
    }
    else if(val == 'sc'){
      this.route.navigateByUrl('/salesconversion');
    }
    else if(val == 'fs'){
      this.route.navigateByUrl('/financialsummary');
    }

    this.close();
  }
  close() {
    this.ngbmodel.dismissAll()
  }
}
