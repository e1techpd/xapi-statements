"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var assertError_1 = require("jscommons/dist/tests/utils/assertError");
var NoModel_1 = require("jscommons/dist/errors/NoModel");
var setup_1 = require("./utils/setup");
var createStatement_1 = require("./utils/createStatement");
var createClientModel_1 = require("./utils/createClientModel");
var createVoidingStatement_1 = require("./utils/createVoidingStatement");
var storeStatementsInService_1 = require("./utils/storeStatementsInService");
var LRS2_ID = '5988f0f00000000000000002';
var LRS2_AUTHORITY = {
    objectType: 'Agent',
    mbox: 'mailto:lrs2@test.com'
};
var LRS2_CLIENT = createClientModel_1.default({
    lrs_id: LRS2_ID,
    authority: LRS2_AUTHORITY
});
var TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
var TEST_STATEMENT = createStatement_1.default({ id: TEST_ID });
var TEST_VOIDER = createVoidingStatement_1.default(TEST_ID);
var TEST_CLIENT = createClientModel_1.default();
describe('get statement', function () {
    var service = setup_1.default();
    var storeStatements = storeStatementsInService_1.default(service);
    var assertVoided = function () { return __awaiter(_this, void 0, void 0, function () {
        var promise, result, voidedStatement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promise = service.getStatement({ id: TEST_ID, voided: false, client: TEST_CLIENT });
                    return [4 /*yield*/, assertError_1.default(NoModel_1.default, promise)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, service.getStatement({
                            id: TEST_ID,
                            voided: true,
                            client: TEST_CLIENT
                        })];
                case 2:
                    result = _a.sent();
                    voidedStatement = result.statements[0];
                    assert.equal(voidedStatement.id, TEST_ID);
                    return [2 /*return*/];
            }
        });
    }); };
    it('should throw an error when the statement does not exist', function () { return __awaiter(_this, void 0, void 0, function () {
        var promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promise = service.getStatement({ id: TEST_ID, voided: false, client: TEST_CLIENT });
                    return [4 /*yield*/, assertError_1.default(NoModel_1.default, promise)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw an error when the voider is not voided ', function () { return __awaiter(_this, void 0, void 0, function () {
        var promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([TEST_STATEMENT])];
                case 1:
                    _a.sent();
                    promise = service.getStatement({ id: TEST_ID, voided: true, client: TEST_CLIENT });
                    return [4 /*yield*/, assertError_1.default(NoModel_1.default, promise)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw an error when the voider does not exist', function () { return __awaiter(_this, void 0, void 0, function () {
        var promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promise = service.getStatement({ id: TEST_ID, voided: true, client: TEST_CLIENT });
                    return [4 /*yield*/, assertError_1.default(NoModel_1.default, promise)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should void a statement when it is voided in a following batch', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([TEST_STATEMENT])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, storeStatements([TEST_VOIDER])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, assertVoided()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should void a statement when it is voided in a previous batch', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([TEST_VOIDER])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, storeStatements([TEST_STATEMENT])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, assertVoided()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should void a statement when it is voided earlier in the same batch', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([TEST_VOIDER, TEST_STATEMENT])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, assertVoided()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should void a statement when it is voided later in the same batch', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([TEST_STATEMENT, TEST_VOIDER])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, assertVoided()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the correct statement when the ids are the same across 2 different stores', function () { return __awaiter(_this, void 0, void 0, function () {
        var LRS2_STATEMENT_INSERT, LRS1_RESULT, LRS2_RESULT, LRS1_STATEMENT, LRS2_STATEMENT;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    LRS2_STATEMENT_INSERT = createStatement_1.default({
                        id: TEST_ID
                    });
                    return [4 /*yield*/, storeStatements([TEST_STATEMENT], [], TEST_CLIENT)];
                case 1:
                    LRS1_RESULT = _a.sent();
                    return [4 /*yield*/, storeStatements([LRS2_STATEMENT_INSERT], [], LRS2_CLIENT)];
                case 2:
                    LRS2_RESULT = _a.sent();
                    return [4 /*yield*/, service.getStatement({ id: TEST_ID, voided: false, client: TEST_CLIENT })];
                case 3:
                    LRS1_STATEMENT = _a.sent();
                    return [4 /*yield*/, service.getStatement({ id: TEST_ID, voided: false, client: LRS2_CLIENT })];
                case 4:
                    LRS2_STATEMENT = _a.sent();
                    assert.equal(LRS1_STATEMENT.statements[0].authority.mbox, TEST_CLIENT.authority.mbox);
                    assert.equal(LRS2_STATEMENT.statements[0].authority.mbox, LRS2_CLIENT.authority.mbox);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=getStatement.test.js.map