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
import { CreateRightInput } from './dto/create-right.input';
import { UpdateRightInput } from './dto/update-right.input';
import { Right } from './entities/right.entity';

@Resolver(() => Right)
export class RightResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly rightService: RightService,
  ) {}

  @Mutation(() => Right, { name: 'createRight' })
  create(@Args('createRightInput') createRightInput: CreateRightInput) {
    return this.rightService.create(createRightInput);
  }

  @Query(() => Right, { name: 'right' })
  findOne(@Args('id', { nullable: false }) id: number) {
    return this.rightService.findOne(id);
  }

  @Query(() => [Right], { name: 'rights' })
  findAll(@Args('name', { nullable: true }) name: string) {
    return this.rightService.findAll(name);
  }

  @Mutation(() => Right, { name: 'updateRight' })
  update(@Args('updateRightInput') updateRightInput: UpdateRightInput) {
    return this.rightService.update(updateRightInput);
  }

  @Mutation(() => Int, { name: 'removeRight' })
  remove(@Args('id') id: number) {
    return this.rightService.remove(id);
  }

  @Mutation(() => String, { name: 'assignRightToRole' })
  async assignRightToRole(
    @Args('rightName') rightName: string,
    @Args('roleName') roleName: string,
  ) {
    return await this.rightService.assignRightToRole(rightName, roleName);
  }

  @Mutation(() => String, { name: 'revokeRightFromRole' })
  async revokeRightFromRole(
    @Args('rightName') rightName: string,
    @Args('roleName') roleName: string,
  ) {
    return await this.rightService.revokeRightFromRole(rightName, roleName);
  }

  @ResolveField()
  async roles(@Parent() right) {
    const { id } = right;
    let foundRoles = await this.roleService.findRolesByRight(id);
    return foundRoles;
  }
}
