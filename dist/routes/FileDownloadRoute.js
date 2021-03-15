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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDownloadRoute = void 0;
const express_1 = __importDefault(require("express"));
const ExcelTable_1 = require("../utility/ExcelTable");
const router = express_1.default.Router();
exports.FileDownloadRoute = router;
router.get('/test', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send("ABC");
}));
router.get('/export', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ReportHeaders = [{ name: 'Name', width: 12 }, { name: 'Age', width: 12 }];
        const ReportRows = [{ values: ['A', "32"] }, { values: ['B', "60"] }];
        const Report = { headers: ReportHeaders, rows: ReportRows };
        const Reports = { reports: [Report] };
        const streamFile = yield new ExcelTable_1.ExcelTable(Reports).getTable();
        res.setHeader("Content-disposition", `attachment;`);
        res.contentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        streamFile.pipe(res);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//# sourceMappingURL=FileDownloadRoute.js.map