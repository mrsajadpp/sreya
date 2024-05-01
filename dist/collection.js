"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collection = void 0;
const fs_1 = __importDefault(require("fs"));
function generateUniqueID() {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base 36 string
    const randomString = Math.random().toString(36).substr(2, 5); // Generate random string
    const uniqueID = timestamp + randomString; // Combine timestamp and random string
    return uniqueID;
}
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
            fs_1.default.writeFileSync(fileName, '[]');
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
    async function insert(collection, newData) {
        try {
            const dbname = process.env.DB_NAME;
            const fileName = `${dbname}/${collection}.json`;
            if (fs_1.default.existsSync(fileName)) {
                // Read the file synchronously
                const jsonData = fs_1.default.readFileSync(fileName, 'utf-8');
                // Parse the JSON data
                const data = JSON.parse(jsonData);
                console.log(newData);
                console.log(data);
                // Generate a unique ID for the new data
                newData._id = await generateUniqueID();
                // Push the new data to the existing array
                data.push(newData);
                // Write the updated data back to the file
                fs_1.default.writeFileSync(fileName, JSON.stringify(data));
                return 'Data inserted successfully.';
            }
            else {
                return `Collection '${collection}' does not exist.`;
            }
        }
        catch (error) {
            console.error('Error inserting data:', error);
            return null;
        }
    }
    collection_1.insert = insert;
})(collection || (exports.collection = collection = {}));
//# sourceMappingURL=collection.js.map