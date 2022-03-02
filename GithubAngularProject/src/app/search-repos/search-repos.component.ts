import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-search-repos',
  templateUrl: './search-repos.component.html',
  styleUrls: ['./search-repos.component.css'],
})
export class SearchReposComponent implements OnInit, OnChanges {
  page = 1;
  pageSize = 10;
  repodata: any;
  @Input() searchValue: string = '';
  @Input() searchType: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidParams();
  }

  checkValidParams() {
    if (this.searchType && this.searchValue) {
      if (this.searchType === 'getRepo') {
        this.isLoading = true;
        this.getRepoData();
      }
    } else {
      this.repodata = '';
    }
  }

  changePage() {
    this.getRepoData();
  }

  getRepoData() {
    this.dataService
      .getRepos(this.searchValue, this.page, this.pageSize)
      .subscribe(
        (repoData) => {
          this.isLoading = false;
          this.repodata = repoData;
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.statusText;
        }
      );
  }

  closeAlert() {
    this.errorMessage = '';
  }
}
