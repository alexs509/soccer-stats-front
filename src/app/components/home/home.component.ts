import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  nextMatch;
  endMatch;

  constructor(public rest: RestService) { }

  ngOnInit(): void {
    this.getNextMatch();
  }

  getNextMatch(): void {
    this.rest.getNextMatch().subscribe((resp: any) => {
      this.dispatchNextAndEndMatch(resp.response);
      //console.log(resp.response);
    })
  }

  dispatchNextAndEndMatch(allMatch: any): void {
    let end,next;
    end = allMatch.filter(match => { return match.goals.away != null });
    next = allMatch.filter(match => { return match.goals.away == null });

    this.endMatch = this.sortMatchByDate(end);
    this.nextMatch = this.sortMatchByDate(next);
  }

  sortMatchByDate(match: any): Array<any> {
    let sortMatch: any;
    sortMatch = match.sort((a,b) => { return +(new Date(a.fixture.date)) - +(new Date(b.fixture.date)) })
    return sortMatch;
  }


}
