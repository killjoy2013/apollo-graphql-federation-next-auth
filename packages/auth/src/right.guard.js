"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RightGuard = void 0;
var common_1 = require("@nestjs/common");
var RightGuard = /** @class */ (function () {
    function RightGuard() {
    }
    RightGuard.prototype.canActivate = function (context) {
        // const user = {
        //   name: 'murat',
        //   roles: ['ordinary'],
        // };
        // const requiredRole = 'admin';
        // if (!user.roles.includes(requiredRole)) {
        //   return false;
        // }
        return true;
    };
    RightGuard = __decorate([
        common_1.Injectable()
    ], RightGuard);
    return RightGuard;
}());
exports.RightGuard = RightGuard;
