import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username = null;
  token = null;
  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.token = localStorage.getItem('token')
  } 

  logout() {
    localStorage.clear();
    window.location.href = 'http://localhost:4200';
  }

}
