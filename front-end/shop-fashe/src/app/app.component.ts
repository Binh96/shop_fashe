import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop-fashe';

  onActivate(event) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
