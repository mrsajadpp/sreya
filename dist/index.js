"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const dotenv = __importStar(require("dotenv"));
// Load environment variables from .env file
dotenv.config();
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
__exportStar(require("./collection"), exports);
function connect(dbname) {
    return new Promise((resolve, reject) => {
        process.env.DB_NAME = dbname;
        fs_1.default.stat(dbname, (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    fs_1.default.mkdir(dbname, (err) => {
                        if (err) {
                            console.error('Error creating database:', err);
                            reject(err);
                        }
                        else {
                            console.log('Database created successfully');
                            readDirectory(dbname)
                                .then((filenamesWithoutExtension) => resolve(filenamesWithoutExtension))
                                .catch(reject);
                        }
                    });
                }
                else {
                    console.error('Error connecting database', err);
                    reject(err);
                }
            }
            else {
                if (stats.isDirectory()) {
                    readDirectory(dbname)
                        .then((filenamesWithoutExtension) => resolve(filenamesWithoutExtension))
                        .catch(reject);
                }
                else {
                    fs_1.default.mkdir(dbname, (err) => {
                        if (err) {
                            console.error('Error creating database:', err);
                            reject(err);
                        }
                        else {
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
exports.connect = connect;
function readDirectory(dbname) {
    return new Promise((resolve, reject) => {
        fs_1.default.readdir(dbname, (err, files) => {
            if (err) {
                console.error('Error reading collections:', err);
                reject(err);
            }
            else {
                // Filter out files with the .json extension
                const jsonFiles = files.filter(file => path_1.default.extname(file) === '.json');
                // Extract filenames without extension
                const filenamesWithoutExtension = jsonFiles.map(file => file.split('.json')[0]);
                // Log the names of the json files
                // console.log('JSON files in the directory:');
                resolve(filenamesWithoutExtension);
            }
        });
    });
}
//# sourceMappingURL=index.js.map