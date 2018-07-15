import { Component, OnInit } from '@angular/core';

// Service
import { MovieService } from '../shared/services/movie.service';

// Models
import { Movie } from '../shared/models/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movieList: Movie[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getMovies()
      .snapshotChanges()
      .subscribe(item => {
        this.movieList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.movieList.push(x as Movie);
        });
      });
  }

  onEdit(movie: Movie) {
    this.movieService.selectMovie = movie;
  }

  /**
   * Remove call function, it calls service to remove from database
   * @param  key
   */
  onDelete($key) {
    this.movieService.removeMovie($key);
  }

}
