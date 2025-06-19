"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdminRole = void 0;
const requireAdminRole = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Administrator access required.' });
    }
    next();
};
exports.requireAdminRole = requireAdminRole;
