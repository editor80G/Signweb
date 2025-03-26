import { Schema, model } from "mongoose";

const publicationSchema = new Schema({
    image: {
        type: String,
        required: [true, 'Image is required!'],
    },
    file: {
        type: String,
        required: [true, 'File is required!'],
    },
    issue: {
        type: String,
        required: [true, 'Issue is required!'],
    },
    date: {
        type: Date,
        required: [true, 'Date is required!'],
    },
    type: {
        type: String,
        required: [true, 'Type is required!'],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }, // Reference to the User who created this publication

}, { timestamps: true });

const Publication = model('Publication', publicationSchema);
export default Publication;
