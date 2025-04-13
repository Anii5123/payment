import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private readonly router: Router) {}

  gotoMenu() {
    // You can add logic here to persist the order
    this.router.navigate(['/menu']);
  }
}
