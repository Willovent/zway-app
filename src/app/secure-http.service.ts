import { Injectable, FactoryProvider } from '@angular/core';
import { Http, RequestOptions, XHRBackend } from '@angular/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class SecureHttp extends Http {

  constructor(backend: XHRBackend, options: RequestOptions, authService: AuthenticationService) {
    super(backend, options);
    authService.token.subscribe(token => this._defaultOptions.headers.set('ZWAYSession', `${token}`));
  }
}

export function tmpFactory(backend: XHRBackend, options: RequestOptions, authService: AuthenticationService) {
  return new SecureHttp(backend, options, authService);
};

export let HttpSecureProvider: FactoryProvider = {
  provide: SecureHttp,
  useFactory: tmpFactory,
  deps: [XHRBackend, RequestOptions, AuthenticationService]
};
