import { ElementRef, Injectable ,ViewChild} from '@angular/core';
// import { jsPDF } from 'jspdf';
// import html2canvas from "html2canvas";
import { ApiService } from '../api.service/api.service';
 
@Injectable({
  providedIn: 'root'
})
export class PdfService {
  @ViewChild('content', { 'static': false }) content:ElementRef;
  title : any;
  constructor(private apiSrvc: ApiService) { 
    this.apiSrvc.getTitle().subscribe(appTitle => this.title = appTitle);
    console.log(this.title);
  }
  
  
  GetPrintData(){  
    let printContents, popupWin;
    printContents = document.getElementById(this.title).innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
             <style>
   
             .acct-tbl{
              margin: 10px;
            } 
            .acct-tbl th{
              padding:10px 20px;
              border-right: 1px solid #e0e1e2;
              font-family: 'Roboto';
            }
              .acct-tbl td{
                padding:5px 20px;
                border-right: 1px solid #e0e1e2;
                font-family: 'Roboto';
              }
              .acct-tbl thead {
                border-top: none !important;
                border-bottom: none !important;
                // box-shadow: inset 0 -5px 0 #2d91f1;
                background: #ffffff;
                position: sticky;
                top:0;
               }  
               .acct-tbl table{
                border:1px solid black;
                width:100% ;
              }
              .acct-tbl tr td:nth-last-child(-n+1){border-right: none !important;}
              .acct-tbl tr th:nth-last-child(-n+1){border-right: none !important;}

 

            .d-flex {
              display: flex!important;
             }
             .gross-tbl tbody{
              z-index: 4;
              width: auto;
              text-align: end;
              background: #363b4f;
              color: #fff;
              padding-right: 2rem;
              cursor: pointer;
              text-align: left;
              white-space: nowrap;
            }
             .gross-tbl thead {
              border-top: none !important;
              border-bottom: none !important;
              box-shadow: inset 0 -5px 0 #2d91f1;
              background: #ffffff;
              // position: fixed;
              z-index: 2;
              // top:0;
              width: 11%;
              tr th{
              z-index: 3;
              left: 0;
              top: 0;}
              tr:nth-child(1) th:not(:first-child){
              padding-bottom: 0px !important;
              color: black;
              font-size: .9rem;
              }
              tr:nth-child(2) th:not(:first-child){
              padding-bottom: 10px;
              color: #a2a3a7;
              font-size: .7rem;
              text-align: center;
              }
          }
            .gross-tbl tr th:first-child {
            // position: sticky;
            z-index: 4;
            // left: 0;
            display: block;
            background-color: #2d91f1;
            color: white;
            font-size: .82rem;
          }
          .sec-tbl table{
            border-top: 2px solid #e0e1e2;
            border-bottom: 2px solid #e0e1e2;
          }
          .sec-tbl thead {
            border-top: none !important;
            border-bottom: none !important;
            box-shadow: inset 0 -5px 0 #2d91f1;
            background: #ffffff;
            //position: fixed;
            z-index: 2;
            font-family: 'RobotoBold';
            tr:nth-child(1) th:not(:first-child){
            padding-bottom: 0px !important;
            font-size: .9rem;
            }
            tr:nth-child(2) th:not(:first-child){
            // padding-bottom: 10px;
            color: #a2a3a7;
            font-size: .8rem;
            white-space: nowrap;
            }
        }
         .sec-tbl table tbody tr:nth-child(even) {
          background-color: #f1f1f1 !important;
         }
         .gross-tbl table{
            table, td, th {
              border-collapse: collapse;
            }
            th {
              padding: 3.2px 5px !important;
            }
            td {
              padding: 2px 5px !important;
            }
          }
          .sec-tbl table thead tr:nth-child(2) th:not(:first-child) {
            padding-bottom: 10px;
            color: #a2a3a7;
            font-size: .7rem;
            white-space: nowrap;
        }
        .gross-tbl table th{
          padding: 3.2px 5px;
        }
        .sec-tbl th:nth-child(5n + 6) {
            border-right: 2px solid #e0e1e2;
            position: relative;
            padding-right: 1rem;}
            .sec-tbl th:nth-child(7) {
            text-align: right;
            }
            .sec-tbl th:nth-child(8) {
              text-align: right;
            }
            .sec-tbl td:nth-child(5n + 6) {
              border-right: 2px solid #e0e1e2;
              position: relative;
              padding-right: 1rem;
              }
              .sec-tbl td:nth-child(7) {
              text-align: right;
              }
              .sec-tbl td:nth-child(8) {
                text-align: right;
              }
        }

             </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
      
    );
    popupWin.document.close();
} 

// generarPDF(){
//         const div = document.getElementById(this.title);
//         const options = {
//           background: 'white',
//           scale: 3
//         };
//         html2canvas(div, options).then((canvas) => {
//           var img = canvas.toDataURL("image/PNG");
//           var doc = new jsPDF('l', 'mm', 'a4');
//           // Add image Canvas to PDF
//           const bufferX = 5;
//           const bufferY = 5;
//           const imgProps = (<any>doc).getImageProperties(img);
//           const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
//           const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//           doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

//           return doc;
//         }).then((doc) => {
//           doc.save('salereports.pdf');  
//         });
//       }

     
      

}
