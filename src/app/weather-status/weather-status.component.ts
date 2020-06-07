import { Component, OnInit } from '@angular/core';
import { WeatherStatusServiceService } from './weather-status-service.service';
import * as _ from "lodash";

@Component({
  selector: 'app-weather-status',
  templateUrl: './weather-status.component.html',
  styleUrls: ['./weather-status.component.scss']
})
export class WeatherStatusComponent implements OnInit {
  areaName:any;
  weathReport: Object;
  errorMsg: any;
  weathDesc:any;
  recentLocations = []
  weathtemp: number;
  nextday: any;
  weekReport = [];
  spin: boolean;
  locationName: any;

  constructor(public report: WeatherStatusServiceService) { }

  ngOnInit() {
    let curr = new Date();
    this.nextday = curr.setDate(curr.getDate() + 1)
    for (let i = 0; i <= 6; i++) {
      let first = curr.getDate() - curr.getDay() + i 
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
      this.weekReport.push({date:day, dayTemp: '', type: ''})
    }
  }

  cityName(name){
    this.spin = true;
    this.locationName = name;
    this.errorMsg = '';
    
   if(this.locationName){
    this.report.getstatus(this.locationName).subscribe(res=>{
      this.weathReport = res;
      this.weekReport.map((val, i)=>{
       val['dayTemp'] = Math.floor(res['list'][i].temp.day);
       val['type'] = res['list'][i].weather[0].main
      this.spin = false;
      })

      if(res['city']){
          this.recentLocations.unshift({name:res['city'].name, weathtemp: res['list'][0].temp.day, weathDesc: res['list'][0].weather[0].description})
          this.areaName = '';
          this.recentLocations = _.uniqBy(this.recentLocations, 'name')
        if(this.recentLocations.length == 9){
          let index = this.recentLocations.indexOf(this.recentLocations.length-1)
          this.recentLocations.splice(index, 1);
        }
      }
    },err=>{
      this.errorMsg = err
    })
   }else{
    this.errorMsg = 'Enter City Name'
   }
  }

  removeCity(ind){
    let index = this.recentLocations.indexOf(ind)
    this.recentLocations.splice(index, 1);
  }

  currentCity(city, i){
    this.report.getCurrentCity(city).subscribe(res=>{
      this.recentLocations[i].weathDesc = res['weather'][0].description;
      this.recentLocations[i].weathtemp = Math.floor(res['main'].temp)

    },
    err=>{
      this.errorMsg = err
    })

  }
  clear(){
    this.recentLocations = []
  }

}
