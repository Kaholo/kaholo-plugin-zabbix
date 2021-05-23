const {getApi, parseArr, arrToInt} = require("./helpers");

async function getEvents(action, settings) {
    const api = await getApi(action.params, settings);
    const eventsIds = parseArr(action.params.eventsIds);
    const groupsIds = parseArr(action.params.groupsIds);
    const severities = arrToInt(parseArr(action.params.severities));
    const tags = parseArr(action.params.tags);
    const acknowledged = action.params.acknowledged || "Both";
    const params = {
        "output": "extend",
        "selectHosts": "extend",
        "select_acknowledges": "extend",
        "selectTags": "extend",
        "selectSuppressionData": "extend",
        "select_alerts": "extend",
        "sortfield": ["clock", "eventid"], // sort events by time they came and event ID
        "sortorder": "DESC",
        "suppressed": action.params.suppressed | false
    }
    if (eventsIds.length > 0){
        params.eventids = eventsIds;
    }
    if (groupsIds.length > 0){
        params.groupids = groupsIds;
    }
    if (severities.length > 0){
        params.severities = severities;
    }
    if (tags.length > 0){
        params.tags = tags;
        params.evaltype = action.params.tagEval === "OR" ? 2 : 0; // 2 - is for OR, and 0 for AND
    }
    if (acknowledged != "Both"){
        params.acknowledged = acknowledged === "Acknowledged";
    }
    return api.method("event.get").call(params);
}

async function acknowledgeEvents(action, settings) {
    const api = await getApi(action.params, settings);
    const eventsIds = parseArr(action.params.eventsIds);
    if (eventsIds.length == 0){
        throw "Events Ids must consist of at least one ID";
    }
    const ackType = action.params.ackType | "Acknowledge";
    let severity = action.params.severity;
    if (typeof(severity) === "string"){
        severity = parseInt(severity);
    }
    const params = { 
        "eventids": eventsIds,
        "action":   ackType === "Acknowledge" ? 2 :
                    ackType === "Un-acknowledge" ? 16 : 0
    }
    if (action.params.close){
        params.action += 1;
    }
    if (action.params.msg){
        params.action += 4;
        params.message = action.params.msg;
    }
    if (severity){
        params.action += 8;
        params.severity = severity;
    }
    return api.method("event.acknowledge").call(params);
}

async function getProblems(action, settings) {
    const api = await getApi(action.params, settings);
    const eventsIds = parseArr(action.params.eventsIds);
    const groupsIds = parseArr(action.params.groupsIds);
    const severities = arrToInt(parseArr(action.params.severities));
    const tags = parseArr(action.params.tags);
    const acknowledged = action.params.acknowledged || "Both";
    const params = {
        "output": "extend",
        "select_acknowledges": "extend",
        "selectTags": "extend",
        "selectSuppressionData": "extend",
        "sortfield": ["eventid"], // sort events by time they came and event ID
        "sortorder": "DESC",
        "suppressed": action.params.suppressed | false
    }
    if (eventsIds.length > 0){
        params.eventids = eventsIds;
    }
    if (groupsIds.length > 0){
        params.groupids = groupsIds;
    }
    if (severities.length > 0){
        params.severities = severities;
    }
    if (tags.length > 0){
        params.tags = tags;
        params.evaltype = action.params.tagEval === "OR" ? 2 : 0; // 2 - is for OR, and 0 for AND
    }
    if (acknowledged != "Both"){
        params.acknowledged = acknowledged === "Acknowledged";
    }
    return api.method("problem.get").call(params);
}

///// Exports

module.exports = {
    getEvents,
    acknowledgeEvents,
    getProblems
}
