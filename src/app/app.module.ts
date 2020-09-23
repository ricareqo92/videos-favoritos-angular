import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { IdentityGuard } from './services/identity.guard';
import { UserService } from './services/user.service';
import { VideoComponent } from './components/video/video.component';
import { CreateVideoComponent } from './components/create-video/create-video.component';
import { EditVideoComponent } from './components/edit-video/edit-video.component';
import { DetailVideoComponent } from './components/detail-video/detail-video.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    RegisterComponent,
    LoginComponent,
    UserEditComponent,
    VideoComponent,
    CreateVideoComponent,
    EditVideoComponent,
    DetailVideoComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders,
    IdentityGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
