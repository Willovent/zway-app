import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ZwayService, Device } from '../zway.service';

@Component({
  selector: 'app-bashboard',
  templateUrl: './bashboard.component.html',
  styleUrls: ['./bashboard.component.scss']
})
export class BashboardComponent implements OnInit {

  devices: Device[];
  constructor(private authenticationService: AuthenticationService, private router: Router, private zwayService: ZwayService) { }

  ngOnInit() {
    if (!this.authenticationService.isAuthenticate()) {
      this.router.navigate(['login']);
    } else {
      this.zwayService.getDevice().subscribe(x => this.devices = x);
    }
  }

}
