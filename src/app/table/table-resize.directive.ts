import { Directive, OnInit, Renderer2, Input, ElementRef } from '@angular/core';

class Column {

  public static MIN_WIDTH = 50;

  constructor(public el: HTMLElement, public size: string, public startWidth?: number) { }
}

@Directive({
  selector: '[resizeColumns]'
})
export class ResizeColumnDirective implements OnInit {

  @Input('resizeColumns')
  private resizable: boolean;

  private table: HTMLTableElement;

  private startX: number;

  private allColumns: Column[];

  private resizableColumns: Column[] = [];

  private activeColumn: Column;

  private activeColumnSibling: Column;

  private mouseMoveListener: any;

  private mouseUpListener: any;

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit() {
    this.table = this.renderer.parentNode(this.el.nativeElement);
  }

  ngAfterViewInit() {

    const theadRow = this.el.nativeElement && this.el.nativeElement.firstChild;

    if (!this.resizable || !theadRow || !theadRow.children || !theadRow.children.length) {
      return;
    }

    const allColumns = Array.from(theadRow.children) as HTMLTableHeaderCellElement[];

    this.allColumns = allColumns.map(c => {

      if (c.classList.contains('ada-th')) {
        const col = new Column(c, 'minmax(50px, 1fr)');
        this.resizableColumns.push(col);
        return col;
      }

      if (c.classList.contains('ada-th-actions')) {
        return new Column(c, '150px');
      }

      return new Column(c, '25px');

    });

    this.resizableColumns.forEach((c, i) => {
      const resizer = this.renderer.createElement('span');
      this.renderer.addClass(resizer, 'resize-holder');
      console.log(resizer, c.el.firstChild)
      this.renderer.insertBefore(c.el, resizer, c.el.firstChild);

      if (i < this.resizableColumns.length - 1) {
        this.renderer.listen(resizer, 'mousedown', this.onMouseDown.bind(this, i));
      }
    });

    this.renderer.setStyle(this.table, 'gridTemplateColumns', this.allColumns
      .map(c => c.size)
      .join(' '));
  }

  private onMouseDown(columnIndex: number, event: MouseEvent): void {

    // add listeners
    this.mouseMoveListener = this.renderer.listen(window, 'mousemove', this.onMouseMove.bind(this));
    this.mouseUpListener = this.renderer.listen(window, 'mouseup', this.onMouseUp.bind(this));

    // set start position
    this.startX = event.pageX;

    // set selected columns
    this.activeColumn = this.resizableColumns[columnIndex];
    this.activeColumnSibling = this.resizableColumns[columnIndex + 1];

    this.activeColumn.startWidth = this.activeColumn.el.offsetWidth;
    this.activeColumnSibling.startWidth = this.activeColumnSibling.el.offsetWidth;

  };

  private onMouseMove(event: MouseEvent): number {

    return requestAnimationFrame(() => {
      // determine the new width
      const newWidth = this.activeColumn.startWidth + (event.pageX - this.startX);
      const newSiblingWidth = this.activeColumnSibling.startWidth - (event.pageX - this.startX);

      if (newWidth <= Column.MIN_WIDTH || newSiblingWidth <= Column.MIN_WIDTH) {
        return;
      }

      this.activeColumn.size = `${Math.max(Column.MIN_WIDTH, newWidth)}px`;
      this.activeColumnSibling.size = `${Math.max(Column.MIN_WIDTH, newSiblingWidth)}px`;

      this.resizableColumns.forEach(c => {
        if (c.size.startsWith('minmax')) { // isn't fixed yet (it would be a pixel value otherwise)
          c.size = `${c.el.clientWidth}px`;
        }
      });

      this.renderer.setStyle(this.table, 'gridTemplateColumns', this.allColumns
        .map(c => c.size)
        .join(' '));
    })

  };

  private onMouseUp(): void {

    // remove listeners
    this.mouseMoveListener();
    this.mouseUpListener();

    // set the new start widths on selected columns
    this.activeColumn.startWidth = this.activeColumn.el.offsetWidth;
    this.activeColumnSibling.startWidth = this.activeColumnSibling.el.offsetWidth;

  };
}




// import { Directive, OnInit, Renderer2, Input, ElementRef } from '@angular/core';

