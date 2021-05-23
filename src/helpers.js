const { ZabbixClient } = require("zabbix-client");

async function getApi(params, settings){
    const user = (params.user || settings.user || "").trim()
    const pass = params.pass || settings.pass;
    const host = (params.host || settings.host || "").trim();
    if (!user || !pass || !host){
        throw "One of the required parameters was not given.";
    }
    const client = new ZabbixClient(host);
    return client.login(user, pass);
}

function parseArr(param){
    if (typeof(param)==="string"){
        return param.split("\n").map(item=>item.trim()).filter(item=>item);
    }
    if (Array.isArray(param)){
        return param;
    }
    if (param){
        return [param];
    }
    return [];
}

function arrToInt(array){
    for (let i=0; i < array.length; i++){
        if (typeof(array[i]) === "number"){
            continue;
        }
        if (typeof(array[i]) !== "string"){
            throw "Bad Integer format";
        }
        array[i] = parseInt(array[i]);
    }
    return array;
}

module.exports = {
    getApi,
    parseArr,
    arrToInt
}
