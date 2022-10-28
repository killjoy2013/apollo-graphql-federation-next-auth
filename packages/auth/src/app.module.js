"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var apollo_1 = require("@nestjs/apollo");
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var graphql_1 = require("@nestjs/graphql");
var typeorm_1 = require("@nestjs/typeorm");
var path_1 = require("path");
var auth_module_1 = require("./auth/auth.module");
var role_right_module_1 = require("./role-right/role-right.module");
var user_module_1 = require("./user/user.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({ isGlobal: true }),
                graphql_1.GraphQLModule.forRoot({
                    driver: apollo_1.ApolloFederationDriver,
                    autoSchemaFile: {
                        federation: 2,
                        path: path_1.join(process.cwd(), 'auth.schema.graphql')
                    },
                    context: function (_a) {
                        var req = _a.req;
                        var user = req.headers.user ? JSON.parse(req.headers.user) : null;
                        return { user: user };
                    }
                }),
                typeorm_1.TypeOrmModule.forRootAsync({
                    useFactory: function () { return ({
                        type: 'postgres',
                        url: process.env.DATABASE_URL,
                        //entities: [Role, Right, User],
                        autoLoadEntities: true,
                        synchronize: false,
                        logging: true
                    }); }
                }),
                role_right_module_1.RoleRightModule,
                auth_module_1.AuthModule,
                user_module_1.UserModule,
            ],
            controllers: [],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
