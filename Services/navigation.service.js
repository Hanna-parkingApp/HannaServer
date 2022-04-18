const mongoose = require('mongoose');
const Navigation = require('../db/schemas/Navigation');

async function createNavigation(details) {
    try{
        return await Navigation.create(details)
    }
    catch(err) {
        console.error(err);
    }

    return false;}

async function getNavigation(filter = {}) {
    try {
        const navigation = await Navigation.find(filter).exec();
        return navigation;
    }
    catch(err) {
        console.error(err);
    }
     return false;
}

async function updateNavigation(filter, newDetails) {
    try {
        const updatedNavigation = await Navigation.findOneAndUpdate(filter, newDetails, {new: true}).exec();
        return updatedNavigation;
    }
    catch(err) {
        console.error(err);
    }
     return false;
}

async function deleteNavigation(filter) {
    try {
        const deletedNavigation = await Navigation.findOneAndDelete(filter).exec();
        if (!deletedNavigation) {
            return false;
        }
        return true;
    }
    catch(err) {
        console.error(err);
    }
    return false;
}

module.exports = { 
    createNavigation,
    getNavigation,
    updateNavigation,
    deleteNavigation,
}