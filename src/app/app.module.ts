import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieComponent } from './movie-list/movie/movie.component';
import { CategoryComponent } from './movie-list/category/category.component';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

// Services
import { MovieService } from './shared/services/movie.service';

// Router
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/movie-list', pathMatch: 'full' },
  { path: 'movie-list', component: MovieListComponent },
  { path: 'category', component: CategoryComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MovieListComponent,
    MovieComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
