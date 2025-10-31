import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { MarkdownModule } from 'ngx-markdown';
import { authInterceptor } from './Core/Interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes)
    ,provideHttpClient(withInterceptors([authInterceptor]))
    ,importProvidersFrom(
      MarkdownModule.forRoot()   // ✅ only here!
    )
  ],
};
