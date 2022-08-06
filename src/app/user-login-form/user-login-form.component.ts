import { Component, OnInit, Input } from '@angular/core';
// brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userLoginData = { Username: "", Password: "" };


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  // sends form inputs for user login to backend via fetchApiData Service
  loginUser(): void {
    this.fetchApiData.userLogin(this.userLoginData).subscribe((result) => {
      this.dialogRef.close();  // close the modal on success
      console.log(result);
      // add token and username to local Storage
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", result.user.Username)
      this.snackBar.open(result, "OK", {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, "OK", {
        duration: 2000
      });
    });
  }

}
