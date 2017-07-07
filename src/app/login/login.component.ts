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
    if (!this.serverUrl.startsWith('http://') && !this.serverUrl.startsWith('https://')) {
      this.serverUrl = `http://${this.serverUrl}`;
    }
    if (!this.serverUrl.match(/:\d/)) {
      this.serverUrl += ':8083';
    }
    this.settingsService.addConfiguration('defaultName', this.serverUrl, this.password, this.login);
    this.authenticationService.login(this.login, this.password);
  }
}
