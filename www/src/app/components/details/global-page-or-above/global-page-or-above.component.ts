import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-global-page-or-above',
  templateUrl: './global-page-or-above.component.html',
  styleUrls: [],
})
export class GlobalPageOrAboveComponent implements OnInit {
  @Input() isZoomed: boolean;

  constructor() {}

  ngOnInit() {}
}
