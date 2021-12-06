export interface ProductoInterface {
    "code": number,
    "product": {
        "_keywords": Array<string>,
        "generic_name": string,
        "quantity": string,
        "packaging": string,
        "product_name": string,
        "brands": string,
        "categories": string,
        "ingredients_text_es": string,
        "origins_tags": Array<string>,
        "purchase_places": string,
        "image_front_small_url": string
    },
    "price": number,
    "price_f": string
}
