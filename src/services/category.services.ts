import { Op } from 'sequelize';
import { CreateCategoryDto, GetCategoryDTO, UpdateCategoryDto } from './../dto/category.dto';
import { BadRequestError } from "../utility/errors";
import CategoryRepository from '../repositories/category.repository';
import { CategoryAttributes } from '../models/category.model';

export interface ICategoryServices {
    create(createCategoryDto: CreateCategoryDto): Promise<CategoryAttributes>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryAttributes | null>;
    delete(id: number): Promise<void>;
    findOne(data: Partial<CategoryAttributes>): Promise<CategoryAttributes | null>;
    findMany(getCategoryDTO: GetCategoryDTO): Promise<{
        count: number,
        data: CategoryAttributes[]
    }>
}

export default class CategoryServices implements ICategoryServices {

    private readonly categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<CategoryAttributes> {
        try {
            let category;

            category = await this.findOne(createCategoryDto);

            if (category) throw new BadRequestError("category is already exists");

            category = await this.categoryRepository.create(createCategoryDto)
            return category;
        } catch (error) {
            throw error
        }
    }

    // async findById(id: number): Promise<PermissionAttributes | null> {
    //     try {

    //         const permission = await this.permissionRepository.findById(id)

    //         if (!permission) return null

    //         return permission;
    //     } catch (error) {
    //         throw error
    //     }
    // }

    async findOne(data: Partial<CategoryAttributes>): Promise<CategoryAttributes | null> {
        try {

            const category = await this.categoryRepository.findOne(data)

            if (!category) return null;

            return category

        } catch (error) {
            throw error
        }
    }

    async findMany(getCategoryDTO: GetCategoryDTO): Promise<{
        count: number,
        data: CategoryAttributes[]
    }> {
        try {
            const categories = await this.categoryRepository.findMany({
                ...getCategoryDTO,
                where: {
                    name: {
                        [Op.like]: `%${getCategoryDTO?.name || ""}%`
                    }
                }
            })
            return categories
        } catch (error) {
            throw error
        }
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryAttributes | null> {
        try {

            const category = await this.findOne({ name: updateCategoryDto.name });

            if (category && category?.id !== id) throw new BadRequestError("category name can't be duplicate")

            return await this.categoryRepository.update(id, updateCategoryDto);

        } catch (error) {
            throw error
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const isDeleted = await this.categoryRepository.delete(id)

            if (!isDeleted) throw new BadRequestError("record not found");

            return;
        } catch (error) {
            throw error
        }
    }
}