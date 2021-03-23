import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isLogged: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  handleLogout(): void {
    this.authService.logOut();
    this.isLogged = false;
    this.router.navigate(['/']);
  }
}
