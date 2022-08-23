import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-view',
  templateUrl: './navbar-view.component.html',
  styleUrls: ['./navbar-view.component.scss']
})
export class NavbarViewComponent implements OnInit {

  constructor(
    public router: Router
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
  * logs out user, clear local storage to reset token and user
  */
  logout(): void {
    localStorage.clear();
    this.router.navigate(["welcome"]);
  }

}
