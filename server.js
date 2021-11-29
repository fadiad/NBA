const express = require('express')
const path = require('path')
const api = require('./server/routes/api')
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


app.use('/', api)

const port = 3000
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})



















// class Player {
//     constructor(player) {
//         this.fname = player.firstName
//         this.lname = player.lastName
//         this.number = player.jersey
//         this.active = player.isActive
//         this.teamId = player.teamId
//         this.pos = player.pos
//         this.url = `https://nba-players.herokuapp.com/players/${this.lname}/${this.fname}`
//     }
// }

// const teamToIDs = {
//     "lakers": "1610612747",
//     "warriors": "1610612744",
//     "heat": "1610612748",
//     "suns": "1610612756"
// }

// app.get('/teams/:teamName', function (req, response) {
//     let playersArray = []
//     urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (err, data, res) {
//         if (res.status === 200) {
//             let playersJsonData = JSON.parse(data).league.standard
//             for (let player of playersJsonData) {
//                 if (player.teamId === teamToIDs[req.params.teamName] && player.isActive) {
//                     playersArray.push(new Player(player))
//                 }
//             }
//             response.send(playersArray)
//         }
//     })
// })