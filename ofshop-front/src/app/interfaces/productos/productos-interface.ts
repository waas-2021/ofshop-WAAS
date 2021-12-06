export interface ProductosInterface {
    "count": number,
    "page": number,
    "page_size": number,
    "products": Array<
        {
            "code": number,
            "product_name": string,
            "quantity": string,
            "brands": string,
            "categories": string,
            "generic_name": string,
            "image_front_small_url": string
        }
    >
}
