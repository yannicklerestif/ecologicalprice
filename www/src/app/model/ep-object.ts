import { ObjectType } from './object-type';

export class EpObject {
  constructor(
    public id: number,
    public name: string,
    public objectType: ObjectType,
    public ef: number
  ) {}
}
