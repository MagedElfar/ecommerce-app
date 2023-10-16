export class CreateProductDto {
    name: string;
    sku: string;
    description: string;
    price: number;
    userId: number;
    parentId?: number
}