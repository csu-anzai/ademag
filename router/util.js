cleen =(string)=>{
    return string.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '') 
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

module.exports.util = {cleen, cleanArray, cleanObj}