// interface Column {
//   el: HTMLElement;

//   size: string;

//   startWidth?: number;
// }

// @Directive({
//   selector: '[resizeColumn]'
// })
// export class ResizeColumnDirective implements OnInit {
//   @Input('resizeColumn') resizable: boolean;

//   private MIN_WIDTH = 50;

//   private startX: number;

//   private columns: Column[];

//   private resizingColumn: Column;

//   private resizingSibling: Column;

//   private mouseMoveListener: any;

//   private mouseUpListener: any;

//   constructor(private renderer: Renderer2, private el: ElementRef) {
//   }

//   ngOnInit() {
//   }

//   ngAfterViewInit() {

//     const columns = Array.from(<HTMLElement[]>this.el.nativeElement.querySelectorAll('th') || []);

//     this.columns = columns
//       .map((c, i) => {
//         if (i < columns.length - 1) {
//           const resizer = this.renderer.createElement('span');
//           this.renderer.addClass(resizer, 'resize-holder');
//           this.renderer.insertBefore(c, resizer, c.firstChild);
//           this.renderer.listen(resizer, 'mousedown', this.onMouseDown.bind(this, i));
//         }

//         return {
//           el: c,
//           size: `minmax(${this.MIN_WIDTH}px, 1fr)`
//         }
//       });

//     console.log('COLUMNS:::: ', this.columns);
//   }

//   onMouseDown = (columnIndex: number, event: MouseEvent) => {

//     this.resizingColumn = this.columns[columnIndex];
//     this.resizingSibling = this.columns[columnIndex + 1];

//     if (!this.resizingColumn || !this.resizingSibling) {
//       return;
//     }

//     this.mouseMoveListener = this.renderer.listen(window, 'mousemove', this.onMouseMove.bind(this, columnIndex));
//     this.mouseUpListener = this.renderer.listen(window, 'mouseup', this.onMouseUp);

//     this.startX = event.pageX;

//     this.resizingColumn.startWidth = this.resizingColumn.el.offsetWidth;
//     this.resizingSibling.startWidth = this.resizingSibling.el.offsetWidth;
//   };

//   onMouseMove = (columnIndex: number, event: MouseEvent) => {

//     this.renderer.addClass(this.el.nativeElement, 'ada-table-resizing');

//     // Calculate width of column
//     let resizingWidth = this.resizingColumn.startWidth + (event.pageX - this.startX);
//     if (resizingWidth <= this.MIN_WIDTH) {
//       this.setResizingColumn(columnIndex, -1);
//     }

//     if (!this.resizingColumn) {
//       return;
//     }

//     let siblingWidth = this.resizingSibling.startWidth - (event.pageX - this.startX);

//     this.resizingColumn.size = `${Math.max(this.MIN_WIDTH, resizingWidth)}px`;
//     this.resizingSibling.size = `${Math.max(this.MIN_WIDTH, siblingWidth)}px`;

//     this.columns.forEach(c => {
//       if (c.size.startsWith('minmax')) { // isn't fixed yet (it would be a pixel value otherwise)
//         c.size = `${c.el.clientWidth}px`;
//       }
//     });

//     this.renderer.setStyle(this.el.nativeElement, 'gridTemplateColumns', this.columns
//       .map(c => c.size)
//       .join(' '));
//   };

//   onMouseUp = (event: MouseEvent) => {
//     this.renderer.removeClass(this.el.nativeElement, 'ada-table-resizing');

//     this.mouseMoveListener();

//     this.mouseUpListener();
//   };

//   private setResizingColumn(index: number, dir: 1 | -1): void {

//     let column: Column;
//     let i = 0;
//     let g2g = false;

//     while (!g2g) {
//       column = this.columns[index + dir + i];
//       i += dir;

//       if (!column) {
//         break;
//       }

//       column.startWidth = column.el.offsetWidth;

//       g2g = column.startWidth >= this.MIN_WIDTH;
//     }

//     this.resizingColumn = column;
//     console.log('COL:::: ', this.resizingColumn);
//   }

//   private setResizingSibling(index: number, dir: 1 | -1): void {

//     let col
//     let count = 0;





//     this.resizingColumn = this.columns[index + dir];



//     this.resizingColumn.startWidth = this.resizingSibling.el.offsetWidth;
//   }
// }


