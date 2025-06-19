"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./users"));
const models_1 = __importDefault(require("./models"));
const logs_1 = __importDefault(require("./logs"));
const config_1 = __importDefault(require("./config"));
// Import other admin route modules here as they are created (e.g., settings)
const router = express_1.default.Router();
router.use('/users', users_1.default);
router.use('/models', models_1.default);
router.use('/logs', logs_1.default);
router.use('/config', config_1.default);
// router.use('/settings', settingsAdminRoutes);
exports.default = router;
