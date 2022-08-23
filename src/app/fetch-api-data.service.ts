import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = "https://movies2022app.herokuapp.com/";

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  /**
   * calls API endpoint to register a new user
   * @param userData
   * @returns a new user object in JSON format
   */
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http
      .post(apiUrl + "users/register", userData)
      .pipe(
        retry(3),                  // Retry up to 3 times before failing
        catchError(this.handleError)
      );
  }

  /**
  * calls API endpoint to login an existing user
  * @param userLoginData 
  * @returns data of the user in JSON format
  */
  public userLogin(userLoginData: any): Observable<any> {
    console.log('usercredentials input: ', userLoginData);

    // convert login data to json because of API (due to recent problem with Angular 14)
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };

    let formData = new URLSearchParams();

    //var formData: any = new FormData();
    formData.set('Username', userLoginData.Username);
    formData.set('Password', userLoginData.Password);

    return this.http
      .post(apiUrl + "login", formData, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * calls API endpoint to get data on all movies
   * @returns array of all movies in JSON format
   */
  getAllMovies(): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "movies", {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
  * calls API endpoint to get data on a single movie specified by its title
  * @param title 
  * @returns JSON object holding movie data
  */
  getSingleMovie(title: any): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * calls API endpoint to get data on a director
   * @param name 
   * @returns JSON object holding director data
   */
  getDirector(name: any): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + `movies/director/${name}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * calls API endpoint to get data on a genre
   * @param name 
   * @returns JSON object holding genre data
   */
  getGenre(name: any): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + `movies/genre/${name}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * calls API endpoint to get data on a single user
   * @returns JSON object holding data about the requested user
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem("token");
    // Get Username stored in local storage
    const username = localStorage.getItem("user");
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * calls API endpoint to add a movie to the user's list of favorite movies
   * @param movieID 
   * @returns JSON object holding data about the updated user
   */
  addFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http
      .post(apiUrl + `users/${username}/movies/${movieID}`, null, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * calls API endpoint to delete a movie from the user's list of favorite movies
   * @param movieID 
   * @returns JSON object holding data about the updated user
   */
  removeFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * calls API endpoint to allow user to update their user information
   * @param updateDetails 
   * @returns JSON object holding data about the updated user
   */
  editUser(updateDetails: any): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http
      .put(apiUrl + `users/${username}`, updateDetails, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * calls API endpoint to delete an existing user
   * @returns	A success message indicating that the profile was successfully deleted.
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * extracts response data from HTTP response
   * @param res 
   * @returns response body or empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * handles errors
   * @param error 
   * @returns error message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occurred:", error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      "Something happened, please try again later:" + error
    );
  }

}

