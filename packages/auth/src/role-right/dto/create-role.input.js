"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateRoleInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var CreateRoleInput = /** @class */ (function () {
    function CreateRoleInput() {
    }
    __decorate([
        graphql_1.Field({ nullable: false })
    ], CreateRoleInput.prototype, "name");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], CreateRoleInput.prototype, "description");
    CreateRoleInput = __decorate([
        graphql_1.InputType()
    ], CreateRoleInput);
    return CreateRoleInput;
}());
exports.CreateRoleInput = CreateRoleInput;
