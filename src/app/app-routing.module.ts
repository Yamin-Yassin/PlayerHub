import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    /* TAB NAVIGATION */
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    /* Finalize Registration */
    path: 'username',
    loadChildren: () =>
      import('./pages/username/username.module').then(
        (m) => m.UsernamePageModule
      ),
  },
  {
    /* Game Page */
    path: 'game-page/:id',
    loadChildren: () =>
      import('@pages/game/game.module').then((m) => m.GamePageModule),
  },
  {
    /* Write a Review Page */
    path: 'write-review/:gameID',
    loadChildren: () =>
      import('./pages/write-review/write-review.module').then(
        (m) => m.WriteReviewPageModule
      ),
  },
  {
    /* Comment Page */
    path: 'comment/:ID',
    loadChildren: () =>
      import('@pages/comment/comment.module').then((m) => m.CommentPageModule),
  },
  {
    /* Friends Profile Page != Current User Profile Page */
    path: 'profile/:ID',
    loadChildren: () =>
      import('./pages/user/user.module').then((m) => m.UserPageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
