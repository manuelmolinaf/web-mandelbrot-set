import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './components/main-view/main-view.component';

const routes: Routes = [
  {path: '', redirectTo: 'pages/main-view', pathMatch: 'full' },
  {path: 'pages/main-view', component: MainViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
