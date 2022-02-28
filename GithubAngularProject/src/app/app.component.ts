import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from './shared/data.service';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

   
  title = 'GithubAngularProject';
  dropdownValueChoosen="Choose your search parameter";
  public search : FormControl;
  searchValue : string ="";
  searchType : string ="";

  constructor(private dataService : DataService) {
    this.search  = new FormControl('');
   }


  ngOnInit(): void {
    this.getSerachValue();
  }

  getSerachValue(){
    this.search.valueChanges.pipe(debounceTime(1000)).subscribe(
      searchData =>{
        this.searchValue = searchData;
        console.log(this.searchValue , "search-value : ");
 
        
      }
    );

  }



  dropdownValueEvent(event : any){
    this.dropdownValueChoosen = event.target.innerText;
    this.searchType = event.target.value;
    
  }




}
