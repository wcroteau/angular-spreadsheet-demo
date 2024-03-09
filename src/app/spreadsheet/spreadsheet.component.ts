import { Spreadsheet } from '@dhx/trial-spreadsheet';
import { getData } from './data';
import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'spreadsheet',
  styleUrls: ['./spreadsheet.component.css'],
  template: `<div #here class="widget"></div>`,
})
export class SpreadsheetComponent implements OnInit, OnDestroy {
  @ViewChild('here', { static: true }) spreadsheetContainer!: ElementRef;

  private _spreadsheet: any;

  ngOnInit() {
    let spreadsheet = new Spreadsheet(
      this.spreadsheetContainer.nativeElement,
      {},
    );
    spreadsheet.parse(getData());
    spreadsheet.events.on('ActionName', () => {
      // do something
    });

    this._spreadsheet = spreadsheet;
  }

  ngOnDestroy(): void {
    this._spreadsheet.destructor();
  }
}
