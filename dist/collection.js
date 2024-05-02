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
    async function remove(collection, { key, value }) {
        try {
            const dbname = process.env.DB_NAME;
            const fileName = `${dbname}/${collection}.json`;
            if (fs_1.default.existsSync(fileName)) {
                // Read the file synchronously
                const jsonData = fs_1.default.readFileSync(fileName, 'utf-8');
                // Parse the JSON data
                let data = JSON.parse(jsonData);
                // Find the index of the item to remove
                const indexToRemove = data.findIndex((item) => item[key] === value);
                // console.log(indexToRemove);
                if (indexToRemove !== -1) {
                    // Remove the item from the array
                    data.splice(indexToRemove, 1);
                    // Write the updated data back to the file
                    fs_1.default.writeFileSync(fileName, JSON.stringify(data));
                    return `Item with ${key} '${value}' removed from collection '${collection}'.`;
                }
                else {
                    return `Item with ${key} '${value}' not found in collection '${collection}'.`;
                }
            }
            else {
                return `Collection '${collection}' does not exist.`;
            }
        }
        catch (error) {
            console.error('Error removing data:', error);
            return null;
        }
    }
    collection_1.remove = remove;
    async function destroy(collection) {
        try {
            let dbname = process.env.DB_NAME;
            const fileName = `${dbname}/${collection}.json`;
            // Check if the file exists
            if (fs_1.default.existsSync(fileName)) {
                // Delete the file
                fs_1.default.unlinkSync(fileName);
                return `File '${fileName}' deleted successfully.`;
            }
            else {
                return `File '${fileName}' does not exist.`;
            }
        }
        catch (error) {
            return `Error deleting collection: ${error}`;
        }
    }
    collection_1.destroy = destroy;
    async function update(collection, { key, value }, newData) {
        try {
            const dbname = process.env.DB_NAME;
            const fileName = `${dbname}/${collection}.json`;
            if (fs_1.default.existsSync(fileName)) {
                // Read the file synchronously
                const jsonData = fs_1.default.readFileSync(fileName, 'utf-8');
                // Parse the JSON data
                let data = JSON.parse(jsonData);
                // Find the index of the item to update
                const indexToUpdate = data.findIndex((item) => item[key] === value);
                if (indexToUpdate !== -1) {
                    // Update the _id field from the existing data
                    newData._id = data[indexToUpdate]._id;
                    // Update the data at the found index
                    data[indexToUpdate] = newData;
                    // Write the updated data back to the file
                    fs_1.default.writeFileSync(fileName, JSON.stringify(data));
                    return `Item with ${key} '${value}' updated in collection '${collection}'.`;
                }
                else {
                    return `Item with ${key} '${value}' not found in collection '${collection}'.`;
                }
            }
            else {
                return `Collection '${collection}' does not exist.`;
            }
        }
        catch (error) {
            console.error('Error updating data:', error);
            return null;
        }
    }
    collection_1.update = update;
})(collection || (exports.collection = collection = {}));
//# sourceMappingURL=collection.js.map