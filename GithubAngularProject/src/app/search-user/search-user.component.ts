import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
})
export class SearchUserComponent implements OnChanges {
  public userData: any;
  @Input() searchValue: string = '';
  @Input() searchType: string = '';
  page: number = 1;
  pageSize: number = 10;
  userdata: any;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private dataService: DataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidParams();
  }

  checkValidParams() {
    if (this.searchType && this.searchValue) {
      if (this.searchType === 'getUser') {
        this.isLoading = true;
        this.getUserData();
      }
    } else {
      this.userdata = '';
    }
  }

  getUserData() {
    this.dataService
      .getGithubUser(this.searchValue, this.page, this.pageSize)
      .subscribe(
        (userdata) => {
          this.isLoading = false;
          this.userdata = userdata;
          console.log(userdata);
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.statusText;
        }
      );
  }

  changePage() {
    this.getUserData();
  }

  closeAlert() {
    this.errorMessage = '';
  }
}
