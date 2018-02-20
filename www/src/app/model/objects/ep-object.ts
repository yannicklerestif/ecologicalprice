import { ObjectType } from './object-type';
import { ObjectDetails } from './object-details';

export class EpObject<T extends ObjectDetails> {
  constructor(
    public id: number,
    public name: string,
    public objectType: ObjectType,
    public ef: number,
    public details?: T
  ) {}
}
