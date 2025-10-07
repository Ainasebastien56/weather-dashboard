import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudSun, faMapLocation, faClock, faChartLine, faBell, faGear, faHome} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  faCloudSun = faCloudSun;
  faMapLocation =faMapLocation;
  faClock = faClock;
  faChartLine = faChartLine;
  faBell = faBell;
  faGear =faGear;
  faHome = faHome;

}
