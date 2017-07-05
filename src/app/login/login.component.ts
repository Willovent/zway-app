import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: string;
  password: string;
  serverUrl: string;

  constructor(private settingsService: SettingsService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  save() {
    this.settingsService.addConfiguration('defaultName', this.serverUrl, this.login, this.password);
    this.authenticationService.login(this.login, this.password);
  }
}
