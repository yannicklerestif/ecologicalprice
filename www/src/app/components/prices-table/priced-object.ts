import { Price } from '../../model/price';
import { ObjectDetails } from '../../model/objects/object-details';
import { EpObject } from '../../model/objects/ep-object';

export class PricedObject {
  constructor(public epObject: EpObject<ObjectDetails>, public price: Price) {}
}
