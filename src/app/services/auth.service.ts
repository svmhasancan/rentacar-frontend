import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = '';

  constructor(private httpClient: HttpClient) {}

  // Add this method to the existing auth.service.ts file
  register(user: any) {
    return this.httpClient.post<any>(`${this.apiUrl}/register`, user);
  }

  // Add this method to the existing auth.service.ts file
  login(user: any) {
    return this.httpClient.post<any>(`${this.apiUrl}/login`, user);
  }
}
