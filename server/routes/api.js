const express = require('express')
const router = express.Router()
const urllib = require('urllib')

let playersArray = []
let dreamTeam = []
let allPlayers = []


let isExist = function (fname, lname) {
    for (let player of dreamTeam) {
        if (player.fname === fname && player.lname === lname) {
            return true;
        }
    }
    return false
}

class Player {
    constructor(player) {
        this.fname = player.firstName
        this.lname = player.lastName
        this.number = player.jersey
        this.active = player.isActive
        this.teamId = player.teamId
        this.pos = player.pos
        this.url = `https://nba-players.herokuapp.com/players/${this.lname}/${this.fname}`
    }
}

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (err, data, res) {
    if (res.status === 200) {
        let playersJsonData = JSON.parse(data).league.standard
        for (let player of playersJsonData) {
            allPlayers.push(player)
        }
    }
})

router.get('/teams/:teamName', function (req, response) {
    playersArray = []
    for (let player of allPlayers) {
        if (player.teamId === teamToIDs[req.params.teamName] && player.isActive) {
            playersArray.push(new Player(player))
        }
    }
    response.send(playersArray)
})

router.put('/team', function (req, res) {
    teamToIDs[req.body.teamName] = req.body.teamId
    res.send(teamToIDs)
})

router.get('/dreamTeam', function (req, res) {
    res.send(dreamTeam)
})

router.post('/addPlayer', function (req, res) {
    if (dreamTeam.length >= 5 || isExist(req.body.firstName, req.body.lastName)) {
        res.status(403).send("can't add user"); //403 Forbidden
    } else {
        for (let player of allPlayers) {
            if (player.firstName === req.body.firstName &&
                player.lastName === req.body.lastName) {
                dreamTeam.push(new Player(player))
                break;
            }
        }
    }
  
    res.end()
})

router.post('/deletePlayer', function (req, res) {
    for (let index in dreamTeam) {
        if (dreamTeam[index].fname === req.body.firstName &&
            dreamTeam[index].lname === req.body.lastName) {
            dreamTeam.splice(index, 1);
            break;
        }
    }
    res.send(dreamTeam)
})

module.exports = router
