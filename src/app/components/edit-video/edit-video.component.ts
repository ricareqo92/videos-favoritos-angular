import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-edit-video',
	templateUrl: './edit-video.component.html',
	styleUrls: ['./edit-video.component.css'],
	providers: [UserService, VideoService]
})
export class EditVideoComponent implements OnInit {

  	public page_title: string;
	public status: string;
	public video: Video;
	public identity: any;
	public token: any;

	constructor(
		private _userService: UserService,
		private _videoService: VideoService,
    private _router: Router,
    private _route: ActivatedRoute,
	) {
		this.page_title = 'Editar Video';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.video = new Video(1, this.identity.sub, '', '', '', '', null, null);
	}

	ngOnInit() {
		this._route.params.subscribe(params => {
			let id = +params['id'];
			this.getVideo(id);
		});
	}

	getVideo(id) {
		this._videoService.detail(id, this.token).subscribe(
			response => {
				if ( response.status == 'success' ) {
					this.video = response.video;
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	onSubmit(videoForm) {		
		this._videoService.update(this.video, this.token).subscribe(
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
