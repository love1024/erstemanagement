import { AppData } from './../shared/models/app-data.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppStoreService {

    private _appData: BehaviorSubject<AppData> = new BehaviorSubject<AppData>({
        employeeId: 545,
        designation: 'Senior Manager',
        name: 'Puneet Verma'
    });

    public AppData: Observable<AppData> = this._appData.asObservable();

    constructor() { }

    public getLatest() {
        return this._appData.getValue();
    }
}
