import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit,OnChanges {

  public userData : any;
  // public uname : FormControl;
  @Input() searchValue : string ="";
  @Input() searchType : string ="";
  page = 1 ;
  pageSize =10;
  userdata : any;
  isLoading: boolean = false;
  alert: string ="";
  

  constructor(private dataService : DataService) {
    // this.uname  = new FormControl('');
   }




  ngOnInit(): void {
    

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("simple change object : "+ JSON.stringify(changes));
    
    this.checkValidParams();
  }

 



  checkValidParams(){
    if(this.searchType && this.searchValue){
     if(this.searchType === 'getUser'){
    console.log("getting user data ...");
    this.isLoading=true;
    this.getUserData();
    }
    }
    else{
      this.userdata="";
    }
  }


  getUserData(){
  
    this.dataService.getGithubUser(this.searchValue,this.page,this.pageSize).subscribe(
      userdata =>{
        this.isLoading=false;
        this.userdata = userdata;
        console.log(userdata);
        
      },
      error =>{
        this.isLoading=false;
        console.log(error);
        this.alert=error.statusText;
        
      }
    )
  }


  changePage(){
    this.getUserData();
    
  }

  closeAlert(alert: string){
    this.alert="";
  }


}
