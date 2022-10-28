"use strict";
exports.__esModule = true;
exports.GetUser = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
exports.GetUser = common_1.createParamDecorator(function (data, context) {
    var fieldName = context.getHandler().name;
    console.log({ fieldName: fieldName });
    var ctx = graphql_1.GqlExecutionContext.create(context).getContext();
    var user = ctx.user;
    console.log({ user: user });
    var rights = user.rights;
    console.log({ rights: rights });
    if (!rights.includes(fieldName)) {
        throw new common_1.UnauthorizedException("You must have " + fieldName + " right");
    }
    return user;
});
