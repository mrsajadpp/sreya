import fs from 'fs';

export module collection {
    export function create(collection: string) {
        let dbname = process.env.DB_NAME;
        const fileName = `${dbname}/${collection}.json`;
        if (fs.existsSync(fileName)) {
            console.log(`Collection '${collection}' already exists.`);
            return `Collection '${collection}' already exists.`;
        } else {
            fs.writeFileSync(fileName, '');
            console.log(`Collection '${collection}' created successfully.`);
            return `Collection '${collection}' created successfully.`;
        }
    }
    export function find(collection: string) {
        try {
            let dbname = process.env.DB_NAME;
            // Read the file synchronously
            const jsonData = fs.readFileSync(`${dbname}/${collection}.json`, 'utf-8');

            // Parse the JSON data
            const data = JSON.parse(jsonData);

            return data;
        } catch (error) {
            console.error('Error reading JSON file:', error);
            return null;
        }
    }
}
