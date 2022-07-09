"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const response_1 = require("./utils/response");
const auth_1 = __importDefault(require("./router/auth"));
const dashboard_1 = __importDefault(require("./router/dashboard"));
const logger_1 = require("./logger");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use('/', express_1.default.static(path_1.default.join())); //used in-case of single app, angular is folder which contains UI build
app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    next();
});
app.use('/auth', auth_1.default);
app.use('/dashboard', dashboard_1.default);
app.use('/', (req, res) => {
    logger_1.logger.log({
        level: 'info',
        message: req.body.message,
        data: { file: __filename }
    });
    return (0, response_1.response)({ res, statusCode: 200, message: 'Hello world!' });
});
app.listen(port, () => {
    console.log(`Log: ~> app is up and running on ~> port-${port} on ENVIRONMENT ~> ${process.env.ENVIRONMENT}`);
});
module.exports = app;
