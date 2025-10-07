import { Component } from '@angular/core';
import { SearchService } from '../../shared/search.service';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'app-air-quality',
  standalone: true,
  imports: [],
  templateUrl: './air-quality.component.html',
  styleUrl: './air-quality.component.css'
})
export class AirQualityComponent {
  airInfo : any;

  constructor(private weatherService : WeatherService, private searchService:SearchService){}

   ngOnInit(): void {
       this.searchService.searchTerm$.subscribe(data=>{
        if(data){
          this.loadAirQuality(data)
        }
      })
  }

  loadAirQuality(loc:any){
    this.weatherService.getCurrentAirQuality(loc).subscribe(data=>{
      const airQuality = data.current.air_quality;
      const epaIndex = airQuality['us-epa-index'];
      this.airInfo = this.getAirQualityInfo(epaIndex);
      console.log(this.airInfo)
    })
  }

  getAirQualityInfo(index: number) {
  switch (index) {
    case 1:
      return { value: 42, label: 'Good', description: 'Air quality is satisfactory and poses little or no risk.' };
    case 2:
      return { value: 82, label: 'Moderate', description: 'Air quality is acceptable, but there may be a concern for some sensitive individuals.' };
    case 3:
      return { value: 122, label: 'Unhealthy for Sensitive Groups', description: 'People with respiratory disease should limit outdoor exertion.' };
    case 4:
      return { value: 162, label: 'Unhealthy', description: 'Everyone may begin to experience health effects; sensitive groups more seriously.' };
    case 5:
      return { value: 202, label: 'Very Unhealthy', description: 'Health alert: everyone may experience more serious health effects.' };
    case 6:
      return { value: 302, label: 'Hazardous', description: 'Emergency conditions. Entire population is likely to be affected.' };
    default:
      return { value: 0, label: 'Unknown', description: 'No data available.' };
  }
}

}
