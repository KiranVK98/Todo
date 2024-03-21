import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module'; // Replace with actual path to AppModule


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));