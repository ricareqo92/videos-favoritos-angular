import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'videos-angular';
  public token;
  public identity;

  constructor(
    private _userService: UserService
  ) {
  }
  ngOnInit() {
    this.loadUser();
  }

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

}
