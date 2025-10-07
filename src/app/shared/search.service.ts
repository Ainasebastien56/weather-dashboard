import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTermSource = new BehaviorSubject<any>({lat:-20.162, lon:57.499}); //garde la derniere valeur du champ de recherche
  searchTerm$ = this.searchTermSource.asObservable();

  updateSearchTerm(city:any){
    this.searchTermSource.next(city);
  }
}
