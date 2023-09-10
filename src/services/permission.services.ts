import { CreatePermissionDto } from "../dto/permission.dto";
import PermissionRepository from "../repositories/permission.repository";
import { PermissionAttributes } from '../models/permission.model';
import { BadRequestError } from "../utility/errors";

export interface IPermissionServices {
    create(createPermissionDto: CreatePermissionDto): Promise<PermissionAttributes>;
    findById(id: number): Promise<PermissionAttributes | null>
    findOne(data: Partial<PermissionAttributes>): Promise<PermissionAttributes | null>;
}

export default class PermissionServices implements IPermissionServices {

    private readonly permissionRepository: PermissionRepository;

    constructor(permissionRepository: PermissionRepository) {
        this.permissionRepository = permissionRepository
    }

    async create(createPermissionDto: CreatePermissionDto): Promise<PermissionAttributes> {
        try {
            let permission;

            permission = await this.findOne(createPermissionDto);

            if (permission) throw new BadRequestError("permission is already exists");

            permission = await this.permissionRepository.create({ name: createPermissionDto.name })
            return permission;
        } catch (error) {
            throw error
        }
    }

    async findById(id: number): Promise<PermissionAttributes | null> {
        try {

            const permission = await this.permissionRepository.findById(id)

            if (!permission) return null

            return permission;
        } catch (error) {
            throw error
        }
    }

    async findOne(data: Partial<PermissionAttributes>): Promise<PermissionAttributes | null> {
        try {

            const permission = await this.permissionRepository.findOne(data)

            if (!permission) return null;

            return permission

        } catch (error) {
            throw error
        }
    }
}