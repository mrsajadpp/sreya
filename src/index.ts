import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
import fs, { Stats } from 'fs';
import path from 'path';
export * from './collection'

export function connect(dbname: string) {
    process.env.DB_NAME = dbname;
    fs.stat(dbname, (err, stats: Stats) => { // Specify type fs.Stats for stats parameter
        if (err) {
            if (err.code === 'ENOENT') {
                fs.mkdir(dbname, (err) => {
                    if (err) {
                        console.error('Error creating database:', err);
                    } else {
                        console.log('Database created successfully');
                        fs.readdir(dbname, (err, files) => {
                            if (err) {
                                console.error('Error reading collections:', err);
                                return;
                            }

                            // Filter out files with the .json extension
                            const jsonFiles = files.filter(file => path.extname(file) === '.json');

                            // Log the names of the json files
                            console.log('JSON files in the directory:');
                            jsonFiles.forEach(file => {
                                console.log(file);
                                return file;
                            });
                        });
                    }
                });
            } else {
                console.error('Error connecting database', err);
            }
        } else {
            if (stats.isDirectory()) {
                fs.readdir(dbname, (err, files) => {
                    if (err) {
                        console.error('Error reading collections:', err);
                        return;
                    }

                    // Filter out files with the .json extension
                    const jsonFiles = files.filter(file => path.extname(file) === '.json');

                    // Log the names of the json files
                    console.log('JSON files in the directory:');
                    jsonFiles.forEach(file => {
                        console.log(file);
                        return file;
                    });
                });
            } else {
                fs.mkdir(dbname, (err) => {
                    if (err) {
                        console.error('Error creating database:', err);
                    } else {
                        console.log('Database created successfully');
                        fs.readdir(dbname, (err, files) => {
                            if (err) {
                                console.error('Error reading collections:', err);
                                return;
                            }

                            // Filter out files with the .json extension
                            const jsonFiles = files.filter(file => path.extname(file) === '.json');

                            // Log the names of the json files
                            console.log('JSON files in the directory:');
                            jsonFiles.forEach(file => {
                                console.log(file);
                                return file;
                            });
                        });
                    }
                });
            }
        }
    });
}
