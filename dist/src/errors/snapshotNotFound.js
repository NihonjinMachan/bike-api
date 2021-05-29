"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapshotNotFoundError = void 0;
//custom error class for when data is not found in the database
class SnapshotNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "SnapshotNotFoundError";
    }
}
exports.SnapshotNotFoundError = SnapshotNotFoundError;
//# sourceMappingURL=snapshotNotFound.js.map