import { ObjectDetails } from './object-details';

export class LivestockObject implements ObjectDetails {
  constructor(
    public objectId: number,
    public totalProduced: number,
    public totalEcologicalFootprint: number,
    public retailCutPercent: number
  ) {}
}
