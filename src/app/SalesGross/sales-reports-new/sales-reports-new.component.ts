import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbCalendar, NgbDateParserFormatter, NgbDate, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormArray, FormGroup, } from '@angular/forms';
import { ApiService } from '../../Core/api.service/api.service'
import { CalendarCellViewModel } from 'ngx-bootstrap/datepicker/models';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-sales-reports-new',
  templateUrl: './sales-reports-new.component.html',
  styleUrls: ['./sales-reports-new.component.scss']
})
export class SalesReportsNewComponent implements OnInit {

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  maxDate: any;
  hoveredDate: NgbDate | null = null;

  selectedDataGrouping: any = [];
  GroupingDetails: any = [];
  dataGrouping: any = [];
  datagrp: any = [];

  stores: any = [];
  salesPersons: any = [];
  salesManagers: any = [];
  financeManager: any = [];

  neworused: any = ['New', 'Used']
  retailorlease: any = ['Retail', 'Lease', 'Misc'];
  includeorexclude: any = ['I'];
  dealstatus: any = ['Delivered', 'Capped', 'Finalized'];
  selecttarget: any = ['F'];
  toporbottom: any = ['T'];
  includecharges: any = ['N'];
  Transactorgl: any = ['T'];
  section:any=['Groupings(s)']
  selectedstorevalues:any=[]
  selectedSalespersonvalues:any=[]
  selectedSalesManagersvalues:any=[]
  selectedFiManagersvalues:any=[]

  Performance:any='Load'

  Groupingcols = [
    { id: 1, "columnname": 'store' },
    { id: 2, "columnname": 'ad_dealtype' },
    { id: 3, "columnname": 'ad_dealtype2' },
    { id: 4, "columnname": 'salesperson' },
    { id: 5, "columnname": 'fimanager' },
    { id: 6, "columnname": 'salesmanager' },
    { id: 16, "columnname": 'ad_Lender' },
    { id: 17, "columnname": 'ad_dealstatus' },
    { id: 19, "columnname": 'ad_Year' },
    { id: 24, "columnname": 'ad_styleid' },
    { id: 25, "columnname": 'ad_Month' },

    { id: 7, "columnname": '' },
    { id: 8, "columnname": '' },
    { id: 9, "columnname": '' },
    { id: 10, "columnname": 'ad_custzip' },
    { id: 11, "columnname": 'ad_custstate' },
    { id: 12, "columnname": 'ad_custAge' },
    { id: 13, "columnname": '' },
    { id: 14, "columnname": '' },
    { id: 15, "columnname": '' },
    { id: 18, "columnname": '' },
    { id: 20, "columnname": 'ad_make' },
    { id: 21, "columnname": 'ad_model' },
    { id: 22, "columnname": '' },
    { id: 23, "columnname": 'ad_trim' }
  ];

