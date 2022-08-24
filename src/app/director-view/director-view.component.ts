import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {

  /**
   * Injects data from the MovieCard component using the MAT_DIALOG_DATA injection token.
   * The data can be accessed to populate the view.
   * @param data
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string
    }
  ) { }

  ngOnInit(): void {
  }

}
