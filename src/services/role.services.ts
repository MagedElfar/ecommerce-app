import { BadRequestError, NotFoundError } from "../utility/errors";
import RoleRepository from '../repositories/role.repository';
import { RoleAttributes } from "../models/role.model";
import { CreateRoleDto } from "../dto/role.dto";

export interface IRoleServices {
    create(createRoleDto: CreateRoleDto): Promise<RoleAttributes>;
    findById(id: number): Promise<RoleAttributes | null>
    findOne(data: Partial<RoleAttributes>): Promise<RoleAttributes | null>;
    findMany(): Promise<RoleAttributes[]>
    // deleteOne(id: number): Promise<void>;
}

export default class RoleServices implements IRoleServices {

    private readonly roleRepository: RoleRepository;

    constructor(roleRepository: RoleRepository) {
        this.roleRepository = roleRepository
    }

    async create(createRoleDto: CreateRoleDto): Promise<RoleAttributes> {
        try {
            let role;

            role = await this.findOne(createRoleDto);

            if (role) throw new BadRequestError("Role is already exists")

            role = await this.roleRepository.create({ name: createRoleDto.name })

            return role
        } catch (error) {
            throw error
        }
    }

    async findById(id: number): Promise<RoleAttributes | null> {
        try {
            const role = await this.roleRepository.findById(id)

            if (!role) return null

            return role;
        } catch (error) {
            throw error
        }
    }

    async findOne(data: Partial<RoleAttributes>): Promise<RoleAttributes | null> {
        try {

            const role = await this.roleRepository.findOne(data)

            if (!role) return null;

            return role

        } catch (error) {
            throw error
        }
    }

    async findMany(): Promise<RoleAttributes[]> {
        try {
            const roles = await this.roleRepository.findMany()
            return roles
        } catch (error) {
            throw error
        }
    }
    // async deleteOne(id: number): Promise<void> {
    //     try {
    //         const isDeleted = await this.refreshTokenRepository.delete({ id })

    //         if (isDeleted === 0) throw new NotFoundError("record not exist")

    //         return;
    //     } catch (error) {
    //         throw error
    //     }
    // }

}