  Categories =[
  {'Cat_Name':'Groupings(s)'  ,"Cat_length":this.selectedDataGrouping.length},
  {'Cat_Name':'Store(s)'  ,"Cat_length":this.selectedstorevalues.length},
  {'Cat_Name':'F&I Manager(s)'  ,"Cat_length":this.selectedFiManagersvalues.length},
  {'Cat_Name':'Sales Manager(s)'  ,"Cat_length":this.selectedSalesManagersvalues.length},
  {'Cat_Name':'Salesperson(s)'  ,"Cat_length":this.selectedSalespersonvalues.length},
  {'Cat_Name':'Retail/Lease'  ,"Cat_length":this.retailorlease.length},
  {'Cat_Name':'Deal Status'  ,"Cat_length":this.dealstatus.length},
  {'Cat_Name':'Target'  ,"Cat_length":this.selecttarget.length},

  ]
  constructor(private ngbmodel: NgbModal, private renderer: Renderer2, private service: ApiService,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private formBuilder: FormBuilder, private config: NgbDatepickerConfig){
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement
      if (TagName.className === 'd-block modal fade show modal-static') {
        this.close()
      }
    });
    let today = new Date();   
    this.fromDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, 1);
    this.toDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate() - 1);
    this.maxDate = {
      year: today.getFullYear(),month: today.getMonth() + 1,day: today.getDate() - 1
   };  
  }

  ngOnInit(): void {
    this.getDataGroupings();
    this.getStores();
    this.service.GetHeaderData().subscribe(res => {
      if(res.obj.title == 'Sales Gross' && this.Performance=='Load'){
      this.neworused=res.obj.dealType.split(',')
      this.retailorlease=res.obj.saleType.split(',')  
      this.dealstatus= res.obj.dealStatus.split(',')
      }
    })
  }

  getDataGroupings() {
    this.selectedDataGrouping = []
    this.GroupingDetails = []
    const obj = {
      "pageid": 1
    };

    this.service.postmethod('xtract/GetDataGroupingsbyPage', obj).subscribe(
      res => {
        if (res.status == 200) {
          this.dataGrouping = res.response
          this.dataGrouping.forEach(ele => {
            ele.state = false
            this.Groupingcols.forEach(val => {
              if (ele.ARG_ID == val.id) {
                ele.columnName = val.columnname
              }
              if (ele.ARG_ID != "1" && ele.ARG_ID != "2" && ele.ARG_ID != "10"  && ele.ARG_ID != "11" && ele.ARG_ID != "12" && ele.ARG_ID != "20" && ele.ARG_ID != "21" && ele.ARG_ID != "23" &&
               ele.ARG_ID != "3" && ele.ARG_ID != "4" && ele.ARG_ID != "5" && ele.ARG_ID != "6" && ele.ARG_ID != "16" && ele.ARG_ID != "17"  && ele.ARG_ID != "24" && ele.ARG_ID != "19" && ele.ARG_ID != "25" ) {
                ele.Active = 'N'
              }
              else {
                ele.Active = 'Y'
              }
            })
            this.service.GetHeaderData().subscribe(res => {
              if(res.obj.title == 'Sales Gross' && this.Performance=='Load'){
              this.GroupingDetails = []
              this.GroupingDetails = res.obj

              this.selectedDataGrouping = []

              if (this.GroupingDetails.path1id != '') {
                if (ele.ARG_ID == this.GroupingDetails.path1id) {
                  this.datagrp[0] = ele

                  ele.state = true
                }
              }
              if (this.GroupingDetails.path12d != '') {
                if (ele.ARG_ID == this.GroupingDetails.path2id) {
                  this.datagrp[1] = ele
                  ele.state = true
                }
              }
              if (this.GroupingDetails.path3id != '') {
                if (ele.ARG_ID == this.GroupingDetails.path3id) {
                  this.datagrp[2] = ele
                  ele.state = true
                }
              }
              // console.log(this.datagrp)
            }
            });

          });

          this.selectedDataGrouping = this.datagrp
          this.Categories[0].Cat_length=this.selectedDataGrouping.length
          console.log(this.Categories);
     
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      })
  }


  // getStores() {
   
  //   const obj = {
  //     "AU_ID": 1
  //   };
  //   this.service.postmethod('xtract/GetStores', obj).subscribe(
  //     res => {
  //       if (res.status == 200) {
  //         this.stores = res.response
  //         console.log(this.stores);
  //         this.service.GetHeaderData().subscribe(res => {
  //           if(res.obj.title == 'Sales Gross' && this.Performance=='Load'){ 
  //             if (res.obj.stores != '' && res.obj.stores != '0') { 
  //             this.selectedstorevalues=[]        
  //             var result = res.obj.stores.split(',')
  //             this.selectedstorevalues  = result.map(function (x) { 
  //               return parseInt(x, 10); 
  //             });
  //             this.Categories[1].Cat_length=this.selectedstorevalues.length
  //             console.log(this.selectedstorevalues)
  //             this.getEmployees('SP', this.selectedstorevalues.toString());
  //             this.getEmployees('F', this.selectedstorevalues.toString());
  //             this.getEmployees('M', this.selectedstorevalues.toString());
  //             }
  //           }        
  //         });
  //       }
  //       else {
  //         alert('Invalid Details'); 
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     })
  // }

  selectedStoresRegions:any=[]
  storesSelection(e){
    const index = this.selectedStoresRegions.findIndex(i => i == e)
    if (index >= 0) {
      this.selectedStoresRegions.splice(index, 1)
   let result= this.stores.findIndex(val=> val.Region == e )
 this.stores[result].Stores=this.stores[result].Stores.map(v => ({ ...v, status: false}))
 console.log(this.stores)
 
    }
    else {
      this.selectedStoresRegions.push(e)
      let result= this.stores.findIndex(val=> val.Region == e )
 console.log(this.stores)
      this.stores[result].Stores=this.stores[result].Stores.map(v => ({ ...v, status: true}))
 console.log(this.stores)

    }
  }

  individualStores(e,idx,prnt){
    const index = this.selectedstorevalues.findIndex(i => i == e.AS_ID)
    if (index >= 0) {
      this.selectedstorevalues.splice(index, 1)
      e.status=false
   let result= this.stores[idx].Stores.filter(val=> val.status == false )
   console.log(result)
     if(result.length>0){
    const indexed = this.selectedStoresRegions.findIndex(i => i == prnt)
   console.log(indexed)
      this.selectedStoresRegions.splice(indexed, 1)
     }
    }
    else {
      this.selectedstorevalues.push(e.AS_ID)
      e.status=true
      let result= this.stores[idx].Stores.filter(val=> val.status == false )
      console.log(result)
      if(result.length<=0){
     const index = this.selectedStoresRegions.findIndex(i => i == prnt)
     this.selectedStoresRegions.push(prnt)

      }
    } 
  
  }
  getStores() {
   
    const obj = {};
    this.service.postmethod('xtract/GetRegionInfo', obj).subscribe(
      res => {
        if (res.status == 200) {
          this.stores = res.response
          this.stores.some(function(x:any){
                x.Stores=JSON.parse(x.Stores);  
                x.Stores.some(function(y:any){ 
                  y.status=false
                })
                 return false;  
              });
          console.log(this.stores);

          this.service.GetHeaderData().subscribe(res => {
            if(res.obj.title == 'Sales Gross' && this.Performance=='Load'){ 
              if (res.obj.stores != '' && res.obj.stores != '0') { 
              this.selectedstorevalues=[]        
              var result = res.obj.stores.split(',')
              this.selectedstorevalues  = result.map(function (x) { 
                return parseInt(x, 10); 
              });
              this.Categories[1].Cat_length=this.selectedstorevalues.length
              console.log(this.selectedstorevalues)
              // this.getEmployees('SP', this.selectedstorevalues.toString());
              // this.getEmployees('F', this.selectedstorevalues.toString());
              // this.getEmployees('M', this.selectedstorevalues.toString());
              }
            }        
          });
        }
        else {
          alert('Invalid Details'); 
        }
      },
      (error) => {
        console.log(error);
      })
  }
  getEmployees(val, ids) {

    const obj = {
      "AS_ID": ids,
      "type": val
    };
    this.service.postmethod('xtract/GetEmployeesDev', obj).subscribe(
      res => {
        if (res.status == 200) {
          if (val == 'SP') {
            this.salesPersons = res.response;
            this.service.GetHeaderData().subscribe(data => {
              if(data.obj.title == 'Sales Gross' && this.Performance=='Load'){     
                if(data.obj.salespresons !='' && data.obj.salespresons !='0'){
                  this.selectedSalespersonvalues = data.obj.salespresons.split(',')
                  this.Categories[4].Cat_length=this.selectedSalespersonvalues.length 
                }      
              }
            });
          }
          if (val == 'F') {
            this.financeManager = res.response;
            this.service.GetHeaderData().subscribe(data => {
              if(data.obj.title == 'Sales Gross' && this.Performance=='Load'){   
                if(data.obj.financemanagers !='' && data.obj.financemanagers !='0'){                               
                  this.selectedFiManagersvalues  = data.obj.financemanagers.split(',')  
                  this.Categories[2].Cat_length=this.selectedFiManagersvalues.length
                }         
              }
            });
          }
          if (val == 'M') {
            this.salesManagers = res.response
            this.service.GetHeaderData().subscribe(data => {
              if(data.obj.title == 'Sales Gross' && this.Performance=='Load'){
                if(data.obj.salesmanagers !='' && data.obj.salesmanagers !='0'){
                  this.selectedSalesManagersvalues  = data.obj.salesmanagers.split(',')
                  this.Categories[3].Cat_length=this.selectedSalesManagersvalues.length
                 }      
               }
            });
          }
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      })
  }
  // getEmployees(val, ids) {

  //   const obj = {
  //     "AS_ID": ids,
  //     "type": val
  //   };
  //   this.service.postmethod('xtract/GetUserByStore', obj).subscribe(
  //     res => {
  //       if (res.status == 200) {
  //         if (val == 'SP') {
  //           this.salesPersons = res.response;
  //           this.salesPersons.some(function(x:any){
  //             x.UserInfo=JSON.parse(x.UserInfo);  
  //             x.UserInfo.some(function(y:any){ 
  //               y.status=false
  //             })
  //              return false;  
  //           });
  //           // this.service.GetHeaderData().subscribe(data => {
  //           //   if(data.obj.title == 'Sales Gross' && this.Performance=='Load'){     
  //           //     if(data.obj.salespresons !='' && data.obj.salespresons !='0'){
  //           //       this.selectedSalespersonvalues = data.obj.salespresons.split(',')
  //           //       this.Categories[4].Cat_length=this.selectedSalespersonvalues.length 
  //           //     }      
  //           //   }
  //           // });
  //         }
  //         if (val == 'F') {
  //           this.financeManager = res.response;
  //           this.financeManager.some(function(x:any){
  //             x.UserInfo=JSON.parse(x.UserInfo);  
  //             x.UserInfo.some(function(y:any){ 
  //               y.status=false
  //             })
  //              return false;  
  //           });
  //           // this.service.GetHeaderData().subscribe(data => {
  //           //   if(data.obj.title == 'Sales Gross' && this.Performance=='Load'){   
  //           //     if(data.obj.financemanagers !='' && data.obj.financemanagers !='0'){                               
  //           //       this.selectedFiManagersvalues  = data.obj.financemanagers.split(',')  
  //           //       this.Categories[2].Cat_length=this.selectedFiManagersvalues.length
  //           //     }         
  //           //   }
  //           // });
  //         }
  //         if (val == 'M') {
  //           this.salesManagers = res.response
  //           this.salesManagers.some(function(x:any){
  //             x.UserInfo=JSON.parse(x.UserInfo);  
  //             x.UserInfo.some(function(y:any){ 
  //               y.status=false
  //             })
  //              return false;  
  //           });
  //           // this.service.GetHeaderData().subscribe(data => {
  //           //   if(data.obj.title == 'Sales Gross' && this.Performance=='Load'){
  //           //     if(data.obj.salesmanagers !='' && data.obj.salesmanagers !='0'){
  //           //       this.selectedSalesManagersvalues  = data.obj.salesmanagers.split(',')
  //           //       this.Categories[3].Cat_length=this.selectedSalesManagersvalues.length
  //           //      }      
  //           //    }
  //           // });
  //         }
  //       }
  //       else {
  //         alert('Invalid Details');
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     })
  // }
  onDateSelection(date: NgbDate) {

    if (!this.fromDate && !this.toDate) {     
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {   
           this.toDate = date;
    } else {     
      this.toDate = null;
      this.fromDate = date;
    }
  }

  pushvalue(val) {
    if (val.state == false) {
      if (this.selectedDataGrouping.length >= 3) {
        alert('Select up to 3 Filters only To Group Your Data')
      }
      else {
        val.state = true
        this.selectedDataGrouping.push(val)
      }
    }
    else {
      val.state = false;
      this.selectedDataGrouping.splice(this.selectedDataGrouping.indexOf(val), 1)
    }
    console.log(this.selectedDataGrouping)
  }

  multipleorsingle(block, e) {

    if(block == 'Cat'){
      this.Categories =[
        {'Cat_Name':'Groupings(s)',"Cat_length":this.selectedDataGrouping.length},
        {'Cat_Name':'Store(s)',"Cat_length":this.selectedstorevalues.length},
        {'Cat_Name':'F&I Manager(s)',"Cat_length":this.selectedFiManagersvalues.length},
        {'Cat_Name':'Sales Manager(s)',"Cat_length":this.selectedSalesManagersvalues.length},
        {'Cat_Name':'Salesperson(s)',"Cat_length":this.selectedSalespersonvalues.length},
        {'Cat_Name':'Retail/Lease',"Cat_length":this.retailorlease.length},
        {'Cat_Name':'Deal Status',"Cat_length":this.dealstatus.length},
        {'Cat_Name':'Target',"Cat_length":this.selecttarget.length},      
        ]
      this.section = [];
      this.section.push(e)
      let id=this.selectedstorevalues.length == 0 ? '0' : this.selectedstorevalues.toString();
      if(e == 'F&I Manager(s)'){  
        console.log(this.selectedstorevalues)
        this.getEmployees('F', id)
      }
      if(e == 'Sales Manager(s)'){      
        this.getEmployees('M', id)
      }
      if(e == 'Salesperson(s)'){      
        this.getEmployees('SP', id)
      }
    }
    if (block == 'NU') {

      const index = this.neworused.findIndex(i => i == e)
      if (index >= 0) {
        this.neworused.splice(index, 1)
      }
      else {
        this.neworused.push(e)
      }
    }
    if (block == 'RL') {
      const index = this.retailorlease.findIndex(i => i == e)
      if (index >= 0) {
        this.retailorlease.splice(index, 1)
      }
      else {
        this.retailorlease.push(e)
      }
    }
    if (block == 'PH') {
      this.includeorexclude = [];
      this.includeorexclude.push(e)
    }
    if (block == 'DS') {
      const index = this.dealstatus.findIndex(i => i == e)
      if (index >= 0) {
        this.dealstatus.splice(index, 1)
      }
      else {
        this.dealstatus.push(e)
      }
    }
    if (block == 'ST') {
      const index = this.selecttarget.findIndex(i => i == e)
      if (index >= 0) {
        this.selecttarget.splice(index, 1)
      }
      else {
        this.selecttarget.push(e)
      }
    }
    if (block == 'TB') {
      this.toporbottom = [];
      this.toporbottom.push(e)
    }
    if (block == 'IC') {
      this.includecharges = [];
      this.includecharges.push(e)
    }
    if (block == 'SRC') {
      this.Transactorgl = [];
      this.Transactorgl.push(e)

    }
    if (block == 'Stores') {
      const index = this.selectedstorevalues.findIndex(i => i == e)
      if (index >= 0) {
        this.selectedstorevalues.splice(index, 1)
      }
      else {
        this.selectedstorevalues.push(e)
      }
      console.log(this.selectedstorevalues)
    }
    if (block == 'Group') {
       const index = this.selectedDataGrouping.findIndex(i => i == e)
      if (index >= 0) {
        this.selectedDataGrouping.splice(index, 1)
      }
      else {
        if (this.selectedDataGrouping.length >= 3) {
          alert('Select up to 3 Filters only To Group Your Data')
        }
        else{
        this.selectedDataGrouping.push(e)
        }
      }
    }
    if (block == 'FandI') {
      const index = this.selectedFiManagersvalues.findIndex(i => i == e)
      if (index >= 0) {
        this.selectedFiManagersvalues.splice(index, 1)
      }
      else {
        this.selectedFiManagersvalues.push(e)
      }
    }
    if (block == 'SM') {
      const index = this.selectedSalesManagersvalues.findIndex(i => i == e)
      if (index >= 0) {
        this.selectedSalesManagersvalues.splice(index, 1)
      }
      else {
        this.selectedSalesManagersvalues.push(e)
      }
    }
    if (block == 'SP') {
      const index = this.selectedSalespersonvalues.findIndex(i => i == e)
      if (index >= 0) {
        this.selectedSalespersonvalues.splice(index, 1)
      }
      else {
        this.selectedSalespersonvalues.push(e)
      }
    }
  }

  viewreport() {
    console.log(this.selectedDataGrouping)
    if (this.selectedDataGrouping.length == 0) {
      alert('Please select atleast one ')
    }
    else {
    
  
      const data = {
        Reference: 'SG',
        FromDate: this.fromDate.year + '-' + ('0' + this.fromDate.month).slice(-2) + '-' + ('0' + this.fromDate.day).slice(-2),
        ToDate: this.toDate.year + '-' + ('0' + this.toDate.month).slice(-2) + '-' + ('0' + this.toDate.day).slice(-2),
        TotalReport: this.toporbottom[0],
        storeValues: this.selectedstorevalues.length == 0 ? '0' : this.selectedstorevalues.toString(),
        Spvalues: this.selectedSalespersonvalues.length == 0 ? '0' :  this.selectedSalespersonvalues.toString(),
        SMvalues: this.selectedSalesManagersvalues.length == 0 ? '0' :this.selectedSalesManagersvalues.toString(),
        FIvalues:this.selectedFiManagersvalues.length == 0 ? '0' :  this.selectedFiManagersvalues.toString(),
        dealType: this.neworused.toString(),
        saleType: this.retailorlease.toString(),
        dealStatus: this.dealstatus.toString(),
        dataGroupingvalues: this.selectedDataGrouping,

      }
      console.log(data)
      this.Performance='UnLoad'
      this.service.SetReports({
        obj: data
      })
      this.close()
    }
  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }


  close() {
    this.ngbmodel.dismissAll()
  }

}
