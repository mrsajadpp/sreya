import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
import fs, { Stats } from 'fs';
import path from 'path';
export * from './collection'

export function connect(dbname: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        process.env.DB_NAME = dbname;
        fs.stat(dbname, (err, stats: Stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    fs.mkdir(dbname, (err) => {
                        if (err) {
                            console.error('Error creating database:', err);
                            reject(err);
                        } else {
                            console.log('Database created successfully');
                            readDirectory(dbname)
                                .then((filenamesWithoutExtension) => resolve(filenamesWithoutExtension))
                                .catch(reject);
                        }
                    });
                } else {
                    console.error('Error connecting database', err);
                    reject(err);
                }
            } else {
                if (stats.isDirectory()) {
                    readDirectory(dbname)
                        .then((filenamesWithoutExtension) => resolve(filenamesWithoutExtension))
                        .catch(reject);
                } else {
                    fs.mkdir(dbname, (err) => {
                        if (err) {
                            console.error('Error creating database:', err);
                            reject(err);
                        } else {
                            console.log('Database created successfully');
                            readDirectory(dbname)
                                .then((filenamesWithoutExtension) => resolve(filenamesWithoutExtension))
                                .catch(reject);
                        }
                    });
                }
            }
        });
    });
}

function readDirectory(dbname: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(dbname, (err, files) => {
            if (err) {
                console.error('Error reading collections:', err);
                reject(err);
            } else {
                // Filter out files with the .json extension
                const jsonFiles = files.filter(file => path.extname(file) === '.json');

                // Extract filenames without extension
                const filenamesWithoutExtension = jsonFiles.map(file => file.split('.json')[0]);

                // Log the names of the json files
                // console.log('JSON files in the directory:');

                resolve(filenamesWithoutExtension);
            }
        });
    });
}