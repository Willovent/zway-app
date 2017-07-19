import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Device, ZwayService } from 'app/zway.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceComponent implements OnInit {

  @Input()
  device: Device;

  constructor(private zwayService: ZwayService) { }

  ngOnInit() {
  }
}
