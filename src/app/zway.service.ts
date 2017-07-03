import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SecureHttp } from './secure-http.service';
import { SettingsService } from './settings.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ZwayService {

  constructor(private settingsService: SettingsService, private http: SecureHttp) { }

  getDevice(): Observable<Device[]> {
    return this.http.get(`${this.settingsService.serverUrl}/ZAutomation/api/v1/devices`).map(x => x.json().data.devices);
  }

  sendCommand(device: Device, command: string): Observable<void> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${this.settingsService.serverUrl}/ZAutomation/api/v1/devices/${device.id}/command/${command}`).map(x => null);
  }

}

export interface Metric {
  level: string;
  icon: string;
  title: string;
  modificationTime: number;
  lastLevel: string;
}

export interface Device {
  deviceType: string;
  id: string;
  metrics: Metric;
  visibility: boolean;
  updateTime: number;
}
