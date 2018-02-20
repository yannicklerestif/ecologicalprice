import { CompoundObjectLink } from './compound-object-link';
import { ObjectDetails } from './object-details';

export class CompoundObject implements ObjectDetails {
  constructor(public objectId: number, public links: CompoundObjectLink[]) {}
}
