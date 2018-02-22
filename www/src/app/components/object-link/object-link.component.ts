import { Component, OnInit, Input } from '@angular/core';
import { ObjectDetails } from '../../model/objects/object-details';
import { EpObject } from '../../model/objects/ep-object';

@Component({
  selector: 'app-object-link',
  templateUrl: './object-link.component.html',
  styleUrls: [],
})
export class ObjectLinkComponent implements OnInit {
  @Input() epObject: EpObject<ObjectDetails>;
  linkLabel: string;
  objectId: number;

  constructor() {}

  ngOnInit() {
    this.linkLabel = this.epObject == null ? 'global details page' : this.epObject.name;
    this.objectId = this.epObject == null ? null : this.epObject.id;
  }
}
