import { Injectable } from '@angular/core';
import { Transition } from '@uirouter/core';

@Injectable()
export class ScrollHelperService {
  constructor() {}

  private areArraysEqual(a: any[], b: any[]): boolean {
    if (a.length !== b.length) return false;
    for (let i: number = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  private getFilteredParamKeys(transition: Transition, fromTo: string): string[] {
    return Object.keys(transition.params(fromTo))
      .filter((key: string) => key !== 'country' && key !== 'currency')
      .sort((a, b) => (a + '').localeCompare(b + ''));
  }

  private hasStateReallyChanged(transition: Transition) {
    const hasStateNameChanged = transition.from().name !== transition.to().name;
    if (hasStateNameChanged) return true;
    const filteredFromKeys: string[] = this.getFilteredParamKeys(transition, 'from');
    const filteredToKeys: string[] = this.getFilteredParamKeys(transition, 'to');
    if (!this.areArraysEqual(filteredFromKeys, filteredToKeys)) return true;
    const filteredFromValues: any[] = filteredFromKeys.map(key => transition.params('from')[key]);
    const filteredToValues: any[] = filteredToKeys.map(key => transition.params('to')[key]);
    if (!this.areArraysEqual(filteredFromValues, filteredToValues)) return true;
    return false;
  }

  public scrolltopIfNecessary(transition: Transition) {
    const hasStateReallyChanged = this.hasStateReallyChanged(transition);
    if (hasStateReallyChanged) {
      window.scrollTo(0, 0);
    }
  }
}
