import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  constructor() { }

  public isEqual(a, b): boolean {
    let keys;
    if (Object.keys(a).length < Object.keys(b).length)
      keys = Object.keys(a);
    else
      keys = Object.keys(b);
    for (const key of keys) {
      if (a.hasOwnProperty(key) && b.hasOwnProperty(key) && a[key] != b[key]) {
        return false;
      }
    }
    return true;
  }
}
