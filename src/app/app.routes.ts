import { Routes } from "@angular/router";
import { BashboardComponent } from "./bashboard/bashboard.component";
import { LoginComponent } from "./login/login.component";

export let ROUTES: Routes = [
    { path: '', component: BashboardComponent },
    { path: 'login', component: LoginComponent }
]