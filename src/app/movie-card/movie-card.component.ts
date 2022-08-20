import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DescriptionViewComponent } from '../description-view/description-view.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  // user: any[] = [];
  // currentUser: any = null;
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    // this.getUser();
    // this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openDirectorDialog(name: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name
      },
      // Assign dialog width
      width: '500px'
    });
  }

  openGenreDialog(name: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name
      },
      width: '500px'
    });
  }

  openDescriptionDialog(title: string, description: string): void {
    this.dialog.open(DescriptionViewComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '500px'
    });
  }

  // getFavoriteMovies(): void {
  //   this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
  //     this.favoriteMovies = resp;
  //     console.log(this.favoriteMovies);
  //     return this.favoriteMovies;
  //   });
  // }

  // getUser(): void {
  //   const username = localStorage.getItem("user");
  //   this.fetchApiData.getUser().subscribe((resp: any) => {
  //     this.currentUser = resp.Username;
  //     this.favoriteMovies = resp.favoriteMovies;
  //   })
  // }

  // checks if a movie is included in the user's list of favorite movies
  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id)
  }

  addToFavoriteMovies(id: string): void {
    console.log(id);
    console.log("movie added");
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  removeFromFavoriteMovies(id: string): void {
    console.log(id);
    console.log("movie removed");
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

}
