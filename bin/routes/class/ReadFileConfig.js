"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let config = "public\\resource\\config.json"; //文本信息放入json档
class ReadFileConfig {
    static async ReadFileConfig() {
        return await new Promise((resolve, reject) => {
            ReadFileConfig.ReadFile;
        });
    }
}
ReadFileConfig.ReadFile = fs_1.default.readFile(config, function (err, data) {
    return JSON.parse(data.toString());
});
exports.ReadFileConfig = ReadFileConfig;
//# sourceMappingURL=ReadFileConfig.js.map