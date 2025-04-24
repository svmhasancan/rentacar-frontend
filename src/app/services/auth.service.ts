import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenModel } from '../models/tokenModel';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { RegisterModel } from '../models/registerModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44336/api/Auth';

  constructor(private httpClient: HttpClient) {}

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newUrl = this.apiUrl + '/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newUrl,
      loginModel
    );
  }

  register(
    registerModel: RegisterModel
  ): Observable<SingleResponseModel<RegisterModel>> {
    let newUrl = this.apiUrl + '/register';
    return this.httpClient.post<SingleResponseModel<RegisterModel>>(
      newUrl,
      registerModel
    );
  }

  isAuthenticeted() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
