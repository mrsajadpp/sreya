"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function collection() {
    function create(collection) {
        const fileName = `${collection}.json`;
        if (fs_1.default.existsSync(fileName)) {
            console.log(`Collection '${collection}' already exists.`);
        }
        else {
            fs_1.default.writeFileSync(fileName, '');
            console.log(`Collection '${collection}' created successfully.`);
        }
    }
}
exports.default = collection;
//# sourceMappingURL=collection.js.map