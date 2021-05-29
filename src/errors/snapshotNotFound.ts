//custom error class for when data is not found in the database
export class SnapshotNotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = "SnapshotNotFoundError";
    }
}