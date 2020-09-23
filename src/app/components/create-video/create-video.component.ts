import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-create-video',
	templateUrl: './create-video.component.html',
	styleUrls: ['./create-video.component.css'],
	providers: [UserService, VideoService]
})
export class CreateVideoComponent implements OnInit {

	public page_title: string;
	public status: string;
	public video: Video;
	public identity: any;
	public token: any;

	constructor(
		private _userService: UserService,
		private _videoService: VideoService,
		private _router: Router,
	) {
		this.page_title = 'Guardar un nuevo video favorito';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	ngOnInit() {
		this.video = new Video(1, this.identity.sub, '', '', '', '', null, null);
	}

	onSubmit(videoForm) {
		console.log(this.video, this.token);
		
		this._videoService.create(this.video, this.token).subscribe(
			response => {
				if ( response.status == 'success' ) {
					this.status = 'success';
					videoForm.reset();
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
