import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SecureHttp } from './secure-http.service';
import { SettingsService } from './settings.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs/Rx';

@Injectable()
export class ZwayService {

  private updateTime: number;
  private localDevicesSubject: DevicesSubject = {};
  private localDevicesObservable: Observable<Device>[] = [];
  private devicesSubject = new BehaviorSubject<Observable<Device>[]>(this.localDevicesObservable);
  devices = this.devicesSubject.asObservable();

  constructor(private settingsService: SettingsService, private http: SecureHttp) {
    this.getDevicesTimer().subscribe();
  }

  private getDevices() {
    const query = this.updateTime ? `?since=${this.updateTime}` : '';
    return this.http.get(`${this.settingsService.serverUrl}/ZAutomation/api/v1/devices${query}`)
      .map(x => {
        const response = x.json();
        this.updateTime = response.data.updateTime;
        return <Device[]>response.data.devices;
      })
      .subscribe(devices => {
        if (this.addOrUpdateDevices(devices)) {
          this.devicesSubject.next(this.localDevicesObservable);
        }
      });
  }

  private getDevicesTimer(): Observable<Subscription> {
    return Observable.timer(0, 5000).map(x => this.getDevices());
  }

  /**
   * Add or update a device in memory
   * @param device the device that must be add
   * @return true is the device was add, false if it was update
   */
  private addOrUpdateDevice(device: Device): boolean {
    if (!this.localDevicesSubject[device.id]) {
      this.localDevicesSubject[device.id] = new BehaviorSubject<Device>(device);
      this.localDevicesObservable.push(this.localDevicesSubject[device.id].asObservable());
      return true;
    } else {
      this.localDevicesSubject[device.id].next(device);
      return false;
    }
  }

  /**
   * Add or update multiple devices in memory
   * @param devices the devices that must be add
   * @return true if on or more devices has been add, false if it was only update
   */
  private addOrUpdateDevices(devices: Device[]): boolean {
    let newValue = false;
    for (const device of devices) {
      newValue = this.addOrUpdateDevice(device) || newValue;
    }
    return newValue;
  }

  sendCommand(device: Device, command: string): Observable<void> {
    return this.http.get(`${this.settingsService.serverUrl}/ZAutomation/api/v1/devices/${device.id}/command/${command}`)
      .map(x => null);
  }

}

export class DevicesSubject {
  [id: string]: BehaviorSubject<Device>;
}

export interface Metric {
  level: string;
  icon: string;
  title: string;
  modificationTime: number;
  lastLevel: string;
}

export class Device {
  deviceType: string;
  id: string;
  metrics: Metric;
  visibility: boolean;
  updateTime: number;
}
