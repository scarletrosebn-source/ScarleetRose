const mongoose = require("mongoose");

const ownerSocialsSchema = new mongoose.Schema({
    socials:{
        facebook: {
        type: String,
        required: true,
    },
    instagram: {
        type: String,
        required: true,
    },
    twitter: {
        type: String,
        required: true,
    },
    pinterest: {
        type: String,
        required: true,
    }
    },
    contacts: {
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        }
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("OwnerSocials", ownerSocialsSchema);    
