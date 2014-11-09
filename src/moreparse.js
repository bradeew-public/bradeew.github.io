/**
 * Created by wbradee on 11/8/14.
 */

//get Demographic info using jquery DOM
function getPatientInfo (document) {
    var pr = $(document).find("patientRole");
    var addr = pr.find('addr');
    var patient = $(document).find("patient");
    // format birtdate
    var bt = patient.find('birthTime').attr('value'); // YYYYMMDD
    var bd = bt.substring(4,6) + "/" + bt.substring(6,8) + "/" + bt.substring(0,4);
    var telNo = pr.find('telecom').attr('value');
    telNo = telNo.substring(4, telNo.length);

    var now = new Date(); var bdd = new Date (bd);
    var yearsOld = Math.floor((now - bdd) / (365 * 24 * 60 * 60 * 1000));

    return {
        firstName  : patient.find('given').text(),
        lastName   : patient.find('family').text(),
        suffix     : patient.find('suffix').text(),
        gender     : patient.find('administrativeGenderCode').attr('code'),
        birthDate  : bd,
        race       : patient.find('raceCode').attr('displayName'),
        ethnicity  : patient.find('ethnicGroupCode').attr('displayName'),
        ssn        : pr.find('id').attr('extension'),
        street     : addr.find('streetAddressLine').text(),
        city       : addr.find('city').text(),
        state      : addr.find('state').text(),
        country    : addr.find('country').text(),
        postalCode : addr.find('postalCode').text(),
        tel        : telNo,
        age        : yearsOld
    };
}

function getAuthor(document){
    var author = $(document).find("author");
    var addr = author.find("assignedAuthor").find('addr');
    var ap = $(document).find("assignedPerson");
    var telNo = author.find("assignedAuthor").find('telecom').attr('value');
    telNo = telNo.substring(4, telNo.length);

    return {
        firstName  : ap.find('given').text(),
        lastName   : ap.find('family').text(),
        prefix     : ap.find('prefix').text(),
        TIN        : author.find("assignedAuthor").find('id').attr('extension'),
        street     : addr.find('streetAddressLine').text(),
        city       : addr.find('city').text(),
        state      : addr.find('state').text(),
        country    : addr.find('country').text(),
        postalCode : addr.find('postalCode').text(),
        tel        : telNo
    };
}
/*
function ccdController($scope, $http) {
    $http.get("CCD/modified_marla_CCD.xml")
        .success(function(response) {
            $scope.cxmlDoc = response;
            $scope.patientInfo = getPatientInfo(response);
            $scope.providerInfo = getAuthor(response);
        }).error(function(data, status, headers, config){
            console.log(status);
        });
}
    */