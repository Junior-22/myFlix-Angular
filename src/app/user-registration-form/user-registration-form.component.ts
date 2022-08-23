import { Component, OnInit, Input } from '@angular/core';
// brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * sends form inputs for user registration to backend via fetchApiData Service
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here
      this.dialogRef.close();                            // This will close the modal on success
      console.log('line 32 result:', result);
      this.snackBar.open("successfully registered", "OK", {
        duration: 6000
      });
    }, (result) => {
      console.log('line 37 result: ', result);
      this.snackBar.open(result, "OK", {
        duration: 6000
      });
    });
    ;
  }

}
