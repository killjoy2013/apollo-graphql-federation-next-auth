"use strict";
exports.__esModule = true;
var path_1 = require("path");
var dotenv_1 = require("dotenv");
var typeorm_1 = require("typeorm");
var dotenv_path = path_1["default"].resolve(process.cwd(), ".env");
dotenv_1["default"].config({ path: dotenv_path });
var options = {
    type: 'postgres',
    entities: ['dist/src/**/*entity.js'],
    migrations: ['dist/src/migrations/**/*.js'],
    migrationsRun: true,
    url: process.env.DATABASE_URL,
    schema: 'auth'
};
console.log({ options: options });
exports["default"] = new typeorm_1.DataSource(options);
