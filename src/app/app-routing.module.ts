import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) }, { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)}, { path: 'pages', loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
