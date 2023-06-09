"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const register_1 = __importDefault(require("../handlers/register"));
const verification_1 = require("../handlers/verification");
router.post('/', register_1.default);
router.post('/vf', verification_1.createVerification);
router.get('/vfCheck', verification_1.checkEmailVf);
module.exports = router;
