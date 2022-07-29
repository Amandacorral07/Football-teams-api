// seed.js is going to be the file we run, whenever we want to see our database, we'll create a bunch of teams at once

// we want to be careful with this, because when we run it, it'll delete all of the teams in the db

// we can modify this later, to only delete teams that don't have an owner already, but we'll keep it simple for now

const mongoose = require ('mongoose')
const Team = require('./team')
const db = require('../../config/db')

const startTeams = [
    { name: 'Tampa Bay Buccaneers', type: 'team', numberOfWins: 13, numberOfLoses: 4},
    { name: 'Los Angeles Rams', type: 'team', numberOfWins: 12, numberOfLoses: 5},
    { name: 'Dallas Cowboys', type: 'team', numberOfWins: 12, numberOfLoses: 5},
    { name: 'Kansas City Chiefs', type: 'team', numberOfWins: 12, numberOfLoses: 5},
    { name: 'Arizona Cardinals', type: 'team', numberOfWins: 11, numberOfLoses: 6},
    { name: 'New England Patriots', type: 'team', numberOfWins: 10, numberOfLoses: 7},
    { name: 'Pittsburgh Steelers', type: 'team', numberOfWins: 9, numberOfLoses: 7},
    { name: 'Seattle Seahawks', type: 'team', numberOfWins: 7, numberOfLoses: 10},
    { name: 'Detroit Lions', type: 'team', numberOfWins: 3, numberOfLoses: 14},

   
]

// first we need to connect to the database 
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(()=>{
        // first we remove all of the teams
        // here we can add something to make sure we only delete teams without an owner
        Team.deleteMany({owner: null})
            .then(deletedTeams =>{
                console.log('deletedTeams', deletedTeams)
                // the next step is to use our startTeams array to create our seeded teams 
                Team.create(startTeams)
                    .then(newTeams => {
                        console.log('the new teams', newTeams)
                        mongoose.connection.close()
                    })
                    .catch(error=>{
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error=>{
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error=>{
        console.log(error)
        mongoose.connection.close()
    })