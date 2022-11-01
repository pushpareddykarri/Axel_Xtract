import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbCalendar, NgbDateParserFormatter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormArray, FormGroup, } from '@angular/forms';
import { ApiService } from '../../Core/api.service/api.service'
import { CalendarCellViewModel } from 'ngx-bootstrap/datepicker/models';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SalesReportsComponent } from '../../SalesGross/sales-reports/sales-reports.component'

@Component({
  selector: 'app-service-reports',
  templateUrl: './service-reports.component.html',
  styleUrls: ['./service-reports.component.scss']
})
export class ServiceReportsComponent implements OnInit {
  @ViewChild('multiSelect') multiSelect;
  public data = [];
  public sasettings: IDropdownSettings;
  public strsettings: IDropdownSettings;
  public techsettings: IDropdownSettings;
  // public fisettings: IDropdownSettings;
  public selectedItems = [];



  @Input() Parentcomponent: any;
  FromDate: any;
  ToDate: any;
  TotalReport: any = 'T';
  dataGrouping: any = [];
  DropdownFiltersForm: FormGroup;
  DropDowns: FormGroup;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  stores: any = [];
  salesPersons: any = [];
  salesManagers: any = [];
  financeManager: any = [];

  selectedStores: any = [];
  GroupingDetails: any;
  datagrp:any=[]
  public formatOptions = {
    month: 'long'
  };

  public date = new Date();
  public locales = ['en', 'de', 'fr', 'ar', 'zh'];
  public locale = 'en';

  @ViewChild('warningbtn') warningbtn: ElementRef;
  alertmessage: string;
  selectedDataGrouping: any=[];
  StoresIds: any=[];

  Performance: any = 'Load'
  Groupingcols = [
    { id: 40, "columnname": 'Store_Name' },
    { id: 26, "columnname": 'ServiceAdvisor_Name' },
    { id: 27, "columnname": 'ServiceAdvisor' },
    { id: 28, "columnname": '' },
    { id: 29, "columnname": '' },
    { id: 30, "columnname": '' },
    { id: 31, "columnname": 'vehicle_Year' },
    { id: 32, "columnname": 'vehicle_Make' },
    { id: 33, "columnname": 'Vehicle_Model' },
    { id: 34, "columnname": 'Vehicle_Odometer' },
    { id: 35, "columnname": 'CName' },
    { id: 36, "columnname": 'CZip' },
    { id: 37, "columnname": 'CState' },
    { id: 38, "columnname": 'RO_CloseDate' },
    { id: 39, "columnname": '' },
   
  ];

