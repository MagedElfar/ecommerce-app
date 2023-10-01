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
    findMany(): Promise<any>;
    remove(id: number): Promise<number>
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


    async findMany(): Promise<any> {
        try {
            const rolePermission = await this.rolePermissionRepository.findMany();

            const data = rolePermission.reduce((obj: any, item: RolePermissionAttributes) => {
                if (!obj[item.role?.name!]) {
                    obj[item.role?.name!] = [item]
                } else {
                    obj[item.role?.name!] = [...obj[item.role?.name!], item]
                }

                return obj
            }, {})

            return data;
        } catch (error) {
            throw error
        }
    }

    async remove(id: number): Promise<number> {
        try {
            const isDeleted = await this.rolePermissionRepository.delete(id);

            return isDeleted
        } catch (error) {
            throw error
        }
    }
}