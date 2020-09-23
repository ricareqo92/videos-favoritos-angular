import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';

@Injectable()
export class VideoService {
    
    public url;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    create(video, token): Observable<any> {
        let json = JSON.stringify(video);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        
        return this._http.post(this.url + 'video/new', params, {headers});
    }

    videos(token, page): Observable<any> {

        if ( !page ) {
            page = 1;
        } 

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        
        return this._http.get(this.url + 'video/list?page=' + page, {headers});
    }

    update(video, token): Observable<any> {
        let json = JSON.stringify(video);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        
        return this._http.put(this.url + 'video/edit/' + video.id, params, {headers});
    }

    detail(id, token): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        
        return this._http.get(this.url + 'video/detail/' + id, {headers});
    }

    remove(id, token): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        
        return this._http.delete(this.url + 'video/remove/' + id, {headers});
    }
}

