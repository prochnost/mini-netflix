import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'https://api.themoviedb.org/3/movie/';
  private params = '?api_key=bbce48a6b3288c533816a0927c05f691&language=en-US';

  constructor(private http: HttpClient) { }

  getMovies(pageNumber): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}top_rated${this.params}&page=${pageNumber}`);
  }

  getMovie(id): Observable<any> {
    return this.http.get<any>(this.baseUrl + id + this.params);
  }
}
