import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  constructor() { }

  saveServer(serverUrl: string) {
    localStorage['serverUrl'] = serverUrl;
  }

  get serverUrl() {
    return localStorage['serverUrl'];
  }
}
