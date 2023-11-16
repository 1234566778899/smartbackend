const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: String,
    lname: String,
    username: String,
    password: String,
    email: String,
    monthly_income: Number,
    address: String,
    telephone: String,
    documentType: String,
    documentNumber: String,
    active: { type: Boolean, default: false }
}, {
    timestamps: true
})

module.exports = model('user', UserSchema)