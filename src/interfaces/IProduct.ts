
import { ICategory } from "./ICategory";

export interface IProduct {
    id: string;
    name: string;
    price: number;
    discount: number;
    description: string;
    rating: number;
    image: string;
    category: ICategory;
}
