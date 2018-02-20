import { ObjectDetails } from './object-details';

export class CropObject implements ObjectDetails {
  constructor(
    public objectId: number,
    public faoCode: number,
    public objectYield: number,
    public cropIntensity: number
  ) {}
}
