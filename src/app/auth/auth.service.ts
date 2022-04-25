import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  handleAzureToken(idToken: string): Observable<string> {
    console.log(idToken);
    return this.http.get<string>(
      `${environment.webApiUrl}/login/b2c/franchise`,
      this._getOptions(idToken)
    );
  }

  private _getOptions(idToken: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + idToken,
    });
    return { headers };
  }
}
