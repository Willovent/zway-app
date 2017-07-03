import { Component, OnInit, Input } from '@angular/core';
import { ZwayService, Device } from 'app/zway.service';

@Component({
  selector: 'app-toggle-device',
  templateUrl: './toggle-device.component.html',
  styleUrls: ['./toggle-device.component.scss']
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
