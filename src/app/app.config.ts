import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {  HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import {  provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loaderInterceptor } from './loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideToastr(),provideAnimations(),provideRouter(routes,withHashLocation(),withInMemoryScrolling({scrollPositionRestoration:'top'})), provideClientHydration(),importProvidersFrom(HttpClientModule,NgxSpinnerModule),provideHttpClient(withInterceptors([loaderInterceptor]))],
};