  // selectedDevice:any;
  constructor(private ngbmodel: NgbModal, private renderer: Renderer2, private service: ApiService,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private formBuilder: FormBuilder
  ) {


    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement
      if (TagName.className === 'd-block modal fade show modal-static') {
        // this.closeBtn.nativeElement.click();
        this.close()
      }
    });
    // let today=  new Date();
 
    // // this.FromDate=today.getFullYear()+("0" + (today.getMonth() + 1)).slice(-2)+'01'

    // // this.ToDate=today.getFullYear()+("0" + (today.getMonth() + 1)).slice(-2)+("0" + today.getDate()).slice(-2)
    // this.fromDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, 1);
    // this.toDate = new NgbDate(today.getFullYear() ,  today.getMonth() + 1, today.getDate()-1);


    // this.DropdownFiltersForm = this.formBuilder.group({
    //   storesData: new FormArray([]),
    //   fiManagers: new FormArray([]),
    //   smanagers: new FormArray([]),
    //   spmanagers: new FormArray([])

    // });
    this.DropDowns = this.formBuilder.group({
      storesData: [''],
      srvcAdvisors: [''],
      Technicians: [''],
    
    });
  }

  month: any

  ngOnInit() {
    // var nowdate = new Date();
    // var monthStartDay = new Date(2022,4, 1);
    // var monthEndDay = new Date(2022,4 + 1, 0);

    // // console.log(this.Parentcomponent,monthStartDay,monthEndDay)
    this.sasettings = {
      singleSelection: false,
      idField: 'SPID',
      textField: 'SPName',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 2,
      searchPlaceholderText: 'Search ServiceAdvisors',
      noDataAvailablePlaceholderText: 'Select Store First',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };

    this.strsettings = {
      singleSelection: false,
      idField: 'AS_ID',
      textField: 'DEALER_NAME',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 2,
      searchPlaceholderText: 'Search Store',
      noDataAvailablePlaceholderText: 'Select Store First',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
    this.techsettings = {
      singleSelection: false,
      idField: 'SmId',
      textField: 'SmName',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 2,
      searchPlaceholderText: 'Search Technicians',
      noDataAvailablePlaceholderText: 'Select Store First',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
    // this.fisettings = {
    //   singleSelection: false,
    //   idField: 'FiId',
    //   textField: 'FiName',
    //   enableCheckAll: true,
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'Unselect All',
    //   allowSearchFilter: true,
    //   limitSelection: -1,
    //   clearSearchFilter: true,
    //   maxHeight: 197,
    //   itemsShowLimit: 2,
    //   searchPlaceholderText: 'Search F&I Manager',
    //   noDataAvailablePlaceholderText: 'Select Store First',
    //   closeDropDownOnSelection: false,
    //   showSelectedItemsAtTop: false,
    //   defaultOpen: false,
    // };


    this.selectedStores.push("0")
    this.month = new Date(2022, 2, 1)
    this.getDataGroupings();
    this.getStores();
    // this.getEmployees('SP');
    // this.getEmployees('F');
    // this.getEmployees('M');
    this.service.GetHeaderData().subscribe(res => {
      if(res.obj.title == 'Service Gross' && this.Performance == 'Load' ){
        let selectedfromDate=new Date(res.obj.fromdate)
        this.fromDate=new NgbDate(selectedfromDate.getFullYear(), selectedfromDate.getMonth() + 1, selectedfromDate.getDate());
        let selectedtoDate=new Date(res.obj.todate)
        this.toDate = new NgbDate(selectedtoDate.getFullYear(), selectedtoDate.getMonth() + 1, selectedtoDate.getDate());
        // if(res.obj.toporbottom != ''){
        //   this.toporbottom=res.obj.toporbottom
        // }
      if(res.obj.ROType !=''){
        this.openorclosed=res.obj.ROType.split(',')
      }
      if(res.obj.Department !=''){
        this.department=res.obj.Department.split(',')  
      }
      else{
        this.department=[]

      }
      if(res.obj.Paytype !=''){
        this.paytype= res.obj.Paytype.split(',')
      }
      else{
        this.paytype=[]
      }
      if(res.obj.Target !=''){
        this.selecttarget= res.obj.Target.split(',')
      }
   else{
     this.selecttarget=[]
         }
      this.toporbottom=res.obj.ToporBottom.split(',')
     }
    })
  }

  Clear() {
    this.selectedDataGrouping.forEach(e => {
      e.state = false;
    });
    this.selectedDataGrouping = []

  }

  save() {
    // console.log(this.DropdownFiltersForm.value)
  }
  onOpenCalendar(container) {
    container.setViewMode('month');
    container.monthSelectHandler = (event: CalendarCellViewModel): void => {
      container.value = event.date;
      return;
    };
  }

  changeDate(e) {
    // console.log(e)
    let year = e.getFullYear()
    let lastDay = new Date(e.getFullYear(), e.getMonth() + 1, 0);
    let month = parseInt(("0" + (lastDay.getMonth() + 1)).slice(-2))
    let day = parseInt(("0" + lastDay.getDate()).slice(-2))
    this.fromDate = new NgbDate(year, month, 1);
    this.toDate = new NgbDate(year, month, day);
  }
  close() {
    this.ngbmodel.dismissAll()
  }
  getrange(e, range) {
    if (range == 'F') {
      this.FromDate = e.target.value
      // console.log(this.FromDate)
      let date = new Date(this.FromDate)
      let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      let mnth = ("0" + (lastDay.getMonth() + 1)).slice(-2)
      let day = ("0" + lastDay.getDate()).slice(-2)
      let lastDate = [lastDay.getFullYear(), mnth, day].join("-");
      this.ToDate = lastDate
    }
    if (range == 'T') {
      this.ToDate = e.target.value
    }

  }
  onDateSelection(date: NgbDate) {

    // console.log(date)
    if (!this.fromDate && !this.toDate) {
      // console.log('1')
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      // console.log('2')
      // 
      this.toDate = date;


    } else {
      // console.log('3')
      this.toDate = null;
      this.fromDate = date;
    }
  }

  viewreport() {
    if (this.selectedDataGrouping.length == 0) {
      alert('Please select atleast one ')
    }
    else{
    let selectedstorevalues = 0;
      if (this.DropDowns.value.storesData.length > 0) {
        let selectedstores = this.DropDowns.value.storesData.map(({ AS_ID }) => AS_ID)
        // if (selectedstores.length == this.stores.length) {
        //   selectedstorevalues = 0
        // }
        // else {
          selectedstorevalues = this.DropDowns.value.storesData.map(({ AS_ID }) => AS_ID).toString()
        // }
      }
    const data = {
      Reference: this.Parentcomponent,
      FromDate:  ('0'+ this.fromDate.month).slice(-2) + '-' + ('0'+this.fromDate.day).slice(-2) + '-' + this.fromDate.year ,
      ToDate:  ('0'+ this.toDate.month).slice(-2) + '-' + ('0'+this.toDate.day).slice(-2)+ '-' + this.fromDate.year,
      TotalReport: this.toporbottom[0],
      storeValues: selectedstorevalues,
      // ADvalues: this.selectedSalespersonvalues.length == 0 ? '0' :  this.selectedSalespersonvalues.toString(),
      // Techvalues: this.selectedSalesManagersvalues.length == 0 ? '0' :this.selectedSalesManagersvalues.toString(),
      ROType: this.openorclosed.toString(),
      Departments: this.department.toString(),
      PayType: this.paytype.toString(),
      Target: this.selecttarget.toString(),
      dataGroupingvalues:this.selectedDataGrouping,
    }
    // console.log(data)
    this.Performance='Unload'
    this.service.SetReports({
      obj: data
    })
    this.close()
  }
  }
  // onDateSelection(date: NgbDate) {
  //   if (!this.fromDate && !this.toDate) {
  //     this.fromDate = date;
  //   } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
  //     this.toDate = date;
  //   } else {
  //     this.toDate = null;
  //     this.fromDate = date;
  //   }
  //   // console.log(this.fromDate.day)
  //   // console.log(this.toDate)

  // }

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

  getDataGroupings() {
    const obj = {
      "pageid": 2
    };

    this.service.postmethod('xtract/GetDataGroupingsbyPage', obj).subscribe(
      res => {
        if (res.status == 200) {
          this.dataGrouping = res.response.map(v=>({...v,state:false}))
        
              this.selectedDataGrouping.push(this.dataGrouping[0])
              this.dataGrouping.forEach(ele => {
                this.Groupingcols.forEach(val => {
                  if (ele.ARG_ID == val.id) {
                    ele.columnName = val.columnname
                  }
                  if (ele.ARG_ID == "28" ||  ele.ARG_ID == "29" || ele.ARG_ID == "30" || ele.ARG_ID == "31" ||  ele.ARG_ID == "32" || ele.ARG_ID == "33"  ||  ele.ARG_ID == "38" || ele.ARG_ID == "39") {
                    ele.Active = 'N'
                  }
                  else {
                    ele.Active = 'Y'
                  }
                })
              this.service.GetHeaderData().subscribe(res => {
                if(res.obj.title == 'Service Gross' && this.Performance == 'Load' ){
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
                // // console.log(this.datagrp)
              }
              });
            })
            this.selectedDataGrouping = this.datagrp
          // console.log(this.dataGrouping)
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        // console.log(error);
      })
  }

  changeReportsView(e) {
    if (e.target.checked == false) {
      this.TotalReport = 'T';
    } else {
      this.TotalReport = 'B';
    }
    // console.log(this.TotalReport);

  }

  getStores() {
    const obj = {
      "AU_ID": 1
    };
    this.service.postmethod('xtract/GetStores', obj).subscribe(
      res => {
        if (res.status == 200) {
          this.stores = res.response
          this.service.GetHeaderData().subscribe(res => {
          if(res.obj.title == 'Service Gross' && this.Performance == 'Load' ){
            this.StoresIds=[]
            if (res.obj.stores != '') {
              let strids = res.obj.stores.split(',')
              // console.log(strids)
              this.stores.forEach(val => {
                strids.forEach(ele => {
                  if (val.AS_ID == ele) {
                    this.StoresIds.push(val)
                  }
                })
              })
           
            }
          }
        })
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        // console.log(error);
      })
  }
  getEmployees(val) {
    const obj = {
      "AS_ID": 0,
      "type": val
    };
    this.service.postmethod('xtract/GetEmployees', obj).subscribe(
      res => {
        if (res.status == 200) {
          //  this.dataGrouping=res.response
          if (val == 'SP') {
            // this.stores= res.response

            this.salesPersons = res.response
          }
          if (val == 'F') {
            this.financeManager = res.response
          }
          if (val == 'M') {
            this.salesManagers = res.response
          }
          // console.log(res)
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        // console.log(error);
      })
  }
  selected: any = []
  pushvalue(val) {
    // console.log(val)
    if (val.state == false) {
      if (this.selectedDataGrouping.length >= 2) {
        alert('Select up to 2 Filters only To Group Your Data')

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

  }
  // pushvalue(val) {
  //   if (val.state == false) {
  //     val.state = true
  //     this.selected.push(val)
  //   }
  //   else {
  //     val.state = false;
  //     this.selected.splice(this.selected.indexOf(val), 1)
  //   }
  //   // console.log(this.selected)
  // }
  openorclosed: any = ['Open','Closed']
  department: any = ['Service','Parts','Body'];
  // includeorexclude: any = ['I'];
  paytype: any = ['Warranty','Internal'];
  selecttarget: any = ['F'];
  toporbottom:any=['T'];
  // includecharges:any=['N'];
  Transactorgl:any=['T'];
  multipleorsingle(block, e) {
    // if (block == 'Grp') {
     
    //     const index = this.selected.findIndex(i => i == e)
    //     if (index >= 0) {
    //       this.selected.splice(index, 1)
    //     }
    //     else {
    //       if(this.selected.length<3){    
    //       this.selected.push(e)
    //       }
    //       else{
    //         this.alertmessage='Select up to 3 Filters only To Group Your Data';
    //        document.getElementById("warningbtn").click();   
    //       //  (<HTMLElement>document.getElementsByClassName('alertbtn')[0]).click()       
    //       }           
       
    //     // console.log(this.selected);
    //   }
  
    // }
    if (block == 'RO') {     
      const index = this.openorclosed.findIndex(i => i == e)
      if (index >= 0) {
        this.openorclosed.splice(index, 1)
      }
      else {
        this.openorclosed.push(e)
      }
      // console.log(this.openorclosed);
    }
    if (block == 'Dept') {
      const index = this.department.findIndex(i => i == e)
      if (index >= 0) {
        this.department.splice(index, 1)
      }
      else {
        this.department.push(e)
      }
      // console.log(this.department);
    }
      if (block == 'PT') {
      const index = this.paytype.findIndex(i => i == e)
      if (index >= 0) {
        this.paytype.splice(index, 1)
      }
      else {
        this.paytype.push(e)
      }
      // console.log(this.paytype);
    }
    if (block == 'ST') {
      const index = this.selecttarget.findIndex(i => i == e)
      if (index >= 0) {
        this.selecttarget.splice(index, 1)
      }
      else {
        this.selecttarget.push(e)
      }
      // console.log(this.selecttarget);
    }
    if (block == 'TB') {
      this.toporbottom = [];
      this.toporbottom.push(e)
      // console.log(this.toporbottom)
    }
    // if (block == 'IC') {
    //   this.includecharges = [];
    //   this.includecharges.push(e)
    //   // console.log(this.includecharges)
    // }
    if (block == 'SRC') {
      this.Transactorgl = [];
      this.Transactorgl.push(e)
      // console.log(this.Transactorgl)
   
    }
  }
  previousstrs: any = []
  lateststrs: any = []
  public onDropDownClose(item: any) {
    this.lateststrs = this.DropDowns.value.storesData;
    if (this.lateststrs.length > 0) {
      var diffresult = this.lateststrs.filter(
        (o) => !this.previousstrs.some(({ AS_ID }) => o.AS_ID == AS_ID)
      );
      if (diffresult.length > 0 || this.lateststrs.length != this.previousstrs.length) {
        let result = this.lateststrs.map(({ AS_ID }) => AS_ID)
        if (result.length == this.stores.length) {
          // console.log('Param Value....', '0')
        }
        else {
          // console.log('Param Value....', result.toString())
        }
        // console.log('API CALL.......')
        this.getEmployees('M');
        this.previousstrs = this.lateststrs
        diffresult = []
      }
    }
    else{
      if( this.lateststrs.length != this.previousstrs.length)
      // console.log('Param Value....', '0')
      this.previousstrs=[]

    }
  }
  // public onFilterChange(item: any) {
  //   // console.log(item);
  // }
  // public onDropDownClose(item: any) {
  //   // console.log(item);
  //   // console.log(this.DropDowns.value);

  // }

  // public onItemSelect(item: any) {
  //   // console.log(item);
  // }
  // public onDeSelect(item: any) {
  //   // console.log(item);

  // }

  // public onSelectAll(items: any) {
  //   // console.log(items);
  // }
  // public onDeSelectAll(items: any) {
  //   // console.log(items);
  // }
}
