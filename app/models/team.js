// TEAM -> have an owner, that is a user
// eventually we'll add an array of toy subdocuments

const mongoose = require('mongoose')

// const toySchema = require('./toy')

const { Schema, model } = mongoose

const teamSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        numberOfWins: {
            type: Number,
            required: true
        },
        numberOfLoses: {
            type: Number,
            required: true
        },
        // toys: [toySchema],
        owner: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
    }, {
        timestamps: true,
        // we're going to be adding virtuals to our model, the following lines will make sure that those virtuals are included whenever we return JSON or an Object
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
)

// virtuals go here
// these are virtual properties, that use existing data(saved in the database), to add a property whenever we retieve a document and convert it to JSON or an object.
teamSchema.virtual('fullTitle').get(function () {
    // in here, we can do whatever javascripty things we want, to make sure we return some value that will be assigned to this virtual
    // fullTitle is going to combine the name and type to build a title
    return `${this.name} the ${this.type}`
})

teamSchema.virtual('isGood').get(function () {
    if (this.numberOfWins < 5) {
        return "yeah, they're just terrible"
    } else if (this.age >= 5 && this.age < 8) {
        return "not too bad, but not great"
    } else {
        return "only GOATS stand here"
    }
})

module.exports = model('Team', teamSchema)
