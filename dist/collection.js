"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collection = void 0;
const fs_1 = __importDefault(require("fs"));
var collection;
(function (collection_1) {
    function create(collection) {
        let dbname = process.env.DB_NAME;
        const fileName = `${dbname}/${collection}.json`;
        if (fs_1.default.existsSync(fileName)) {
            console.log(`Collection '${collection}' already exists.`);
            return `Collection '${collection}' already exists.`;
        }
        else {
            fs_1.default.writeFileSync(fileName, '');
            console.log(`Collection '${collection}' created successfully.`);
            return `Collection '${collection}' created successfully.`;
        }
    }
    collection_1.create = create;
    function find(collection) {
        try {
            let dbname = process.env.DB_NAME;
            // Read the file synchronously
            const jsonData = fs_1.default.readFileSync(`${dbname}/${collection}.json`, 'utf-8');
            // Parse the JSON data
            const data = JSON.parse(jsonData);
            return data;
        }
        catch (error) {
            console.error('Error reading JSON file:', error);
            return null;
        }
    }
    collection_1.find = find;
})(collection || (exports.collection = collection = {}));
//# sourceMappingURL=collection.js.map