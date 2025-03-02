import { Schema, model } from "mongoose";

const publicationSchema = new Schema({
    image: { type: String, required: true },
    file: { type: String, required: true },
    issue: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    typeList: [{
        type: Schema.Types.ObjectId,
        ref: 'Type'
    }],
}, { timestamps: true });

const Publication = model('Publication', publicationSchema);
export default Publication;
