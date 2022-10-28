"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UserResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var user_entity_1 = require("./entitites/user.entity");
var UserResolver = /** @class */ (function () {
    function UserResolver(userService) {
        this.userService = userService;
    }
    UserResolver.prototype.create = function (createUserInput) {
        return this.userService.create(createUserInput);
    };
    UserResolver.prototype.findOne = function (id) {
        return this.userService.findOne(id);
    };
    UserResolver.prototype.findAll = function (userName) {
        return this.userService.findAll(userName);
    };
    UserResolver.prototype.update = function (updateUserInput) {
        return this.userService.update(updateUserInput);
    };
    UserResolver.prototype.remove = function (id) {
        return this.userService.remove(id);
    };
    __decorate([
        graphql_1.Mutation(function () { return user_entity_1.User; }, { name: 'createUser' }),
        __param(0, graphql_1.Args('createUserInput'))
    ], UserResolver.prototype, "create");
    __decorate([
        graphql_1.Query(function () { return user_entity_1.User; }, { name: 'user' }),
        __param(0, graphql_1.Args('id', { nullable: false }))
    ], UserResolver.prototype, "findOne");
    __decorate([
        graphql_1.Query(function () { return [user_entity_1.User]; }, { name: 'users' }),
        __param(0, graphql_1.Args('userName', { nullable: true }))
    ], UserResolver.prototype, "findAll");
    __decorate([
        graphql_1.Mutation(function () { return user_entity_1.User; }, { name: 'updateUser' }),
        __param(0, graphql_1.Args('updateUserInput'))
    ], UserResolver.prototype, "update");
    __decorate([
        graphql_1.Mutation(function () { return graphql_1.Int; }, { name: 'removeUser' }),
        __param(0, graphql_1.Args('id'))
    ], UserResolver.prototype, "remove");
    UserResolver = __decorate([
        graphql_1.Resolver(function () { return user_entity_1.User; })
    ], UserResolver);
    return UserResolver;
}());
exports.UserResolver = UserResolver;
