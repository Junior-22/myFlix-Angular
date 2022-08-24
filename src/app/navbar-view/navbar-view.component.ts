import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar-view',
  templateUrl: './navbar-view.component.html',
  styleUrls: ['./navbar-view.component.scss']
})
export class NavbarViewComponent implements OnInit {

  constructor(
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * navigate to movies (main) page
   */
  goToMovies(): void {
    this.router.navigate(["movies"]);
  }

  /**
   * navigate to user profile
   */
  goToProfile(): void {
    this.router.navigate(["profile"]);
  }

  /**
  * logs out user 
  * clear local storage & route to welcome page
  */
  logout(): void {
    localStorage.clear();
    this.snackBar.open("Successfully logged out", "OK", {
      duration: 6000
    });
    this.router.navigate(["welcome"]);
  }

}
