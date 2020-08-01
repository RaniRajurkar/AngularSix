import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from '../shared/Leaders';
import { resolve } from 'url';
import { DISHES } from '../shared/dishes';
import {Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map, catchError} from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders():Observable<Leader[]>{

    // return new Promise(resolve=>{
    
    //     setTimeout(()=>  resolve(LEADERS),2000);
   
    // });
    
  //return of(LEADERS).pipe(delay(2000));
  return this.http.get<Leader[]>(baseURL+'leadership') .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getLeader(id:string):Observable<Leader>{
      // return new Promise(resolve=>{
      //   setTimeout(()=>resolve(LEADERS.filter((lead)=>{lead.id==id})[0]),2000);
      // })
     // return of(LEADERS.filter((lead)=>{lead.id==id})[0]).pipe(delay(2000));
     return this.http.get<Leader>(baseURL+'leadership/'+id).pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getFeaturedLeader():Observable<Leader>{
    // return new Promise(resolve=>{
    //   setTimeout(()=> resolve(LEADERS.filter((lead)=>lead.featured)[0]),2000);
    // });
   
//return of(LEADERS.filter((lead)=>lead.featured)[0]).pipe(delay(2000));
return this.http.get<Leader>(baseURL+'leadership?featured=true')
.pipe(map(leadership=>leadership[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
