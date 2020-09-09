import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  END_POINT: string = "http://localhost:5000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(public http: HttpClient) { }

  /**
   * display cast error from back end
   * @param error 
   */
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage : ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getNextMatch() {
    return this.http.get(this.END_POINT + `/fixtures?league=61&season=2020`)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }




}
