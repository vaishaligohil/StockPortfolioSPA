import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMarketStock } from '../components/stock';

@Injectable({
  providedIn: 'root'
})
export class MarketStockService {
  private API_BASE_URL: string;

  constructor(private http: HttpClient) {
    this.API_BASE_URL = `${environment.apiUrl.AMSUrl}`;
  }

  getMarketStock(data: string): Observable<IMarketStock[]> {
    return this.http.get<IMarketStock[]>(`${this.API_BASE_URL}${data}`).pipe(retry(0));
  }

}
