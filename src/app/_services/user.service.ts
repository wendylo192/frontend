import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/tvshows';
const URL_USERS = '/users'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(`${API_URL}/home`, { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(`${API_URL}${URL_USERS}/all`);
  }

  register(user): Observable<any> {
    console.log(user)
    return this.http.post(`${API_URL}${URL_USERS}/add`, {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role
    }, httpOptions);
  }

  update(user, id): Observable<any> {
    console.log(user)
    return this.http.post(`${API_URL}${URL_USERS}/update`, {
      id: id,
      username: user.username,
      email: user.email,
      role: user.role
    }, httpOptions);
  }
}
