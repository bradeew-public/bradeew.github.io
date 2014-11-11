/**
 * Created by wbradee on 11/8/14.
 */
function setPtInfo() {
    var pi = getPatientInfo(xmlDoc);

    // Patient Address
    $("#ptDemographics").html(pi.street + "<br/>" +
    pi.city + ", " + pi.state + pi.postalCode + "<br/>" +
    "<a href='tel:" + pi.tel + "'>" + pi.tel + "</a>");

    // Title
     // $("#ptName").html(pi.lastName + ", " + pi.firstName + " - " + yearsOld + " - " +
    // (pi.gender == "F" ? "Female" : "Male"));

    // Visit Reason -- where does this come from?
    $("#reason").html("<h4>Annual Physical</h4>"+
        "<h4>Tobacco: YES</h4>");

    // Dr. Information (screwed up parsing 3X name . . . )
    var di = getAuthor(xmlDoc);
    $("#drInfo").html("<p><b>PCP:</b><br/>" +
        di.prefix + ". " + di.firstName + " " + di.lastName + "<br/>" +
        di.street + "<br/>" +
        di.city + ", " + di.state + " " + di.postalCode + "<br/>" +
        "<a href='tel:" + di.tel + "'>" + di.tel + "</a>");
}

function setEncounterDetails(index, encounters){
    enc = encounters[index]
    $("#encounterDetails").html(
        "Date: "+ enc["Visit Date"] + "<br/>" +
        "Chief Complaint: " + enc["Chief Complaint"] + "<br/>" +
        "Diagnosis: " + (enc["Diagnosis"] =="" ? "- none -" : enc["Diagnosis"]) + "<br/>" +
        "Notes: " + enc["Notes"] + "<br/>");

    /*
    <th>Chief Complaint</th>
    <th>Diagnosis</th>
    <th>ICD-9</th>
    <th>Height</th>
    <th>Weight</th>
    <th>Pulse</th>
    <th>Respiration</th>
    <th>Blood Pressure</th>
    <th>Notes</th>
        "Got index " + index);
*/

}

function setupTimeline(encounters, patientInfo){
    var container = document.getElementById('timeline');

    // Create a DataSet (allows two way data-binding)
    var encs = [];
    var bd = patientInfo.birthDate;
    bd = bd.substr(6,4) + "-" + bd.substr(0,2) + "-" + bd.substr(3,2);

    /*
     encs.push({
     id:0,
     content : "Birthdate",
     start : bd,
     end : bd
     });
     */
    for (var i = 0; i<encounters.length; i++){
        var vd = encounters[i]["Visit Date"].text;
        var visitDate = vd.substr(0,4) + '-' + vd.substr(4,2) + '-' + vd.substr(6,2);
        var enc = {
            id : i,
            content: encounters[i]["Chief Complaint"] +
            (encounters[i]["Diagnosis"] == "" ? "" : "<br/>("+encounters[i]["Diagnosis"]+")"),
            start : visitDate,
            end : visitDate
        };
        encs.push(enc);
    }

    var items = new vis.DataSet(encs);

    // Configuration for the Timeline
    var options = {
        max : new Date(),
        min : new Date(patientInfo.birthDate),
        type : 'point'
    };

    // Create a Timeline
    var timeline = new vis.Timeline(container, items, options);
    timeline.on('select', function (properties) {
        setEncounterDetails(properties.items[0], encounters);
    });
}