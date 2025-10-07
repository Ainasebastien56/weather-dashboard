import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey1 = 'd6a3c0062595cef597a06bfd243c62a7';
  private apiKey2 = '984a86c262154b129a9181358242108 ';
  private apiUrl = 'http://api.weatherapi.com/v1';

  constructor(private http: HttpClient) { }


  getGeoLocalisation(query: string){
    return this.http.get<any>(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${this.apiKey1}`)
  }

  getCurrentWeather(loc:any){
    return this.http.get<any>(`${this.apiUrl}/current.json?key=${this.apiKey2}&q=${loc.lat},${loc.lon}`)
  }

  getHourForecast(loc:any){
    return this.http.get<any>(`${this.apiUrl}/forecast.json?key=${this.apiKey2}&q=${loc.lat},${loc.lon}&days=1&aqi=no&alerts=no`)
  }

  getDayForecast(loc:any){
     return this.http.get<any>(`${this.apiUrl}/forecast.json?key=${this.apiKey2}&q=${loc.lat},${loc.lon}&days=3&aqi=no&alerts=no`)
  }

  getCurrentAirQuality(loc:any){
        return this.http.get<any>(`${this.apiUrl}/current.json?key=${this.apiKey2}&q=${loc.lat},${loc.lon}&aqi=yes`);
  }

  getAstro(loc:any){
    return this.http.get<any>(`${this.apiUrl}/forecast.json?key=${this.apiKey2}&q=${loc.lat},${loc.lon}&aqi=yes&alerts=no`);
  }

 getWeatherByCoordinates(lat:any, lon:any){
    return this.http.get<any>('http://api.openweathermap.org/data/2.5/weather',{
                    params:{
                        lat:lat,
                        lon :lon,
                        units:'metric',
                        appid:this.apiKey1
                    }
                })
 }
}
