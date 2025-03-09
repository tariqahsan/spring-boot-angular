import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false // Add this line
})
export class AppComponent {
  title = 'angular-material-form';
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()] // Add this line
}).catch(err => console.error(err));
