import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStock } from '../components/stock';
import { StockHttpClient } from '../stock.httpClient';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient: StockHttpClient) { }

  getStock(): Observable<IStock[]> {
    return this.httpClient.get<IStock[]>('Stock');
  }

  delete(Id: number): Observable<boolean> {
    return this.httpClient.delete(`Stock/${Id}`);
  }

  create(data: any): Observable<IStock> {
    return this.httpClient.post('Stock', data);
  }
}
