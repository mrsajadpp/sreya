"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function connect(dbname) {
    fs_1.default.stat(dbname, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs_1.default.mkdir(dbname, (err) => {
                    if (err) {
                        console.error('Error creating database:', err);
                    }
                    else {
                        console.log('Database created successfully');
                        fs_1.default.readdir(dbname, (err, files) => {
                            if (err) {
                                console.error('Error reading collections:', err);
                                return;
                            }
                            // Filter out files with the .json extension
                            const jsonFiles = files.filter(file => path_1.default.extname(file) === '.json');
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
            else {
                console.error('Error connecting database', err);
            }
        }
        else {
            if (stats.isDirectory()) {
                fs_1.default.readdir(dbname, (err, files) => {
                    if (err) {
                        console.error('Error reading collections:', err);
                        return;
                    }
                    // Filter out files with the .json extension
                    const jsonFiles = files.filter(file => path_1.default.extname(file) === '.json');
                    // Log the names of the json files
                    console.log('JSON files in the directory:');
                    jsonFiles.forEach(file => {
                        console.log(file);
                        return file;
                    });
                });
            }
            else {
                fs_1.default.mkdir(dbname, (err) => {
                    if (err) {
                        console.error('Error creating database:', err);
                    }
                    else {
                        console.log('Database created successfully');
                    }
                });
            }
        }
    });
}
exports.connect = connect;
//# sourceMappingURL=index.js.map