import { Component } from '@angular/core';
import { SearchService } from '../../shared/search.service';
import { WeatherService } from '../../weather.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faSun, faMoon, faCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-astro',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './astro.component.html',
  styleUrl: './astro.component.css'
})
export class AstroComponent {
  astroInfo : any;
  faSun = faSun;
  faMoon =faMoon;
  faCircle = faCircle;

  constructor(private weatherService : WeatherService, private searchService:SearchService){}


   ngOnInit(): void {
       this.searchService.searchTerm$.subscribe(data=>{
        if(data){
          this.loadAstroInfo(data);
        }
      })
  }

  loadAstroInfo(loc:any){
    this.weatherService.getAstro(loc).subscribe(data=>{
        this.astroInfo = data.forecast.forecastday[0].astro;
        console.log(this.astroInfo);
    })
  }
}
