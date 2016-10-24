import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {GridOptions} from 'ag-grid/main';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  clients: any;
  private gridOptions:GridOptions;


  constructor(private firebase: AngularFire) {
    this.clients = firebase.database.list('/clients');
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = this.createColumnDefs();
    this.gridOptions.enableColResize = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.enableFilter = true;  
    this.gridOptions.getRowHeight = (params) => {
        console.log(params);
        let count = 2;
        if(params.data.machines) {
          count = (Object.keys(params.data.machines).length + 1);
        }
        return 18 * count;
    };
    this.gridOptions.onGridReady = (params) => {
        params.api.sizeColumnsToFit();
    };
  }

  ngOnInit() {
  }
  
  addClient(form) {
    this.clients.push(form.value);
    form.reset();
  }

  addMachine(form) {
    this.firebase.database.list('/clients/' + form.value.machineClient + '/machines').push(form.value);
    form.reset();
  }

  onModelUpdated(a) {
    console.log('asd', a);
  }

  private createColumnDefs() {
        return [
            {
              headerName: "Company", 
              field: "companyName",
              editable: true
            },
            {
                headerName: "Contact Person",
                field: "companyContactPerson",
                editable: true
            },
            {
                headerName: "Company Phone",
                field: "companyPhone",
                editable: true
            },
            {
                headerName: "Company Address",
                field: "companyAddress",
                editable: true
            },
            {
              headerName: "Machines",
              field: "machines",
              height: 'auto',
              cellRenderer: (params) => {
                if(!params.value) return '';
                let append = '';
                console.log('==>', params.value);
                for(let machineIndex in params.value) {
                  let machine = params.value[machineIndex];
                  append += `${machine.machineLabel} ${machine.machineService} <br />`;
                }
                return append;
              }
            }
        ];
    }



}
