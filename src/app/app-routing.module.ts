import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherStatusComponent } from './weather-status/weather-status.component';

const routes: Routes = [
  {
  path: 'weatherStatus',
  component: WeatherStatusComponent
  },
  { path: '', redirectTo: 'weatherStatus', pathMatch: 'full' },
  { path: '**', redirectTo: 'weatherStatus' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
