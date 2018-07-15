import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Service
import { MovieService } from '../../shared/services/movie.service';

// Model
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

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
    this.resetForm();
  }

  private onCategorySubmit(categoryForm: NgForm) {
    if (categoryForm.value.$key == null) {
      this.movieService.addCategory(categoryForm.value);
    } else {
      this.movieService.updateCategory(categoryForm.value);
    }
    
  }

  /**
   * Cleans all form parameters
   * @param addForm 
   */
  private resetForm(addForm?: NgForm) {
    if (addForm != null) {
      addForm.reset();
      this.movieService.selectCategory = new Category();
    }
  }

  onEdit(category: Category) {
    this.movieService.selectCategory = Object.assign({}, category);
  }

  /**
   * Remove call function, it calls service to remove from database
   * @param  key
   */
  private onDelete($key: string) {
    this.movieService.removeCategory($key);
  }

}
