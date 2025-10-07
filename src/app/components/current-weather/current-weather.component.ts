import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { SearchService } from '../../shared/search.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faDroplet, faWind, faTemperatureHalf, faSun, faGauge } from '@fortawesome/free-solid-svg-icons';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [FontAwesomeModule, DecimalPipe],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.css'
})
export class CurrentWeatherComponent implements OnInit{
  faEye = faEye;
  faDroplet = faDroplet;
  faWind = faWind;
  faTemperatureHalf =faTemperatureHalf;
  faSun = faSun;
  faGauge =faGauge;

  currentWeather: any;

  constructor(private weatherService : WeatherService, private searchService:SearchService){}

  ngOnInit(){
      this.searchService.searchTerm$.subscribe(data=>{
        if(data){
          this.loadCurrentWeather(data)
        }
      })
  }

  loadCurrentWeather(loc: any){
    this.weatherService.getCurrentWeather(loc)
    .subscribe(data=>{
      this.currentWeather = data;
    })
  }
}
