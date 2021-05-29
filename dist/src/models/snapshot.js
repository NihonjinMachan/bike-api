"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.snapshotModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const SnapshotSchema = new Schema({
    at: {
        type: Date,
        default: Date.now(),
    },
    stations: {
        type: Array,
        required: true,
        default: [],
    },
    weather: {
        type: Object,
        required: true,
    },
});
const snapshotModel = mongoose_1.default.model('snapshot', SnapshotSchema);
exports.snapshotModel = snapshotModel;
//# sourceMappingURL=snapshot.js.map