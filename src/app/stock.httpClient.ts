import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class StockHttpClient {
  private API_BASE_URL: string;
  private DEFAULT_RETRY_TIMES = 3;

  constructor(private httpClient: HttpClient) {
    this.API_BASE_URL = `${environment.apiUrl.ApiUrl}`;
  }

  public get<T>(url: string): Observable<T> {
    return this.httpClient
      .get<T>(`${this.API_BASE_URL}/${url}`)
      .pipe(retry(this.DEFAULT_RETRY_TIMES));
  }

  public getString(url: string): Observable<string> {
    return this.httpClient
      .get(`${this.API_BASE_URL}/${url}`, { responseType: 'text' })
      .pipe(retry(this.DEFAULT_RETRY_TIMES));
  }

  public post<T, C>(url: string, payload: T): Observable<C> {
    return this.httpClient
      .post<C>(`${this.API_BASE_URL}/${url}`, payload)
      .pipe(retry(this.DEFAULT_RETRY_TIMES));
  }

  public put<T, C>(url: string, payload: T): Observable<C> {
    if (!url) {
      return throwError(new Error('Fatal error: Missing param url'));
    }
    return this.httpClient
      .put<C>(`${this.API_BASE_URL}/${url}`, payload)
      .pipe(retry(this.DEFAULT_RETRY_TIMES));
  }

  /**
   *
   * @param url The URL path to call (without the beginning and end slashes!)
   * @param id The ID of the entity
   */
  public delete<T, C>(url: string, id?: T): Observable<C> {
    if (!url) {
      return throwError(new Error('Fatal error: Missing param url'));
    }

    if (id) {
      return this.httpClient
        .delete<C>(`${this.API_BASE_URL}/${url}/${id}`)
        .pipe(retry(this.DEFAULT_RETRY_TIMES));
    }

    return this.httpClient
      .delete<C>(`${this.API_BASE_URL}/${url}`)
      .pipe(retry(this.DEFAULT_RETRY_TIMES));
  }
}
