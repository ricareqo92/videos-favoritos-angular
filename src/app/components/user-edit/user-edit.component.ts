import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.css'],
	providers: [UserService]
})
export class UserEditComponent implements OnInit {
  
	public page_title: string;
	public status: string;
	public user: User;
	public identity: any;
	public token: any;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.page_title = 'Actualizar';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.user = this.identity;
	}

	ngOnInit() {
	}

	onSubmit(editForm) {
		this._userService.update(this.user, this.token).subscribe(
			response => {
				console.log(response);
				
				if ( response.status == 'success' ) {
					this.status = 'success';
					editForm.reset();
					this._router.navigate(['/inicio']);
				} else {
					this.status = 'error';
				}
			},
			error => {
				console.log(error);
				this.status = 'error';
			}
		);
	}
}
