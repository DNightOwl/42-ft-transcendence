"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparepassword = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
function hashPassword(rawPassword) {
    const SALT = bcrypt.genSaltSync();
    return (bcrypt.hashSync(rawPassword, SALT));
}
exports.hashPassword = hashPassword;
function comparepassword(rawPassword, hash) {
    return bcrypt.compareSync(rawPassword, hash);
}
exports.comparepassword = comparepassword;
//# sourceMappingURL=bcrypt.js.map