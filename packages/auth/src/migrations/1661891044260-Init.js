"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.newMigration1661891044260 = void 0;
var newMigration1661891044260 = /** @class */ (function () {
    function newMigration1661891044260() {
        this.name = 'newMigration1661891044260';
    }
    newMigration1661891044260.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE \"auth\".\"user\" (\"id\" SERIAL NOT NULL, \"user_name\" character varying NOT NULL, \"first_name\" character varying NOT NULL, \"last_name\" character varying NOT NULL, \"refresh_token\" character varying, CONSTRAINT \"PK_cace4a159ff9f2512dd42373760\" PRIMARY KEY (\"id\"))")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"auth\".\"role\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"description\" character varying, CONSTRAINT \"PK_b36bcfe02fc8de3c57a8b2391c2\" PRIMARY KEY (\"id\"))")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"auth\".\"right\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"description\" character varying, CONSTRAINT \"PK_77e01b46d514d44ec33fd2d93d3\" PRIMARY KEY (\"id\"))")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"auth\".\"user_role\" (\"user_id\" integer NOT NULL, \"role_id\" integer NOT NULL, CONSTRAINT \"PK_f634684acb47c1a158b83af5150\" PRIMARY KEY (\"user_id\", \"role_id\"))")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_d0e5815877f7395a198a4cb0a4\" ON \"auth\".\"user_role\" (\"user_id\") ")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_32a6fc2fcb019d8e3a8ace0f55\" ON \"auth\".\"user_role\" (\"role_id\") ")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"auth\".\"role_right\" (\"role_id\" integer NOT NULL, \"right_id\" integer NOT NULL, CONSTRAINT \"PK_098880f8b44411d575b6c32e0c5\" PRIMARY KEY (\"role_id\", \"right_id\"))")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_8a5086d797dda28a0449d64c89\" ON \"auth\".\"role_right\" (\"role_id\") ")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_2eacc9bb34d8d46a8f84438216\" ON \"auth\".\"role_right\" (\"right_id\") ")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"auth\".\"user_role\" ADD CONSTRAINT \"FK_d0e5815877f7395a198a4cb0a46\" FOREIGN KEY (\"user_id\") REFERENCES \"auth\".\"user\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"auth\".\"user_role\" ADD CONSTRAINT \"FK_32a6fc2fcb019d8e3a8ace0f55f\" FOREIGN KEY (\"role_id\") REFERENCES \"auth\".\"role\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"auth\".\"role_right\" ADD CONSTRAINT \"FK_8a5086d797dda28a0449d64c89a\" FOREIGN KEY (\"role_id\") REFERENCES \"auth\".\"role\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"auth\".\"role_right\" ADD CONSTRAINT \"FK_2eacc9bb34d8d46a8f84438216b\" FOREIGN KEY (\"right_id\") REFERENCES \"auth\".\"right\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 13:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    newMigration1661891044260.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"auth\".\"role_right\" DROP CONSTRAINT \"FK_2eacc9bb34d8d46a8f84438216b\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"auth\".\"role_right\" DROP CONSTRAINT \"FK_8a5086d797dda28a0449d64c89a\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"auth\".\"user_role\" DROP CONSTRAINT \"FK_32a6fc2fcb019d8e3a8ace0f55f\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"auth\".\"user_role\" DROP CONSTRAINT \"FK_d0e5815877f7395a198a4cb0a46\"")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"auth\".\"IDX_2eacc9bb34d8d46a8f84438216\"")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"auth\".\"IDX_8a5086d797dda28a0449d64c89\"")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"auth\".\"role_right\"")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"auth\".\"IDX_32a6fc2fcb019d8e3a8ace0f55\"")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"auth\".\"IDX_d0e5815877f7395a198a4cb0a4\"")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"auth\".\"user_role\"")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"auth\".\"right\"")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"auth\".\"role\"")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"auth\".\"user\"")];
                    case 13:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return newMigration1661891044260;
}());
exports.newMigration1661891044260 = newMigration1661891044260;
