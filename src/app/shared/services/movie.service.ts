import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Movie } from '../models/movie';
import { Picture } from '../models/picture';
import { Category } from '../models/category';

@Injectable()
export class MovieService {

  // List with all movies data
  private moviesList: AngularFireList<any>;
  // List with all categories data
  private categoryList: AngularFireList<Category>;
  // Movie object selected (by default empty)
  selectMovie: Movie = new Movie();
  // Picture object selected
  selectPicture: Picture = null;
  // Category object selected
  selectCategory: Category = new Category();

  /**
   * Load firebase database
   * @param db 
   */
  constructor(private db: AngularFireDatabase) { }

  /**
   * Receives all data list from database
   */
  getMovies() {
    this.moviesList = this.db.list('movies');
    return this.moviesList;
  }

  /**
   * Inserts a movie into database
   * @param movie 
   */
  addMovie(movie: Movie) {
    this.moviesList.push({
        name: movie.name,
        picture: this.selectPicture.url,
        category: movie.category
    });
    this.selectPicture = null; // Clean selected picture
  }

  /**
   * Updates the movie based on his key into database
   * @param movie 
   */
  updateMovie(movie: Movie) {
    this.moviesList.update(movie.$key, {
      name: movie.name,
      picture: movie.picture,
      category: movie.category
    })
  }

  /**
   * Removes the movie based on his key from database
   * @param $key
   */
  removeMovie($key: string) {
    this.moviesList.remove($key);
  }

  /**
   * Uploads picture image
   * @param image 
   */
  pushImagePicture(image: File) {
    this.selectPicture = new Picture(image);
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`/uploads/${image.name}`).put(image);
    
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) => { 
        console.log("Loading in progress..");
      },
      (error) => { // Fail
        console.log(error);
      },
      () => { // Success
       uploadTask.snapshot.ref.getDownloadURL().then(url => {
        this.selectPicture.url = url;
        console.log("Success! You're image has been loaded."); 
       });
       this.selectPicture.name = image.name;
      }
    );
  }

  /**
   * Receives all data list from database
   */
  getCategories() {
    return this.categoryList = this.db.list('categories');;
  }

  /**
   * Add a category
   * @param category 
   */
  addCategory(category: Category) {
    this.categoryList.push(category);
  }

  /**
   * Updates the category values
   * @param category 
   */
  updateCategory(category: Category) {
    this.categoryList.update(category.$key, {
      name: category.name
    });
  }

  /**
   * Removes the category based on his key from database
   * @param $key
   */
  removeCategory($key: string) {
    this.categoryList.remove($key);
  }

}
