import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbCalendar, NgbDateParserFormatter, NgbDate, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormArray, FormGroup, } from '@angular/forms';
import { ApiService } from '../../Core/api.service/api.service'
import { CalendarCellViewModel } from 'ngx-bootstrap/datepicker/models';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-sales-reports',
  templateUrl: './sales-reports.component.html',
  styleUrls: ['./sales-reports.component.scss']
})
export class SalesReportsComponent implements OnInit {

  @ViewChild('multiSelect') multiSelect;
  public data = [];
  public spsettings: IDropdownSettings;
  public strsettings: IDropdownSettings;
  public ssettings: IDropdownSettings;
  public fisettings: IDropdownSettings;
  public selectedItems = [];

  StoresIds: any = []

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
  public formatOptions = {
    month: 'long'
  };

  public date = new Date();
  public locales = ['en', 'de', 'fr', 'ar', 'zh'];
  public locale = 'en';

  maxDate: any;
  @ViewChild('warningbtn') warningbtn: ElementRef;
  alertmessage: string;
  GroupingDetails: any;
  SMIds: any=[];
  FIIds: any=[];
  SPIds: any=[];

  Performance: any = 'Load'

  constructor(private ngbmodel: NgbModal, private renderer: Renderer2, private service: ApiService,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private formBuilder: FormBuilder, private config: NgbDatepickerConfig
  ) {


    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement
      if (TagName.className === 'd-block modal fade show modal-static') {

        this.close()
      }
    });
    // let today = new Date();
    // var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    // //  alert(lastDayOfMonth)
    // // this.FromDate=today.getFullYear()+("0" + (today.getMonth() + 1)).slice(-2)+'01'

    // // this.ToDate=today.getFullYear()+("0" + (today.getMonth() + 1)).slice(-2)+("0" + today.getDate()).slice(-2)
    // this.fromDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, 1);
    // this.toDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate() - 1);
    // this.maxDate = {
    //   year: today.getFullYear(),
    //   month: today.getMonth() + 1,
    //   day: today.getDate() - 1
    // };
    //  config.maxDate = { year: 2022, month: 8, day: 31 };
    //  config.outsideDays = 'hidden';
    this.DropDowns = this.formBuilder.group({
      storesData: [''],
      fiManagers: [''],
      sManagers: [''],
      spManagers: [''],


    });
  }

  month: any
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

  //   selectedStoreData=[
  //     {
  //       "AS_ID": 7,
  //       "DEALER_NAME": "Andersons Toyota",
  //       "CORA_ACCT_CODE": "GTOY-A"
  //   },
  //   {
  //     "AS_ID": 15,
  //     "DEALER_NAME": "Audi of Santa Rosa",
  //     "CORA_ACCT_CODE": "APA-A"
  // }
  //   ]
  ngOnInit() {
    // console.log(this.Parentcomponent);
   
    this.spsettings = {
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
      searchPlaceholderText: 'Search Salesperson',
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
    this.ssettings = {
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
      searchPlaceholderText: 'Search Sales Manager',
      noDataAvailablePlaceholderText: 'Select Store First',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
    this.fisettings = {
      singleSelection: false,
      idField: 'FiId',
      textField: 'FiName',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 2,
      searchPlaceholderText: 'Search F&I Manager',
      noDataAvailablePlaceholderText: 'Select Store First',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };


    this.selectedStores.push("0")
    this.month = new Date()
    this.getDataGroupings();
    this.getStores();

    this.service.GetHeaderData().subscribe(res => {

      if(this.Performance ==  'Load'){
      let selectedfromDate=new Date(res.obj.fromdate)
      this.fromDate=new NgbDate(selectedfromDate.getFullYear(), selectedfromDate.getMonth() + 1, selectedfromDate.getDate());
      let selectedtoDate=new Date(res.obj.todate)
      this.toDate = new NgbDate(selectedtoDate.getFullYear(), selectedtoDate.getMonth() + 1, selectedtoDate.getDate());
      if(res.obj.title == 'Sales Gross'){
        if(res.obj.dealType != ''){
      this.neworused=res.obj.dealType.split(',')
        }
        if(res.obj.saleType != ''){
      this.retailorlease=res.obj.saleType.split(',')  
        }
        if(res.obj.dealStatus){
      this.dealstatus= res.obj.dealStatus.split(',')
        }
        if(res.obj.toporbottom != ''){
          this.toporbottom=res.obj.toporbottom
        }
      }
    }
    })

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
    let year = e.getFullYear()
    let lastDay = new Date(e.getFullYear(), e.getMonth() + 1, 0);
    let month = parseInt(("0" + (lastDay.getMonth() + 1)).slice(-2))
    let day = parseInt(("0" + lastDay.getDate()).slice(-2))
    this.fromDate = new NgbDate(year, month, 1);
    this.toDate = new NgbDate(year, month, day);
  }
  close() {
    this.ngbmodel.dismissAll()
    this.Performance='Unload'
  }
  getrange(e, range) {
    if (range == 'F') {
      this.FromDate = e.target.value
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
  viewreport() {
    // console.log(this.selectedDataGrouping)
    if (this.selectedDataGrouping.length == 0) {
      alert('Please select atleast one ')
    }
    else {
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
      let selectedSalespersonvalues = 0;
      if (this.DropDowns.value.spManagers.length > 0) {
        let selectedsp = this.DropDowns.value.spManagers.map(({ SPID }) => SPID)
        // if (selectedsp.length == this.salesPersons.length) {
        //   selectedSalespersonvalues = 0
        // }
        // else {
          selectedSalespersonvalues = this.DropDowns.value.spManagers.map(({ SPID }) => SPID).toString()
        // }
      }
      let selectedSalesManagersvalues = 0;
      if (this.DropDowns.value.sManagers.length > 0) {
        let selectedsM = this.DropDowns.value.sManagers.map(({ SmId }) => SmId)
        // if (selectedsM.length == this.salesManagers.length) {
        //   selectedSalesManagersvalues = 0
        // }
        // else {
          selectedSalesManagersvalues = this.DropDowns.value.sManagers.map(({ SmId }) => SmId).toString()
        // }
      }
      let selectedFiManagersvalues = 0;
      if (this.DropDowns.value.fiManagers.length > 0) {
        let selectedfM = this.DropDowns.value.fiManagers.map(({ FiId }) => FiId)
        // if (selectedfM.length == this.financeManager.length) {
        //   selectedFiManagersvalues = 0
        // }
        // else {
          selectedFiManagersvalues = this.DropDowns.value.fiManagers.map(({ FiId }) => FiId).toString()
        // }
      }
      const data = {
        Reference: this.Parentcomponent,
        FromDate: this.fromDate.year + '-' + ('0' + this.fromDate.month).slice(-2) + '-' + ('0' + this.fromDate.day).slice(-2),
        ToDate: this.toDate.year + '-' + ('0' + this.toDate.month).slice(-2) + '-' + ('0' + this.toDate.day).slice(-2),
        TotalReport: this.toporbottom[0],
        storeValues: selectedstorevalues,
        Spvalues: selectedSalespersonvalues,
        SMvalues: selectedSalesManagersvalues,
        FIvalues: selectedFiManagersvalues,
        dealType: this.neworused.toString(),
        saleType: this.retailorlease.toString(),
        dealStatus: this.dealstatus.toString(),
        dataGroupingvalues: this.selectedDataGrouping,

      }
      console.log(data)
      this.service.SetReports({
        obj: data
      })
      this.close()
    }
  }
  // same date not selectable
  // onDateSelection(date: NgbDate) {
  //   if (!this.fromDate && !this.toDate) {
  //     this.fromDate = date;
  //     this.toDate =date

  //   } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
  //     this.toDate = date;


  //   } else {
  //     this.toDate = null;
  //     this.fromDate = date;

  //   }
  // }
  onDateSelection(date: NgbDate) {

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
  datagrp: any = []
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
              if(res.obj.title == 'Sales Gross' && this.Performance == 'Load'){
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

          });

          this.selectedDataGrouping = this.datagrp
          // // console.log(this.selectedDataGrouping)
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        // console.log(error);
      })
  }


  getStores() {
    this.StoresIds = []
    const obj = {
      "AU_ID": 1
    };
    this.service.postmethod('xtract/GetStores', obj).subscribe(
      res => {
        if (res.status == 200) {
          this.stores = res.response
          // console.log(this.stores);
          this.service.GetHeaderData().subscribe(res => {
            if(res.obj.title == 'Sales Gross' && this.Performance == 'Load'){
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
              // console.log(this.StoresIds);
              this.getEmployees('SP', strids.toString());
              this.getEmployees('F', strids.toString());
              this.getEmployees('M', strids.toString());
            }
          }
          });
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        // console.log(error);
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
              if(data.obj.title == 'Sales Gross' && this.Performance == 'Load'){
              this.SPIds=[]
              if (data.obj.salespresons != '') {
                let spids = data.obj.salespresons.split(',')
                console.log(spids)
                this.salesPersons.forEach(val => {
                  spids.forEach(ele => {
                    if (val.SPID == ele) {
                      this.SPIds.push(val)
                    }
                  })
                })
                console.log(this.SPIds);
              }
              }
            });
          }
          if (val == 'F') {
            this.financeManager = res.response;
            this.service.GetHeaderData().subscribe(data => {
              if(data.obj.title == 'Sales Gross' && this.Performance == 'Load'){
              this.FIIds=[]
              if (data.obj.financemanagers != '') {
                let fiids = data.obj.financemanagers.split(',')
                console.log(fiids)
                this.financeManager.forEach(val => {
                 fiids.forEach(ele => {
                    if (val.FiId == ele) {
                      this.FIIds.push(val)
                    }
                  })
                })
                console.log(this.FIIds);
              }
              }
            });
          }
          if (val == 'M') {
            this.salesManagers = res.response
            this.service.GetHeaderData().subscribe(data => {
              if(data.obj.title == 'Sales Gross' && this.Performance == 'Load'){
              this.SMIds=[]
              if (data.obj.salesmanagers != '') {
                let smids = data.obj.salesmanagers.split(',')
                console.log(smids)
                this.salesManagers.forEach(val => {
                  smids.forEach(ele => {
                    if (val.SmId == ele) {
                      this.SMIds.push(val)
                    }
                  })
                })
                console.log(this.SMIds);
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
        // console.log(error);
      })
  }
  selectedDataGrouping: any = []
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
    // console.log(this.selectedDataGrouping)
  }
  neworused: any = ['New', 'Used']
  retailorlease: any = ['Retail', 'Lease', 'Misc'];
  includeorexclude: any = [''];
  dealstatus: any = ['Delivered', 'Capped', 'Finalized'];
  selecttarget: any = ['F'];
  toporbottom: any = ['T'];
  includecharges: any = [''];
  Transactorgl: any = ['T'];
  multipleorsingle(block, e) {
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
  }

  Clear() {
    this.selectedDataGrouping.forEach(e => {
      e.state = false;
    });
    this.selectedDataGrouping = []

  }
  previousstrs: any = []
  lateststrs: any = []
  public onDropDownClose(item: any) {
    // console.log(item);

    this.lateststrs = this.DropDowns.value.storesData;
    if (this.lateststrs.length > 0) {
      var diffresult = this.lateststrs.filter(
        (o) => !this.previousstrs.some(({ AS_ID }) => o.AS_ID == AS_ID)
      );
      if (diffresult.length > 0 || this.lateststrs.length != this.previousstrs.length) {
        let result = this.lateststrs.map(({ AS_ID }) => AS_ID)
        if (result.length == this.stores.length) {
          this.ClearDropDownVAlues()
          this.Performance='Unload'
          this.getEmployees('SP', 0);
          this.getEmployees('F', 0);
          this.getEmployees('M', 0);
          this.previousstrs = this.lateststrs
          diffresult = []
        }
        else {
          this.ClearDropDownVAlues()
          this.Performance='Unload'
          this.getEmployees('SP', result.toString());
          this.getEmployees('F', result.toString());
          this.getEmployees('M', result.toString());
          this.previousstrs = this.lateststrs
          diffresult = []
        }

      }
    }
    else {
      if (this.lateststrs.length != this.previousstrs.length)
        this.previousstrs = []
     this.ClearDropDownVAlues()
    }
  }


  ClearDropDownVAlues(){
    this.DropDowns.controls.spManagers.setValue('')
    this.DropDowns.controls.sManagers.setValue('')
    this.DropDowns.controls.fiManagers.setValue('')
    this.salesPersons = [];
    this.salesManagers = [];
    this.financeManager = [];
    // this.StoresIds=[];
    this.SPIds=[];
    this.SMIds=[];
    this.FIIds=[];
  }
  
}
