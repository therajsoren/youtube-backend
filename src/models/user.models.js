// https://medium.com/simply-complex/why-curly-brackets-are-used-in-javascript-react-and-node-js-programming-972082a4aa99#:~:text=In%20javascript%20code%2C%20curly%20brackets%20are%20used%20to%20deconstruct%20an,what%20does%20this%20really%20mean%20%3F%E2%80%9D&text=Deconstruction%20is%20the%20process%20of,a%20constant%20or%20variable%20quicker.

import mongoose , {Schema} from "mongoose";
// in js code , curly brackets are used to deconstruct an object
import jwt from 'jsonwebtoken' // jwt ek bearer token 
import bcrypt from 'bcrypt';  // bcrypt aur jwsonwebtoken cryptography per based hai
// direct encryption len possible nhi hai tu hume help lena padta hai hooks ka 

const userSchema = new Schema(
    {
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Video', // video collection ko reference kar deya
            }
        ],
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true, // database ke searching me aa jye
            //  it improve query performance
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        password: {
            type: String,
            required: [true,'Password is required'],
            // minlength: 8,
        },
        refreshToken: {
            type: String,
        },
    },{timestamps: true})

userSchema.pre('save',async function(next) {
    // check if the password has changed before saving the document
    if(!this.isModified('password')){ // yha password string me hai pass krna padta hai 
        return next();
    }
    this.password = await bcrypt.hash(this.password,10) // bycrypt.hash krne ke le 2 cheez chaiye 1 tu kya hash krna hai aur 2 kitne round laguu
    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password) // return true if password is correct or false otherwise
}

// 2 hai jwt token bus usage me antar hai
userSchema.methods.generateAccessToken = async function(){
    return await jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,

    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
) // is payload lagega, secret or private key lagega
};
userSchema.methods.generateRefreshToken = async function(){
    return await jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,

    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
};
export const User = mongoose.model('User',userSchema);


// // id:{
        //     type: String,
        //     required: true,
        //     // unique: true,
        //     // lowercase: true,
        //     // index: true, // database ke searching me aa jye 
        // },