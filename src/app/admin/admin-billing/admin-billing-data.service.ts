import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BillingRate } from '../../shared/models/admin/billing.model';

@Injectable({
  providedIn: 'root'
})
export class AdminBillingDataService {

  private url = environment.urls.billingApi;

  constructor(private httpClient: HttpClient) { }

  public getBillingRateList(active: boolean): Observable<BillingRate[]> {
    const url = this.url + "?active=" + active;
    return this.httpClient.get<BillingRate[]>(url);
  }

  public createBillingRate(billingRate: BillingRate): Observable<any> {
    return this.httpClient.post<any>(this.url, billingRate);
  }

  public updateBillingRate(billingRate: BillingRate): Observable<any> {
    const url = this.url + "/" + billingRate._id;
    return this.httpClient.put<any>(url, billingRate);
  }

  public deleteBillingRate(id: String): Observable<any> {
    const url = this.url + "/" + id;
    return this.httpClient.delete<any>(url);
  }
}
