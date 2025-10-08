import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { WeatherService } from '../../weather.service';
import { SearchService } from '../../shared/search.service';

Chart.register(...registerables);

@Component({
  selector: 'app-hour-forecast',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './hour-forecast.component.html',
  styleUrl: './hour-forecast.component.css'
})
export class HourForecastComponent implements OnInit{
  private chart: Chart | null = null;



  constructor(private weatherService : WeatherService, private searchService:SearchService){}

  ngOnInit(): void {
       this.searchService.searchTerm$.subscribe(data=>{
        if(data){
          this.loadHourForecast(data)
        }
      })
  }

  loadHourForecast(loc:any){
    this.weatherService.getHourForecast(loc).subscribe(data=>{
      const hours = data.forecast.forecastday[0].hour;

      const labels = hours.map((h:any)=> h.time.split(" ")[1]);
      const temps = hours.map((h:any)=>h.temp_c);
      this.createChart(labels, temps)
    })
  }
   createChart(labels: string[], temps: number[]) {
      if (this.chart) {
    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = temps;
    this.chart.update();
    return;
  }
    this.chart = new Chart('forecastChart', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Temperature (°C)',
        data: temps,
        fill: true,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: 'rgb(54, 162, 235)',
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } },
      scales: {
        x: { title: { display: true, text: 'Time' } },
        y: { title: { display: true, text: 'Temperature (°C)' } }
      }
    }
  });
}

}
