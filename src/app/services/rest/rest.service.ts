import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  END_POINT: string = "http://localhost:5000/api/v1.0";
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
    return this.http.get(this.END_POINT + `/next-match`)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }


  getHead(team1, team2) {
    return this.http.get(this.END_POINT + `/headtohead?team1=${team1}&team2=${team2}`)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getTeamStats(team) {
    return this.http.get(this.END_POINT + `/teams-stats?team=${team}`)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getRanking() {
    return this.http.get(this.END_POINT + `/ranking`)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  getLeagues() {
    return this.http.get(this.END_POINT + `/leagues`)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  login(datas) {
    return this.http.post(this.END_POINT + `/connection`, datas, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  register(datas) {
    return this.http.post(this.END_POINT + `/inscription`, datas, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }


}
