const { Schema, model } = require('mongoose')

const PlayerSchema = new Schema({
    username: String,
    score: String,
})

const player = model('player', PlayerSchema)
module.exports = player
