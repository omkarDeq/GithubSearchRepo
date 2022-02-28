import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-search-repos',
  templateUrl: './search-repos.component.html',
  styleUrls: ['./search-repos.component.css']
})
export class SearchReposComponent implements OnInit,OnChanges {

  page = 1 ;
  pageSize =10;
  repodata : any;
  @Input() searchValue : string ="";
  @Input() searchType : string ="";
  isLoading: boolean = false;
  alert: string ="";
  
  constructor(private dataService : DataService) { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log("simple change object : "+ JSON.stringify(changes));
    
    this.checkValidParams();
  }

 



  checkValidParams(){
    if(this.searchType && this.searchValue){
     if(this.searchType === 'getRepo'){
    console.log("getting repo data ...");
    this.isLoading=true;
    this.getRepoData();
    }
    }
    else{
      this.repodata="";
    }
  }


  changePage(){
    this.getRepoData();
    
  }

  getRepoData(){
    this.dataService.getRepos(this.searchValue,this.page,this.pageSize).subscribe(
      repoData =>{
        this.isLoading=false;
        console.log(repoData);
        this.repodata = repoData;
        
      },
      error =>{
        this.isLoading=false;
        console.log(error);
        this.alert=error.statusText;
        
      }
    )
  }


  closeAlert(alert: string){
    this.alert="";
  }
}