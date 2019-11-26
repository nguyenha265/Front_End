import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interface/user';
import {UserOnline} from '../interface/user-online';
// @ts-ignore
import {UserLogin} from '../interface/userLogin';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userOnline: UserOnline = {userName: '', role:  [''], jwtToken: ''};

  private API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/signup`, user, httpOptions);
  }

  userLogin(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(`${this.API_URL}/signin`, userLogin, httpOptions);
  }

}
