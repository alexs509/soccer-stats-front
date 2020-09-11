import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error = false;
  formLogin = { username: null, password: null }

  constructor(public rest: RestService) { }

  ngOnInit(): void {
  }

  setLogin() {
    console.log(this.formLogin);
    this.rest.login(this.formLogin).subscribe((resp:any)=> {
      console.log(resp);
      this.checkLogin(resp);
    })
  }

  checkLogin(resp) {
    if(resp.result != "error") {
      localStorage.setItem('token',resp.result);
      localStorage.setItem('username', this.formLogin.username);
      this.error = false;
      window.location.href = 'http://localhost:4200'
    } else {
      this.error = true;
    }
  }


}
