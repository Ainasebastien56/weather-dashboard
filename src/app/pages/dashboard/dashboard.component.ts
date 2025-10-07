import { Component } from '@angular/core';
import { CurrentWeatherComponent } from '../../components/current-weather/current-weather.component';
import { HourForecastComponent } from "../../components/hour-forecast/hour-forecast.component";
import { DayForecastComponent } from '../../components/day-forecast/day-forecast.component';
import { AirQualityComponent } from '../../components/air-quality/air-quality.component';
import { AstroComponent } from '../../components/astro/astro.component';
import { WeatherMapComponent } from '../../components/weather-map/weather-map.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
            CurrentWeatherComponent,
            HourForecastComponent,
            DayForecastComponent,
            AirQualityComponent,
            AstroComponent,
            WeatherMapComponent
          ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
}
