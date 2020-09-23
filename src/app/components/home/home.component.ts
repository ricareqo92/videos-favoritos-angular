import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	providers: [VideoService, UserService]
})
export class HomeComponent implements OnInit {

	public page_title: string;
	public videos: any;
	public identity: any;
	public token: any;
	public page;
	public next_page;
	public prev_page;
	public totalPages;
	public number_pages;

	constructor(
		private _videoService: VideoService,
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute,
	) {
		this.page_title = 'Video Favoritos';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	ngOnInit() {
		this.actualPageVideos();
	}

	getVideos(page) {
		this._videoService.videos(this.token, page).subscribe(
			response => {				
				if ( response.status == 'success' ) {
					this.videos = response.videos;
					this.totalPages = response.total_pages;
					// Navegación de paginación

					var number_pages = [];
					
					for(var i = 1; i <= this.totalPages; i++) {
					  number_pages.push(i);
					}
		  
					this.number_pages = number_pages;
		  
					if ( page >= 2 ) {
					  this.prev_page = page - 1;
					} else {
					  this.prev_page = 1;
					}
		  
					if ( page < this.totalPages ) {
					  this.next_page = page + 1;
					} else {
					  this.next_page = this.totalPages;
					}
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	actualPageVideos() {
		this._route.params.subscribe( params => {
			var page = +params['page'];

			if ( !page ) {
				this.prev_page = 1;
				this.next_page = 2;
			}
			this.getVideos(page);
		});
	}

	getThumb(url, size) {
		var video, results, thumburl;
		
		if (url === null) {
			return '';
		}
		 
		 results = url.match('[\\?&]v=([^&#]*)');
		 video   = (results === null) ? url : results[1];
		
		if(size != null) {
			 thumburl = 'http://img.youtube.com/vi/' + video + '/'+ size +'.jpg';
		}else{
			 thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
		}
		
		return thumburl;
			
	}

	delete(id) {
		this._videoService.remove(id, this.token).subscribe(
			response => {
				if ( response.status == 'success' ) {
					this.actualPageVideos();
				}
			},
			error => {

			}
		);
	}
	   
}
