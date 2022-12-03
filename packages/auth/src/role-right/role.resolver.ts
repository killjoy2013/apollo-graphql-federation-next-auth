import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { RoleService } from './role.service';
import { RightService } from './right.service';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';

@Resolver(() => Role)
export class RoleResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly rightService: RightService,
  ) {}

  @Mutation(() => Role, { name: 'createRole' })
  create(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.roleService.create(createRoleInput);
  }

  @Query(() => Role, { name: 'role' })
  findOne(@Args('id', { nullable: false }) id: number) {
    return this.roleService.findOne(id);
  }

  @Query(() => [Role], { name: 'roles' })
  findAll(@Args('name', { nullable: true }) name: string) {
    return this.roleService.findAll(name);
  }

  @Mutation(() => Role, { name: 'updateRole' })
  update(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.roleService.update(updateRoleInput);
  }

  @Mutation(() => Int, { name: 'removeRole' })
  remove(@Args('id') id: number) {
    return this.roleService.remove(id);
  }

  @Mutation(() => String, { name: 'assignRoleToUser' })
  async assignRoleToUser(roleName: string, username: string) {
    this.roleService.assignRoleToUser(roleName, username);
  }

  @Mutation(() => String, { name: 'revokeRoleFromUser' })
  async revokeRoleFromUser(roleName: string, username: string) {
    this.roleService.revokeRoleFromUser(roleName, username);
  }

  @Mutation(() => String, { name: 'revokeAllRolesFromUser' })
  async revokeAllRolesFromUser(username: string) {
    this.roleService.revokeAllRolesFromUser(username);
  }

  @ResolveField()
  async rights(@Parent() role) {
    const { id } = role;
    const foundRights = await this.rightService.findByRole(id);
    return foundRights;
  }
}
