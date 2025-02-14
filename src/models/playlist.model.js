import mongoose,{Schema} from 'mongoose';

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video', // video collection ko reference kar deya
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User', // user collection ko reference kar deya
    }
},{timestamps: true})

export const Playlist = mongoose.model('Playlist',playlistSchema)