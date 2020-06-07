import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherStatusServiceService {
  apiId: any;

  constructor(private http: HttpClient) {
    this.apiId = 'c51223c219d6aec8cb8c5210449bd859'
   }

  // getstatus(city){
  //   return this.http.get(environment.url + 'forecast'+ '?q=' + city + '&appid='  + this.apiId)
  //   .map(Response =>
  //     {return Response}).catch(this.handleErrors);
  // }

  getstatus(city){
    return this.http.get(environment.url + 'forecast/daily'+ '?q=' + city + '&cnt=' + 7 +'&appid='  + this.apiId)
    .map(Response =>
      {return Response}).catch(this.handleErrors);
  }

  getCurrentCity(city){
    return this.http.get(environment.url + 'weather'+ '?q=' + city + '&appid='  + this.apiId)
    .map(Response =>
      {return Response}).catch(this.handleErrors);
  }


  private handleErrors (error: Response | any) {
    console.log(error.error.message)
    return Observable.throw(error.error.message || 'backend server error');
  }
}
