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

  view: any[] = [700, 400];


   goal_team1 = [];
   goal_team2 = [];
   stats_team1 = [];
   stats_team2 = [];
   avg_goal_team1 = [];
   avg_goal_team2 = [];

  colorScheme = {
    domain: ['#779A79']
  };



  constructor(public route: ActivatedRoute, public rest: RestService) {
    this.team1 = this.route.snapshot.paramMap.get("team1");
    this.team2 = this.route.snapshot.paramMap.get("team2");
  }

  ngOnInit(): void {
    this.getDetailsTeam();
    this.getTeamStat();
  }

  getDetailsTeam() {
    this.rest.getHead(this.team1, this.team2).subscribe((resp: any) => {
      this.headtohead = resp.response;
      let cpt = 0;
      (resp.response).forEach(element => {
        if(cpt <= 7) {
        this.goal_team1 = [...this.goal_team1, {"name": "n"+cpt + " : "+element.teams.away.name + " - " + element.teams.home.name , "value": element.goals.away ? element.goals.away : 0}];
        }
        cpt++;
      });
    })
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

}
