import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  themes = ['theme-light', 'theme-dark', 'theme-purple'];
  currentTheme = 'theme-dark';

  onThemeChange(selectedTheme: string): void {
    this.currentTheme = selectedTheme;
  }
}
