import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZwayService, Device } from '../zway.service';
import { SettingsService } from 'app/settings.service';

@Component({
  selector: 'app-bashboard',
  templateUrl: './bashboard.component.html',
  styleUrls: ['./bashboard.component.scss']
})
export class BashboardComponent implements OnInit {

  devices: Device[];
  constructor(private settingsService: SettingsService, private router: Router, private zwayService: ZwayService) { }

  ngOnInit() {
    if (!this.settingsService.hasConfiguration) {
      this.router.navigate(['login']);
    } else {
      this.zwayService.getDevices().subscribe(x => this.devices = x);
    }
  }

  close() {
    const remote = (<any>window).require('electron').remote;
    const curWin = remote.getCurrentWindow();
    curWin.close();
  }

}
