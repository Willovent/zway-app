import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZwayService, Device } from '../zway.service';
import { SettingsService } from 'app/settings.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-bashboard',
  templateUrl: './bashboard.component.html',
  styleUrls: ['./bashboard.component.scss']
})
export class BashboardComponent implements OnInit {

  devices: Observable<Device>[];
  constructor(private settingsService: SettingsService, private router: Router, private zwayService: ZwayService) { }

  ngOnInit() {
    if (!this.settingsService.hasConfiguration) {
      this.router.navigate(['login']);
    } else {
      this.zwayService.devices.subscribe(devices => {
        this.devices = devices.sort((x,y) => x.position - y.position).map(x => x.device);
      });
    }
  }

  close() {
    const remote = (<any>window).require('electron').remote;
    const curWin = remote.getCurrentWindow();
    curWin.close();
  }

}
