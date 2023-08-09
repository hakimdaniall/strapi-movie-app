import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MovieviewComponent } from './movieview/movieview.component';
import { MovielistComponent } from './movielist/movielist.component';
import { MoviecardComponent } from './moviecard/moviecard.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { EditmovieComponent } from './editmovie/editmovie.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: "",
    component: MovielistComponent,
  },
  {
    path: "movie/:id",
    component: MovieviewComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MovieviewComponent,
    MovielistComponent,
    MoviecardComponent,
    AddmovieComponent,
    EditmovieComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
