import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../weather.service';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-day-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-forecast.component.html',
  styleUrl: './day-forecast.component.css'
})
export class DayForecastComponent implements OnInit {
    forecastdays: any[] =[];

    constructor(private weatherService : WeatherService, private searchService:SearchService){}

    ngOnInit(): void {
      this.searchService.searchTerm$.subscribe(data=>{
        if(data){
          this.loadDayForecat(data)
        }
      })

  }

  getDayLabel(dateStr: string, index: number){
    const date = new Date(dateStr);


    if(index === 0){
      return 'Today';
    }

    if(index === 1){
      return 'Tomorrow';
    }

    return date.toLocaleDateString('en-US', {weekday:'long'});
  }

  loadDayForecat(loc:any){
      this.weatherService.getDayForecast(loc).subscribe(data=>{
         this.forecastdays = data.forecast.forecastday.map((f:any, index:number)=>{
          return{
            label: this.getDayLabel(f.date, index),
            icon:f.day.condition.icon,
            text:f.day.condition.text,
            maxtemp: f.day.maxtemp_c,
            mintemp: f.day.mintemp_c,
          }
        });
      });
  }

}
