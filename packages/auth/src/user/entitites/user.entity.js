"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var graphql_1 = require("@nestjs/graphql");
var typeorm_1 = require("typeorm");
var role_entity_1 = require("../../role-right/entities/role.entity");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        graphql_1.Field(function () { return graphql_1.Int; })
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column({ name: 'user_name' }),
        graphql_1.Field()
    ], User.prototype, "userName");
    __decorate([
        typeorm_1.Column({ name: 'first_name' }),
        graphql_1.Field()
    ], User.prototype, "firstName");
    __decorate([
        typeorm_1.Column({ name: 'last_name' }),
        graphql_1.Field()
    ], User.prototype, "lastName");
    __decorate([
        typeorm_1.Column({ name: 'refresh_token', nullable: true }),
        graphql_1.Field()
    ], User.prototype, "refreshToken");
    __decorate([
        typeorm_1.ManyToMany(function () { return role_entity_1.Role; }, function (role) { return role.users; }),
        graphql_1.Field(function () { return [role_entity_1.Role]; }, { nullable: true }),
        typeorm_1.JoinTable({
            name: 'user_role',
            joinColumn: {
                name: 'user_id',
                referencedColumnName: 'id'
            },
            inverseJoinColumn: {
                name: 'role_id',
                referencedColumnName: 'id'
            }
        })
    ], User.prototype, "roles");
    User = __decorate([
        typeorm_1.Entity({ schema: 'auth' }),
        graphql_1.ObjectType()
    ], User);
    return User;
}(typeorm_1.BaseEntity));
exports.User = User;
