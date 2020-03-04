let UserSchema = require('../models/signup');

function email(email) {
    return new Promise((resolve, reject) => {
        UserSchema.find({email }, (err, docs) => {
            resolve(docs);
        })
    })
}
function name(name) {
    return new Promise((resolve, reject) => {
        UserSchema.find({name }, (err, docs) => {
            resolve(docs);
        })
    })
}
module.exports = {email, name};