import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationService {

  private tokenSubject = new BehaviorSubject(localStorage['token'] || '');
  token = this.tokenSubject.asObservable();

  constructor(private router: Router) { }

  login(username: string, password: string) {
    let token = btoa(`${username}:${password}`);
    localStorage['token'] = token;
    this.tokenSubject.next(token);
    this.router.navigateByUrl('/')
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next('');
  }

  isAuthenticate() {
    return this.tokenSubject.getValue() !== '';
  }
}
