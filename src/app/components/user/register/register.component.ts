import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister = { username: null, password: null }
  formActive = true;
  error = false;

  constructor(public rest: RestService) { }

  ngOnInit(): void {
  }

  setRegister() {
    this.rest.register(this.formRegister).subscribe((resp:any)=> {
      this.checkRegister(resp);
    })
  }

  checkRegister(resp) {
    if(resp.result == "added") {
      this.formActive = !this.formActive 
      this.error = false;
    } else {
      this.error = true;
    }
  }

}
