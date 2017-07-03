import { Component, OnInit, Input } from '@angular/core';
import { Device, ZwayService } from 'app/zway.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  @Input()
  device: Device;

  constructor(private zwayService: ZwayService) { }

  ngOnInit() {
  }
}
