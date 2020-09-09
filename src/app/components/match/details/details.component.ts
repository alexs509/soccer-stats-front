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
  constructor(public route: ActivatedRoute, public rest: RestService) {
    this.team1 = this.route.snapshot.paramMap.get("team1");
    this.team2 = this.route.snapshot.paramMap.get("team2");
  }

  ngOnInit(): void {
    this.getDetailsTeam();
  }

  getDetailsTeam() {
    this.rest.getHead(this.team1, this.team2).subscribe((resp: any) => {
      console.log(resp);
    })
  }

}
