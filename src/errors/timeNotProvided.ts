//custom error class for when time is not specified in the request
export class timeNotProvidedError extends Error {
    constructor(message) {
      super(message);
      this.name = "timeNotProvidedError";
    }
}