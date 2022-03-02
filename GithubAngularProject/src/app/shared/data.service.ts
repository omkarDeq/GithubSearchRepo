import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { AppConstants } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  // get github user info
  getGithubUser(searchValue: string, pageNo: any, recordLimit: any) {
    const queryParams = {
      q: searchValue,
      page: pageNo,
      limit: recordLimit,
    };
    const url = AppConstants.API_ENDPOINT + `users`;

    return this.http.get(url, { params: queryParams });
  }

  getRepos(searchValue: string, pageNo: any, recordLimit: any) {
    const queryParams = {
      q: searchValue,
      page: pageNo,
      limit: recordLimit,
    };
    const url = AppConstants.API_ENDPOINT + `repos`;

    return this.http.get(url, { params: queryParams });
  }
}
