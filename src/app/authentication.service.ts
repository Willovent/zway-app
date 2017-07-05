import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { SettingsService } from 'app/settings.service';

@Injectable()
export class AuthenticationService {

  private tokenSubject = new BehaviorSubject(localStorage['token'] || '');
  token = this.tokenSubject.asObservable();

  constructor(private router: Router, private http: Http, private settingsService: SettingsService) {
    if (this.settingsService.hasConfiguration) {
      this.login(this.settingsService.username, this.settingsService.password);
    }
  }

  login(username: string, password: string) {
    this.http.post(`${this.settingsService.serverUrl}/ZAutomation/api/v1/login`,
      {
        login: username,
        password,
        rememberme: true
      }).subscribe(x => {
        const token = x.json().data.sid;
        localStorage['token'] = token;
        this.tokenSubject.next(token);
        this.router.navigateByUrl('/');
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next('');
  }

  isAuthenticate() {
    return this.tokenSubject.getValue() !== '';
  }
}
