import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ZwayService, Device } from 'app/zway.service';
import { MdSlideToggleChange } from '@angular/material/typings';

@Component({
  selector: 'app-switch-device',
  templateUrl: './switch-device.component.html',
  styleUrls: ['./switch-device.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
