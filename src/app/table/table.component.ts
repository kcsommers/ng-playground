import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  public displayedRows = ELEMENT_DATA;

  public totalColumns = 8;

  public includeActionsColumn = true;

  public initialized = false;

  constructor() { }

  ngOnInit() {
  }

  public getInitialGridTemplateColumns(): any {

    if (this.initialized) {
      return;
    }

    const colSizes = [`repeat(${this.displayedColumns.length}, 1fr)`];

    const colDiff = this.totalColumns - this.displayedColumns.length;

    if (colDiff > 0) {
      const prepended = this.includeActionsColumn ? colDiff - 1 : colDiff;
      if (prepended > 0) {
        for (let i = 0; i < prepended; i++) {
          colSizes.unshift('25px');
        }
      }

      if (this.includeActionsColumn) {
        colSizes.push('150px');
      }
    }

    this.initialized = true;
    return { gridTemplateColumns: colSizes.join(' ') };
  }

}
