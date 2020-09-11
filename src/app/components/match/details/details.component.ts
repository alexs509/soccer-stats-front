import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest/rest.service';
import { forkJoin } from 'rxjs';

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
  xAxisLabel = 'Résultat';
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
   comparegoals= [];

  colorScheme = {
    domain: ['#779A79']
  };
  colorScheme2 = {
    domain: ['green', '#A10A28']
  };
  view2: any[] = [700, 200];

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
    forkJoin(
      this.rest.getTeamStats(this.team1),
      this.rest.getTeamStats(this.team2)
    ).subscribe(([resp1, resp2] : any)=> {
      this.stats_team1 = [{ name: "victoire", value: resp1.response.fixtures.wins.total }, { name: "défaite", value: resp1.response.fixtures.loses.total }]; 
      this.avg_goal_team1 = [{name: "Nb but", value: resp1.response.goals.for.average.total}]
      console.log(resp1.response)
      this.comparegoals = [...this.comparegoals, {name: resp1.response.team.name + " - marquer", value: resp1.response.goals.for.total.total ? resp1.response.goals.for.total.total : 0},
      {name: resp1.response.team.name + " - encaisser", value: resp1.response.goals.against.total.total ? resp1.response.goals.against.total.total : 0}];
      console.log(this.comparegoals);
      console.log(resp1.response.goals.for.total)
      console.log(resp1.response.goals.for.total.total)

      this.stats_team2 = [{ name: "victoire", value: resp2.response.fixtures.wins.total }, { name: "défaite", value: resp2.response.fixtures.loses.total }];  
      this.avg_goal_team2 = [{name: "Nb but", value: resp2.response.goals.for.average.total}]
      this.comparegoals = [...this.comparegoals, {name: resp2.response.team.name + " - marquer", value: resp2.response.goals.for.total.total ? resp2.response.goals.for.total.total : 0},
      {name: resp2.response.team.name + " - encaisser", value: resp2.response.goals.against.total.total ? resp2.response.goals.against.total.total : 0}];
    });
    /* this.rest.getTeamStats(this.team1).subscribe((resp: any) => {
      console.log(resp.response);
        
    })
    this.rest.getTeamStats(this.team2).subscribe((resp: any) => {
      
      console.log(this.comparegoals);
    }) */
  }

  getRanking() {
    this.rest.getRanking().subscribe((resp: any) => {
      this.ranking = resp.response[0].league.standings[0];
    })
  }

}
