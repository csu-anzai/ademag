const colorC = require('ansi-colors');

cleen =(string)=>{
    return string.replace(/[^a-z0-9-\s]/gi, '')
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

printY = (consoleMsg, msgConsole)=>{
    console.log(colorC.yellow(consoleMsg),msgConsole);
}

printC= (consoleMsg, msgConsole)=>{
    console.log(colorC.magenta(consoleMsg),msgConsole);
}

printB = (consoleMsg, msgConsole)=>{
    console.log(colorC.blue(consoleMsg),msgConsole);
}

printG = (consoleMsg, msgConsole)=>{
    console.log(colorC.green(consoleMsg),msgConsole);
}

printR = (consoleMsg, msgConsole)=>{
    console.log(colorC.red(consoleMsg),msgConsole);
}

module.exports.util = {
    cleen, 
    cleanArray, 
    cleanObj, 
    isVide, 
    jsonToString,
    printY,
    printB,
    printG,
    printR
}