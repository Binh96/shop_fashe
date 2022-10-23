import { Categories } from "./categories";

export interface Product {
    id: number,
    nameProduct: string,
    quantity: number,
    price: number,
    color: string,
    status: string,
    madeIn: string,
    categories: Categories,
    brand: string,
    detail: string,
    desc: string,
    img: string
}