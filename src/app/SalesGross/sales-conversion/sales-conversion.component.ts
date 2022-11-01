import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Core/api.service/api.service';

@Component({
  selector: 'app-sales-conversion',
  templateUrl: './sales-conversion.component.html',
  styleUrls: ['./sales-conversion.component.scss']
})
export class SalesConversionComponent implements OnInit {
  showhide:any=[]
  constructor(public apiSrvc: ApiService,) {
    const data={
      title:'Sales Conversion',
      path1:'',
      path2:'',
      path3:'',
      path1id:'',
      path2id:'',
      path3id:''
    }
      this.apiSrvc.SetHeaderData({obj: data})
    this.apiSrvc.setTitle('Sales Conversion');

   }

  ngOnInit(): void {
  }
  expandandCollapse(e){
   
    const index = this.showhide.findIndex(i => i == e)
    if (index >= 0) {
      if(e=='M'){
        this.showhide=[]      
      }
      else{
        this.showhide.splice(index, 1)  
       }
    }
    else {
    
      this.showhide.push(e)
    }
  }
}
