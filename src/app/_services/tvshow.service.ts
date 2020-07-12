import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Show } from '../_interfaces/show.interface';

@Injectable({
  providedIn: 'root'
})
export class TvshowService {

  private REST_GET_SHOWS = 'http://api.tvmaze.com/shows';
  private REST_QUERY_KEYWORD = 'http://api.tvmaze.com/search/shows?q='
  private shows: Show[];
  
  constructor(private http: HttpClient) { }

  getShows(): Observable<any>{
    return this.http.get(this.REST_GET_SHOWS);
  }

  getShowsByKeyword(keyword: string): Observable<any>{
    return this.http.get(`${this.REST_QUERY_KEYWORD}${keyword}`);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
