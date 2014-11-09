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
    var now = new Date(); var bd = new Date (pi.birthDate);
    var yearsOld = Math.floor((now - bd) / (365 * 24 * 60 * 60 * 1000));
    $("#ptName").html(pi.lastName + ", " + pi.firstName + " - " + yearsOld + " - " +
    (pi.gender == "F" ? "Female" : "Male"));

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

