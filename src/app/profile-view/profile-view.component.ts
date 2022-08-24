import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  user: any = {};
  movies: any[] = [];
  username: any = localStorage.getItem("user");
  fav: any = null;
  favoriteMovies: any[] = [];
  displayElement: boolean = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public router: Router
  ) { }

  /**
   * Initialize the component loading the data
   * @function ngOnInit
  */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * function to get user object AND user's favorites movies
   * @function getUser
   * @return user data in JSON format
   */
  getUser(): void {
    const user = localStorage.getItem("user");
    if (user) {
      this.fetchApiData.getUser().subscribe((resp: any) => {
        this.user = resp;
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
          this.movies = resp;
          this.movies.forEach((movie: any) => {
            if (this.user.FavouriteMovies.includes(movie._id)) {
              this.favoriteMovies.push(movie);
              this.displayElement = true;
            }
          })
        })
      })
    }
  }

  /**
   * opens the edit profile dialog from EditProfileComponent to allow user to edit their details
   */
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: "480px"
    })
  }

  /**
  * function to remove favorite from user's favorite movies
  * @function removeFavoriteMovie
  * @param id
  */
  removeFavMovie(id: string): void {
    console.log(id);
    console.log("movie removed");
    this.fetchApiData.removeFavoriteMovie(id).subscribe((res: any) => {
      this.snackbar.open("Successfully removed", "OK", {
        duration: 6000,
      });
      this.ngOnInit();
      window.location.reload();
      return this.fav;
    });
  }

  /**
   * deletes the user profile, redirects to welcome screen
   * @function deleteUser
   */
  deleteProfile(): void {
    if (confirm("Account cannot be restored once deleted")) {
      this.router.navigate(["welcome"]).then(() => {
        this.snackbar.open("Account successfully deleted", "OK", {
          duration: 6000
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }

}
