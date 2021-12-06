import { ProductoInterface } from "../productos/producto-interface";

export interface CarritoInterface {
    "quantity": number,
    "product": ProductoInterface,
    "subtotal": number
}
