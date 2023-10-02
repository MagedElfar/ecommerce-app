export class CreateCategoryDto {
    name: string
}

export class UpdateCategoryDto extends CreateCategoryDto { }

export class GetCategoryDTO {
    name?: string;
    page?: number;
    offset?: number
}