import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {GridOptions} from 'ag-grid/main';

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
    this.gridOptions.rowData = this.createRowData();
    this.gridOptions.columnDefs = this.createColumnDefs();
  }

  ngOnInit() {
  }

  private createColumnDefs() {
        return [
            {headerName: "Name", field: "name", width: 200},
            {
                headerName: "Top",
                field: "ratios.top",
                width: 200
            },
            {
                headerName: "Bottom",
                field: "ratios.bottom",
                width: 200
            }
        ];
    }

    private createRowData() {
        return [
            {name: 'Homer Simpson', ratios: {top: 0.25, bottom: 0.75}},
            {name: 'Marge Simpson', ratios: {top: 0.67, bottom: 0.39}},
            {name: 'Bart Simpson', ratios: {top: 0.82, bottom: 0.47}},
            {name: 'Lisa Simpson', ratios: {top: 0.39, bottom: 1}}
        ];
    }

}
