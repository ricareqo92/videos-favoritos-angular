import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
	public status: string;
  public identity: any;
  public token: any;

	constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
	) {
		this.page_title = 'Login';
		this.user = new User(1, '', '', '', '', '', '');
	}

	ngOnInit() {
    this.logout();
  }
  
  onSubmit(form) {    
    this._userService.signup(this.user).subscribe(
      response => {
        if ( !response.status || response.status != 'error' ) {
          this.status = 'success';
          this.identity = response;

          // SACAR TOKEN
          this._userService.signup(this.user, true).subscribe(
            response => {
              if ( !response.status || response.status != 'error' ) {
                this.token = response;
                localStorage.setItem('token', this.token);
                localStorage.setItem('identity', JSON.stringify(this.identity));
                this._router.navigate(['/inicio']);
              } else {
                this.status = 'error';
              }
            },
            error => {
              this.status = 'error';
              console.log(error);
            }
          );
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  logout() {
    this._route.params.subscribe(params => {
      let sure = +params['sure'];

      if ( sure == 1 ) {
        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        
        this.identity = null;
        this.token = null;

        this._router.navigate(['/inicio']);
      }
    });
  }

}
