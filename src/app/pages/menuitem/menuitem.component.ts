import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/models/menu-item';

@Component({
  selector: 'app-menuitem',
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.css'],
})
export class MenuItemComponent implements OnInit {
  menuItem!: MenuItem;

  constructor(private router: Router) {
    this.menuItem =
      this.router.getCurrentNavigation()?.extras.state?.['menuItem'];
  }

  ngOnInit(): void {
    // sort menu sections by display order
    this.menuItem.menuSections.sort((a, b) => a.displayOrder - b.displayOrder);
    for (let menuSection of this.menuItem.menuSections) {
      menuSection.menuItems.sort((a, b) => a.displayOrder - b.displayOrder);
    }
  }
}
