import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../shared/search.service';
import { WeatherService } from '../../weather.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-weather-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-map.component.html',
  styleUrl: './weather-map.component.css'
})
export class WeatherMapComponent implements AfterViewInit {
  private map!:L.Map;

  constructor(private weatherService : WeatherService, private searchService: SearchService){}

  ngAfterViewInit(): void {
    this.searchService.searchTerm$.subscribe(data=>{
      this.initMap(data);
    })
  }

  private initMap(loc:any): void{
    this.map = L.map('map').setView([loc.lat, loc.lon],  10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
      maxZoom:19,
      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);


    this.map.on('click',(event: L.LeafletMouseEvent)=>{
      const lat = event.latlng.lat;
      const lon = event.latlng.lng;
      this.weatherService.getWeatherByCoordinates(lat,lon).subscribe((data)=>{
          this.addWeatherMarker(lat, lon, data);
      })
    })
  }

  private addWeatherMarker(lat:number, lon:number, weatherData : any): void{
    L.marker([lat, lon])
    .addTo(this.map)
    .bindPopup(`<b>Location:</b> ${weatherData.name} <br><b>Weather:</b> ${weatherData.weather[0].description}<br><b>Temperature:</b> ${weatherData.main.temp}°C`)
    .openPopup();
  }
}
