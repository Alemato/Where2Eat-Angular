import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menu = true;
  title = 'Where2Eat';

  show_hideMenu() {
    this.menu = !this.menu;
  }
}
