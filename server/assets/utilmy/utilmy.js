cleen =(string)=>{
    return string.replace(/[^a-z0-9\s]/gi, '')
}

cleanArray =(array)=>{
    let results = array.map(value =>{       
        return   `'${cleen(value)}'`
    })
    return results
}

cleanObj =(data)=>{
    Object.keys(data).map(function(key, index) {
        data[key] = cleen(data[key]);
    });
}

isVide = (obj)=>{
    return Object.keys(obj).length === 0
}

jsonToString = (obj)=>{
    return (Object.keys(obj).map(function(k) { return obj[k] })).toString()
}

module.exports.util = {cleen, cleanArray, cleanObj, isVide, jsonToString}