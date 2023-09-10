import { CreateRolePermissionDto } from './../dto/rolePermission.dto';
import { BadRequestError, NotFoundError } from "../utility/errors";
import { RolePermissionAttributes } from "../models/rolePermission.model";
import RolePermissionRepository from '../repositories/rolePermission.repository';
import { IRoleServices } from './role.services';
import { IPermissionServices } from './permission.services';

export interface IRolePermissionServices {
    create(createRolePermissionDto: CreateRolePermissionDto): Promise<RolePermissionAttributes>;
    // findById(id: number): Promise<RoleAttributes | null>
    findOne(data: Partial<RolePermissionAttributes>): Promise<RolePermissionAttributes | null>;
    // deleteOne(id: number): Promise<void>;
}

export default class RolePermissionServices implements IRolePermissionServices {

    private readonly rolePermissionRepository: RolePermissionRepository;
    private readonly roleServices: IRoleServices;
    private readonly permissionServices: IPermissionServices


    constructor(
        rolePermissionRepository: RolePermissionRepository,
        roleServices: IRoleServices,
        permissionServices: IPermissionServices
    ) {
        this.rolePermissionRepository = rolePermissionRepository;
        this.roleServices = roleServices;
        this.permissionServices = permissionServices
    }

    async create(createRolePermissionDto: CreateRolePermissionDto): Promise<RolePermissionAttributes> {
        try {

            const role = await this.roleServices.findById(createRolePermissionDto.roleId);

            if (!role) throw new NotFoundError("Role is not found")

            const permission = await this.permissionServices.findById(createRolePermissionDto.permissionId);

            if (!permission) throw new NotFoundError("Permission is not found")

            let rolePermission;

            rolePermission = await this.findOne(createRolePermissionDto)

            if (rolePermission) throw new BadRequestError("Role is already has this permission")

            rolePermission = await this.rolePermissionRepository.create(createRolePermissionDto)

            return {
                ...rolePermission,
                role,
                permission
            }
        } catch (error) {
            throw error
        }
    }

    async findOne(data: Partial<RolePermissionAttributes>): Promise<RolePermissionAttributes | null> {
        try {
            const rolePermission = await this.rolePermissionRepository.findOne(data)

            if (!rolePermission) return null;

            return rolePermission
        } catch (error) {
            throw error
        }
    }


    // async findById(id: number): Promise<RoleAttributes | null> {
    //     try {
    //         const role = await this.roleRepository.findById(id)

    //         if (!role) return null

    //         return role;
    //     } catch (error) {
    //         throw error
    //     }
    // }

    // async findOne(data: Partial<RefreshTokenAttributes>): Promise<RefreshTokenAttributes | null> {
    //     try {

    //         const refreshToken = await this.refreshTokenRepository.findOne(data)

    //         if (!refreshToken) return null;

    //         return refreshToken

    //     } catch (error) {
    //         throw error
    //     }
    // }


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