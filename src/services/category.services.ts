import { Op } from 'sequelize';
import { CreateCategoryDto, GetCategoryDTO } from './../dto/category.dto';
import { BadRequestError } from "../utility/errors";
import CategoryRepository from '../repositories/category.repository';
import { CategoryAttributes } from '../models/category.model';

export interface ICategoryServices {
    create(createCategoryDto: CreateCategoryDto): Promise<CategoryAttributes>;
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
}