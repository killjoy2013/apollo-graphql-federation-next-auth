"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleRightModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var auth_module_1 = require("../auth/auth.module");
var right_entity_1 = require("./entities/right.entity");
var role_entity_1 = require("./entities/role.entity");
var right_resolver_1 = require("./right.resolver");
var right_service_1 = require("./right.service");
var role_resolver_1 = require("./role.resolver");
var role_service_1 = require("./role.service");
var RoleRightModule = /** @class */ (function () {
    function RoleRightModule() {
    }
    RoleRightModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([role_entity_1.Role, right_entity_1.Right]), auth_module_1.AuthModule],
            providers: [role_resolver_1.RoleResolver, role_service_1.RoleService, right_resolver_1.RightResolver, right_service_1.RightService],
            exports: [],
            controllers: []
        })
    ], RoleRightModule);
    return RoleRightModule;
}());
exports.RoleRightModule = RoleRightModule;
