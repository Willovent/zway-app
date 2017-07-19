import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ZwayService, Device } from 'app/zway.service';

@Component({
  selector: 'app-toggle-device',
  templateUrl: './toggle-device.component.html',
  styleUrls: ['./toggle-device.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleDeviceComponent implements OnInit {

  @Input()
  device: Device;

  constructor(private zwayService: ZwayService) { }

   ngOnInit() {
  }

    pushButton(){
    this.zwayService.sendCommand(this.device, 'on').subscribe();
  }

}
