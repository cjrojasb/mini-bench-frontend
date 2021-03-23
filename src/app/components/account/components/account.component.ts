import { Component, OnInit } from '@angular/core';
import { LINKS } from '../../../shared/account/account-links.js';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  navLinks: any[] = LINKS;

  constructor() {}

  ngOnInit(): void {}
}
