import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {

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
