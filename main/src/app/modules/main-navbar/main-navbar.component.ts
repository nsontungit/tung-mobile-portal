import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuConfig } from 'src/app/configs/menu-config';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  subMenuConfig: MenuConfig[] = [
    { label: 'Laptops', path: '/management/laptops' },
    { label: 'Mobiles', path: '/management/mobiles' },
  ];


}
