import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BashboardComponent } from './bashboard/bashboard.component';

import { SettingsService } from './settings.service';
import { ZwayService } from './zway.service';
import { AuthenticationService } from './authentication.service';
import { HttpSecureProvider } from './secure-http.service';

import { ROUTES } from './app.routes';
import { DeviceComponent } from './device/device.component';
import { MaterialModule } from '@angular/material';
import 'hammerjs/hammer';
import { ToggleDeviceComponent } from './device/toggle-device/toggle-device.component';
import { SwitchDeviceComponent } from './device/switch-device/switch-device.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BashboardComponent,
    DeviceComponent,
    ToggleDeviceComponent,
    SwitchDeviceComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule ,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ZwayService, SettingsService, HttpSecureProvider, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
