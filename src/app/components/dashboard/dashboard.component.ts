import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {GridOptions} from 'ag-grid/main';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public items: FirebaseListObservable<any[]>;
  private gridOptions:GridOptions;

  constructor(firebase: AngularFire) { 
    this.items = firebase.database.list('/messages');
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = this.createColumnDefs();
    this.gridOptions.enableColResize = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.enableFilter = true;
    this.gridOptions.onGridReady = (params) => {
        params.api.sizeColumnsToFit();
    };
  }

  ngOnInit() {
  }

  private createColumnDefs() {
        return [
            {
              headerName: "Date", 
              field: "date",
              cellRenderer: (params) => moment(params.value).format('DD/MM/YY HH:mm')
            },
            {
                headerName: "Message",
                field: "message",
                width: 700
            },
            {
                headerName: "MachineID",
                field: "sender",
            }
        ];
    }
}
