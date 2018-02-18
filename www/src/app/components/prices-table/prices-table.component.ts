import { Component, OnInit, Input } from '@angular/core';
import { PricedObject } from './priced-object';

@Component({
  selector: 'app-prices-table',
  templateUrl: './prices-table.component.html',
  styleUrls: ['./prices-table.component.scss'],
})
export class PricesTableComponent implements OnInit {
  @Input() pricedObjects: PricedObject[];

  public displayedColumns = ['objectName', 'objectPrice'];

  constructor() {}

  ngOnInit() {}
}
