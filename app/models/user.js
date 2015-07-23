//grab packages we need for user model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

//user schema 

var UserSchema = new Schema({
	name: String,
	username: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true, select: false}
});

//hash the password before th user is saved

UserSchema.pre('save', funciton(next) {
	var user = this;

	//hash pw only if pw has changed or user is new
	if(!user.isModified('password')) return next();

	//generate hash
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);
		user.password = hash;
		next();
	})
})

//method to compare a given password with database hash
UserSchema.methods.comparePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password, user.password)
}
//return themodel

module.exports = mongoose.model('User', UserSchema)