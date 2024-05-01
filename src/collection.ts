import fs from 'fs';

export default function collection() {
    function create(collection: string) {
        const fileName = `${collection}.json`;
        if (fs.existsSync(fileName)) {
            console.log(`Collection '${collection}' already exists.`);
        } else {
            fs.writeFileSync(fileName, '');
            console.log(`Collection '${collection}' created successfully.`);
        }
    }
}
