import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './routes/app.routes';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    // Router
    provideRouter(routes),
    
    // Animations
    provideAnimations(),
    
    // HTTP Client with fetch API
    provideHttpClient(withFetch()),
    
    // Zone optimizations
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Hydration for server-side rendering (SSR)
    provideClientHydration(),

    MessageService 
  ],
};
