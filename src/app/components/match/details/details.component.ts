import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  team1;
  team2;
  headtohead;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Match';
  showYAxisLabel = true;
  yAxisLabel = 'Nombre de but';
  showDataLabel = true;

  view: any[] = [600, 300];

   goal_team = [];
   stats_team1 = [];
   stats_team2 = [];
   avg_goal_team1 = [];
   avg_goal_team2 = [];
   ranking;

  colorScheme = {
    domain: ['#779A79']
  };

  constructor(public route: ActivatedRoute, public rest: RestService) {
    this.team1 = this.route.snapshot.paramMap.get("team1");
    this.team2 = this.route.snapshot.paramMap.get("team2");
  }

  ngOnInit(): void {
    this.getRanking();
    this.getDetailsTeam();
    this.getTeamStat();
  }

  getDetailsTeam() {
    this.rest.getHead(this.team1, this.team2).subscribe((resp: any) => {
      this.headtohead = resp.response;
      this.goal_team = this.sortMatchByDate(resp.response)
    })
  }

  sortMatchByDate(match: any): Array<any> {
    let sortMatch: any;
    sortMatch = match.sort((a,b) => { return +(new Date(b.fixture.date)) - +(new Date(a.fixture.date)) })
    return sortMatch;
  }

  getTeamStat() {
    this.rest.getTeamStats(this.team1).subscribe((resp: any) => {
        this.stats_team1 = [{ name: "victoire", value: resp.response.fixtures.wins.total }, { name: "défaite", value: resp.response.fixtures.loses.total }]; 
        this.avg_goal_team1 = [{name: "Nb but", value: resp.response.goals.against.average.total}]
    })
    this.rest.getTeamStats(this.team2).subscribe((resp: any) => {
      this.stats_team2 = [{ name: "victoire", value: resp.response.fixtures.wins.total }, { name: "défaite", value: resp.response.fixtures.loses.total }];  
      this.avg_goal_team2 = [{name: "Nb but", value: resp.response.goals.against.average.total}]
  })
  }

  getRanking() {
    this.rest.getRanking().subscribe((resp: any) => {
      this.ranking = resp.response[0].league.standings[0];
      console.log(this.ranking)
    })
  }

}
