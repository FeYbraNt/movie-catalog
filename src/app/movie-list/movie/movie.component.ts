import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Service
import { MovieService } from '../../shared/services/movie.service';

// Model
import { Movie } from '../../shared/models/movie';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  selectFileImage: File = null;
  categoryList: Category[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getCategories()
      .snapshotChanges()
      .subscribe(item => {
        this.categoryList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.categoryList.push(x as Category);
        });
    });
    this.movieService.getMovies(); 
    this.resetForm(); 
  }

  /**
   * Upload a movie
   * @param addForm 
   */
  private onMovieSubmit(addForm: NgForm) {
    if (this.selectFileImage !== null) {
      this.movieService.addMovie(addForm.value);
      this.resetForm(addForm);
    } else {
      alert("You have to upload an image picture first.");
    }
  }

  /**
   * Cleans all form parameters
   * @param addForm 
   */
  private resetForm(addForm?: NgForm) {
    if (addForm != null) {
      addForm.reset();
      this.selectFileImage = null;
      this.movieService.selectMovie = new Movie();
    }
  }

  /**
   * Takes reference of the chosen file
   * @param event 
   */
  onImageSelected(event) {
    this.selectFileImage = event.target.files[0];
  }

  /**
   * Upload image to database
   */
  uploadPicture() {
    if (this.selectFileImage !== null) {
      this.movieService.pushImagePicture(this.selectFileImage);
    } else {
      alert("You have to choose an image first.");
    }
  }

}
