import { Spreadsheet } from '@dhx/trial-spreadsheet';
import { getData } from './data';
import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'spreadsheet',
  styleUrls: ['./spreadsheet.component.css'],
  template: `<div #here class="widget"></div>`,
})
export class SpreadsheetComponent implements OnInit, OnDestroy {
  @ViewChild('here', { static: true }) spreadsheetContainer!: ElementRef;

  @Output()
  visibleChanged = new EventEmitter();

  private _spreadsheet: any;

  ngOnInit() {
    let spreadsheet = new Spreadsheet(
      this.spreadsheetContainer.nativeElement,
      {}
    );
    spreadsheet.parse(getData());
    spreadsheet.events.on('ActionName', () => {
      // do something
    });

    spreadsheet.contextMenu.data.add({
      value: 'Hide',
      id: 'hide-action',
    });

    spreadsheet.contextMenu.events.on('click', (id) => {
      if (id === 'hide-action') {
        this.visibleChanged.emit();
      }
    });

    this._spreadsheet = spreadsheet;
  }

  ngOnDestroy(): void {
    this._spreadsheet.destructor();
  }
}
