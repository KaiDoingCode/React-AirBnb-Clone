import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        min: 6
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {}
},
    {timestamps: true}
)

userSchema.pre('save', function(next) {
    let user = this;

    if(user.isModified('password')){
        return bcrypt.hash(user.password, 12, function(err, hashedPassword){
            if(err){
                console.log(err);
                return next(err);
            } 
            user.password = hashedPassword;
            return next();
            
        })
    } else {
        return next();
    }
})

userSchema.methods.comparePassword = function(password, next){
    bcrypt.compare(password, this.password, function(err, isMatched){
        if(err){
            console.log(err);
            return next(err, false);
        } 
        return next(null, isMatched);

    })
}

export default mongoose.model('User', userSchema);