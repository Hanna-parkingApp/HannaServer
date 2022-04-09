function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function extractIdFromObjectId(objId){
    
}

module.exports = { addDays }