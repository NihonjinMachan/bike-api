"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeNotProvidedError = void 0;
//custom error class for when time is not specified in the request
class timeNotProvidedError extends Error {
    constructor(message) {
        super(message);
        this.name = "timeNotProvidedError";
    }
}
exports.timeNotProvidedError = timeNotProvidedError;
//# sourceMappingURL=timeNotProvided.js.map