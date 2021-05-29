import mongoose from "mongoose";
const Schema = mongoose.Schema;

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

const snapshotModel = mongoose.model('snapshot', SnapshotSchema);

export { snapshotModel }