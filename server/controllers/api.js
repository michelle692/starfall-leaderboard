const player = require('../models/player')

const leaderboard = async (req, res) => {
    try {
        console.log('Leaderboard requested')

        data = {
            'leaderboards': []
        }

        const players = await player.find()
        for (var i = 0; i < players.length; i++) {
            data['leaderboards'].push(players[i])
        }

        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ 'error': 'exception thrown' })
    }
};


const newScore = async (req, res) => {
    try {
        console.log('Updating leaderboard. body=' + JSON.stringify(req.query))

        if (!req.query.username)
            return res.status(400).json({ 'error': 'missing username' })

        if (!req.query.score)
            return res.status(400).json({ 'error': 'missing score' })

        const newPlayer = new player({
            username: req.query.username,
            score: req.query.score
        })

        await newPlayer.save()

        return res.status(201).json(newPlayer)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ 'error': 'exception thrown' })
    }
}

const deletePlayer = async (req, res) => {
    try {
        console.log('Deleting player. params=' + JSON.stringify(req.params))

        const doc = await player.findById(req.params.id)

        if (!doc)
            return res.status(400).json({'error': 'corresponding pwmId does not exist'})

        await doc.remove()

        return res.status(201).json(doc)
    } catch (error) {
        console.log(error)
        return res.status(400).json({'error': 'exception thrown'})
    }
}

module.exports = {
    leaderboard,
    newScore,
    deletePlayer
}
