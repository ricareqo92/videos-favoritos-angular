import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-video',
  templateUrl: './detail-video.component.html',
  styleUrls: ['./detail-video.component.css'],
  providers: [UserService, VideoService]
})
export class DetailVideoComponent implements OnInit {

	public video: Video;
	public identity: any;
	public token: any;

	constructor(
		private _userService: UserService,
		private _videoService: VideoService,
		private _sanitizer: DomSanitizer,
		private _router: Router,
		private _route: ActivatedRoute,
	) {
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
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

	getVideoIframe(url) {
		var video, results;
	 
		if (url === null) {
			return '';
		}
		results = url.match('[\\?&]v=([^&#]*)');
		video   = (results === null) ? url : results[1];
	 
		return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
	}
	
}
