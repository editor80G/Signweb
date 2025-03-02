import { Schema, model } from "mongoose";

const publicationTypeSchema = new Schema({
    name: { type: String, required: true },

}, { timestamps: true });

const PublicationType = model('PublicationType', publicationTypeSchema);
export default PublicationType;