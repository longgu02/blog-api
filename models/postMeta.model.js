const mongoose = require('mongoose');

const postMetaSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectIds,
        ref: "PostDetail",
    },
    key: {
        type: String,
        enum: ['image', 'video', 'audio', 'embed']
    },
    content: {
        type: String,
    }
})