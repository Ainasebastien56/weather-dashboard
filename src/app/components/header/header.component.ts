import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../../weather.service';
import { SearchService } from '../../shared/search.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  faSearch =faSearch;
  faBell = faBell;
  today: string = "";
  query:string = "";
  suggestions:any[] =[];



  constructor(
    private weatherService : WeatherService,
    private http: HttpClient,
    private searchService : SearchService
  ){}

  ngOnInit(){
    const city = 'Rose Hill';

    const option: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day:'numeric'
    };
    this.today = new Date().toLocaleDateString('en-US', option);

  }

  onSearch(){
    if(this.query.length < 2){
        this.suggestions = [];
        return;
    }

    this.weatherService.getGeoLocalisation(this.query).subscribe((res)=>{
      this.suggestions = res;
    });
  }

  selectCity(city:any){
    this.query = `${city.name}, ${city.country}`;
    this.suggestions = [];
    this.searchService.updateSearchTerm(city)
  }
}
