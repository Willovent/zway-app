import { Component, OnInit, Input } from '@angular/core';
import { ZwayService, Device } from 'app/zway.service';
import { MdSlideToggleChange } from '@angular/material/typings';

@Component({
  selector: 'app-switch-device',
  templateUrl: './switch-device.component.html',
  styleUrls: ['./switch-device.component.scss']
})
export class SwitchDeviceComponent implements OnInit {

  @Input()
  device: Device;

  constructor(private zwayService: ZwayService) { }

  ngOnInit() {
  }

  change(value: MdSlideToggleChange) {
    this.zwayService.sendCommand(this.device, value.checked ? 'on' : 'off').subscribe();
  }

}
