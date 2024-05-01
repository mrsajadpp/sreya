import fs from 'fs';

function generateUniqueID(): string {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base 36 string
    const randomString = Math.random().toString(36).substr(2, 5); // Generate random string
    const uniqueID = timestamp + randomString; // Combine timestamp and random string
    return uniqueID;
}


export module collection {
    export function create(collection: string) {
        let dbname = process.env.DB_NAME;
        const fileName = `${dbname}/${collection}.json`;
        if (fs.existsSync(fileName)) {
            console.log(`Collection '${collection}' already exists.`);
            return `Collection '${collection}' already exists.`;
        } else {
            fs.writeFileSync(fileName, '[]');
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

    export async function insert(collection: string, newData: any) {
        try {
            const dbname = process.env.DB_NAME;
            const fileName = `${dbname}/${collection}.json`;

            if (fs.existsSync(fileName)) {
                // Read the file synchronously
                const jsonData = fs.readFileSync(fileName, 'utf-8');

                // Parse the JSON data
                const data = JSON.parse(jsonData);

                // Generate a unique ID for the new data
                newData._id = await generateUniqueID();

                // Push the new data to the existing array
                data.push(newData);

                // Write the updated data back to the file
                fs.writeFileSync(fileName, JSON.stringify(data));

                return 'Data inserted successfully.';
            } else {
                return `Collection '${collection}' does not exist.`;
            }
        } catch (error) {
            console.error('Error inserting data:', error);
            return null;
        }
    }
}
