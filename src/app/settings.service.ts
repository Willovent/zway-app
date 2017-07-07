import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  private currentConfig: IConfiguration;

  constructor() {
    const currentConfigString = localStorage[LocalStorageKeys.currentConfig];
    if (currentConfigString) {
      this.currentConfig = JSON.parse(currentConfigString);
    }
  }

  get hasConfiguration(): boolean {
    return this.currentConfig != null;
  }

  get serverUrl(): string {
    return this.currentConfig && this.currentConfig.serverUrl;
  }
  get username(): string {
    return this.currentConfig && this.currentConfig.username;
  }
  get password(): string {
    return this.currentConfig && this.currentConfig.password;
  }
  get configName(): string {
    return this.currentConfig && this.currentConfig.name;
  }

  addConfiguration(name: string, serverUrl: string, password: string, username: string) {
    const config: IConfiguration = {
      name,
      username,
      password,
      serverUrl
    };
    const configurationsString = localStorage[LocalStorageKeys.configurations];
    let configurations: IConfiguration[];
    if (configurationsString) {
      configurations = JSON.parse(configurationsString);
    } else {
      configurations = [];
    }
    configurations.push(config);
    localStorage[LocalStorageKeys.configurations] = JSON.stringify(configurations);
    if (configurations.length === 1) {
      localStorage[LocalStorageKeys.currentConfig] = JSON.stringify(config);
      this.currentConfig = config;
    }
  }
}

class LocalStorageKeys {
  static currentConfig = 'currentConfiguration';
  static configurations = 'configurations';
}

interface IConfiguration {
  name: string;
  username: string;
  password: string;
  serverUrl: string;
}
