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
exports.Role = void 0;
var graphql_1 = require("@nestjs/graphql");
var user_entity_1 = require("../../user/entitites/user.entity");
var typeorm_1 = require("typeorm");
var right_entity_1 = require("./right.entity");
var Role = /** @class */ (function (_super) {
    __extends(Role, _super);
    function Role() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        graphql_1.Field(function () { return graphql_1.Int; })
    ], Role.prototype, "id");
    __decorate([
        typeorm_1.Column(),
        graphql_1.Field()
    ], Role.prototype, "name");
    __decorate([
        typeorm_1.Column({ nullable: true }),
        graphql_1.Field()
    ], Role.prototype, "description");
    __decorate([
        typeorm_1.ManyToMany(function () { return right_entity_1.Right; }, function (right) { return right.roles; }),
        graphql_1.Field(function () { return [right_entity_1.Right]; }, { nullable: true }),
        typeorm_1.JoinTable({
            name: 'role_right',
            joinColumn: {
                name: 'role_id',
                referencedColumnName: 'id'
            },
            inverseJoinColumn: {
                name: 'right_id',
                referencedColumnName: 'id'
            }
        })
    ], Role.prototype, "rights");
    __decorate([
        typeorm_1.ManyToMany(function () { return user_entity_1.User; }, function (user) { return user.roles; }),
        graphql_1.Field(function () { return [user_entity_1.User]; }, { nullable: true })
    ], Role.prototype, "users");
    Role = __decorate([
        typeorm_1.Entity({ schema: 'auth' }),
        graphql_1.ObjectType()
    ], Role);
    return Role;
}(typeorm_1.BaseEntity));
exports.Role = Role;
