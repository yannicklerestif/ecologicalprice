import { Component, OnInit, Input } from '@angular/core';
import { CompoundObjectLink } from '../../../model/objects/compound-object-link';
import { Price } from '../../../model/price';
import { ObjectDetails } from '../../../model/objects/object-details';
import { EpObject } from '../../../model/objects/ep-object';
import { ObjectService } from '../../../services/object/object.service';
import { PricerService } from '../../../services/pricer.service';
import { CompoundObject } from '../../../model/objects/compound-object';

@Component({
  selector: 'app-compound-details',
  templateUrl: './compound-details.component.html',
  styleUrls: [],
})
export class CompoundDetailsComponent implements OnInit {
  @Input() compoundObject: EpObject<CompoundObject>;

  constructor(private objectService: ObjectService, private pricerService: PricerService) {}

  ngOnInit() {}

  public getObject(objectId: number): EpObject<ObjectDetails> {
    return this.objectService.getObject(objectId);
  }

  public getPrice(objectId: number): Price {
    return this.pricerService.computePrice(this.objectService.getObject(objectId));
  }

  public getContribution(link: CompoundObjectLink): Price {
    return this.getPrice(link.parentId).times(link.quantity);
  }
}
