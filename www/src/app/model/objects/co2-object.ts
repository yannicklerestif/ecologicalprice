import { ObjectDetails } from './object-details';

export class Co2Object implements ObjectDetails {
  constructor(public objectId: number, public co2Cost: number) {}
}
