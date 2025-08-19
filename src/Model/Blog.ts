import mongoose from "mongoose";

const Blog = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        content:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Comments = new mongoose.Schema(
    {
        text:{
            type: String,
            required: true
        },
        page:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
            required: true
        },
        author:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const _Blog = mongoose.models.Blog || mongoose.model("Blog", Blog);
const _Comments = mongoose.models.Comments || mongoose.model("Comments", Comments);

export {_Blog, _Comments};