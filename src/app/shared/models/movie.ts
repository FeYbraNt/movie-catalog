import { Category } from "./category";
import { Picture } from "./picture";

export class Movie {
    $key: string;
    name: string;
    picture: Picture;
    category: Category;
}
