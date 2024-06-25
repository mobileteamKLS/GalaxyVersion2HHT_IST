
var Userid = window.localStorage.getItem("Userid");
var User_Name = window.localStorage.getItem("User_Name");
var User_group = window.localStorage.getItem("User_group");
var ARE_USER_MOVEMENTS_LOGGED = window.localStorage.getItem("ARE_USER_MOVEMENTS_LOGGED");
var ISO_COUNTRY_CODE = window.localStorage.getItem("ISO_COUNTRY_CODE");
var SHED_AIRPORT_CITY = window.localStorage.getItem("SHED_AIRPORT_CITY");
var NAME_OF_CITY_I300 = window.localStorage.getItem("NAME_OF_CITY_I300");
var SHED_CODE = window.localStorage.getItem("SHED_CODE");
var SHED_DESCRIPTION = window.localStorage.getItem("SHED_DESCRIPTION");
var PRIMARY_CURRENCY_CODE_I606 = window.localStorage.getItem("PRIMARY_CURRENCY_CODE_I606");
var CompanyCode = window.localStorage.getItem("CompanyCode");
var PARAMETER_VALUE_for_Groupid = window.localStorage.getItem("PARAMETER_VALUE_for_Groupid");

var _IGMNo;
var Origin;
var Destination;
var Commodity;
var LocId;
var LocPieces;
var PendingPieces;
var LocCode;
var MAWBId;
var HAWBNo;
var _vlaueofHawb;
var _textofHawb = "";
var currentLocID;
var NPR;
var ShipmentWeight;
var isDataAvail = false;
$(function () {





    var language = window.localStorage.getItem("Language");

    switch (language) {
        case "English":
            //setEnglish();
            break;
        case "Hungarian":
            setHungarian();
            break;
        case "Turkish":
            setTurkish();
            break;
    }

    $("#txtScanMAWB").bind("input", function (e) {

        if (PARAMETER_VALUE_for_Groupid == 'N') {
            AWBNumberScan();
        }
    });

    $('#txtScanMAWB').keypress(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('body').mLoading({
                text: "Please Wait..",
            });
            if ($("#txtScanMAWB").val() == '') {
                $("body").mLoading('hide');
                errmsg = "Please enter AWB No.</br>";
                $.alert(errmsg);
                return;
            } else {
                inputData = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo></HouseNo><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"

                GetAWBDetails(inputData);
            }
        }
        //Stop the event from propogation to other handlers
        //If this line will be removed, then keypress event handler attached 
        //at document level will also be triggered
        event.stopPropagation();
    });



});


function AWBNumberScan() {
    //$('#ddlHAWBList').empty();
    //$("#txtLocation").val('');
    //$("#txtMovePkgs").val('');
    //$("#textMoveWght").val('');
    //$('#locationShow').text('');
    //if ($('#txtScanMAWB').val().length == 11) {

    //    if ($("#txtScanMAWB").val() != '') {
    //        var value = $("#txtScanMAWB").val();// this.value;// parseInt(this.value, 10),
    //        InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
    //        getHWABNoList(InputXML);
    //    }
    //}

    //if ($('#txtScanMAWB').val().length == 12) {

    //    if ($("#txtScanMAWB").val() != '') {
    //        var value = $("#txtScanMAWB").val();// this.value;// parseInt(this.value, 10),
    //        InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
    //        getHWABNoList(InputXML);
    //    }
    //}

    //if ($('#txtScanMAWB').val().length == 16) {

    //    if ($("#txtScanMAWB").val() != '') {
    //        var value = $("#txtScanMAWB").val();// this.value;// parseInt(this.value, 10),
    //        InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
    //        getHWABNoList(InputXML);
    //    }
    //}

    //if ($('#txtScanMAWB').val().length == 28) {

    //    if ($("#txtScanMAWB").val() != '') {
    //        var value = $("#txtScanMAWB").val();// this.value;// parseInt(this.value, 10),
    //        InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
    //        getHWABNoList(InputXML);
    //    }
    //}

    //if ($('#txtScanMAWB').val().length == 34) {

    //    if ($("#txtScanMAWB").val() != '') {
    //        var value = $("#txtScanMAWB").val();// this.value;// parseInt(this.value, 10),
    //        InputXML = "<Root><MAWBNO>" + $("#txtScanMAWB").val() + "</MAWBNO><HAWBNO></HAWBNO><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><EventType>A</EventType></Root>"
    //        getHWABNoList(InputXML);
    //    }
    //}
}

function setTurkish() {
    $('#lblIntlMove').text("İç hareket");
    $('#lblMAwbNo').text("Ana Konsimento");
    $('#lblbHWABNo').text("Ara Konsimento No");
    $('#lblFltChk').text("Ucus Detayları");
    $('#lblFromLocPcs').text("Nerden / Parca");
    $('#lblNewLoc').text("Yeni Lokasyon");
    $('#lblMovePcs').text("Paketleri Tasi");
    $('#lblOri').text("Cikis/Varis");
    $('#btnExit').text("Çıkış");
    $('#btnClear').text("Temizle");
    $('#btnSubmit').text("Gönder");
    $('#lblOrgDest').text("Származási hely / Végállomás");
}


function setHungarian() {

    $('#lblIntlMove').text("Átlokálás");
    $('#lblMAwbNo').text("Főfuvarlevél szám");
    $('#lblbHWABNo').text("Házi  fuvarlevél szám");
    $('#lblFltChk').text("Járat szám / dátum");
    $('#btnExit').text("Kilépés");
    $('#btnClear').text("Törlés");
    $('#btnSubmit').text("Jóváhagyás");
    $('#lblFromLocPcs').text("Lokációból / darab");
    $('#lblNewLoc').text("Új lokáció");
    $('#lblMovePcs').text("Darabok átrakása");

    $('#lblLoc1').text("Darabszám");
    $('#lblPcs').text("Lokáció");
    $('#lblOrgDest').text("Cikis/Varis");
}



function GetAWBDetails() {

    if ($("#txtScanMAWB").val() == '') {
        return;
    }

    //$("#txtScanMAWB")

    inputData = "<Root><AWBNo>" + $("#txtScanMAWB").val() + "</AWBNo><HouseNo></HouseNo><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>"
    $("#tblLocation").empty();
    $('body').mLoading({
        text: "Please Wait..",
    });
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetAWBDetails",
        data: JSON.stringify({ 'InputXML': inputData }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            console.log(response.d)
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {
                $("#btnDiv").show('slow');
                $("#tbTable").show('slow');
                // $("#tblLocation").show('slow');
                $("#LocationDiv").empty();
                $("#txtLocation").val('');
                $("#txtMovePkgs").val('');
                $("#textMoveWght").val('');
                $('#locationShow').text('');
                var xmlDoc = $.parseXML(str);

                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });

                    }

                    //else if (Status == 'S') {
                    //    $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    //}
                });

                $('#divAWBdetails').hide();
                $('#divAWBdetails').empty();
                $('#tblDetails').empty();
                $('#LocationDivForWt').empty();
                $("#LocationDiv").empty();
                html = '';
                $(xmlDoc).find('Table1').each(function (index) {
                    if (index == 0) {

                        AWB = $(this).find('AWB').text();
                        TotalNPX = $(this).find('TotalNPX').text();
                        TotalExpectedWeight = $(this).find('TotalExpectedWeight').text();
                        TotalNPR = $(this).find('TotalNPR').text();
                        TotalReceivedWeight = $(this).find('TotalReceivedWeight').text();
                        ORIGIN = $(this).find('ORIGIN').text();
                        DESTINATION = $(this).find('DESTINATION').text();
                        SHC = $(this).find('SHC').text();
                        ChrgWt = $(this).find('ChrgWt').text();
                        NOPDelivered = $(this).find('NOPDelivered').text();
                        ConsigneeName = $(this).find('ConsigneeName').text();
                        Description = $(this).find('Description').text();

                        shipSummeryDetails(ORIGIN, DESTINATION, ConsigneeName, Description, TotalNPX, TotalExpectedWeight);

                    }

                });
                html += "</tbody></table>";
                $('#divAWBdetails').show();
                $('#divAWBdetails').append(html);


                _html = '';

                _html += '<table id="tblLocation" border="1" style="width:100%;table-layout:fixed;word-break:break-word;border-color: #ccc;margin-top: 2%;">';
                _html += '<thead>';
                _html += '<tr><h5>Location Details</h5>';
                _html += '</tr>';
                _html += '<tr>';
                _html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;text-align:center;font-size:14px;text-transform: capitalize;" >Flight No.</th>';
                _html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;text-align:center;font-size:14px;text-transform: capitalize;" >Location</th>';
                _html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;text-align:center;font-size:14px;text-transform: capitalize;" >Pieces</th>';
                _html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;text-align:center;font-size:14px;text-transform: capitalize;" >Weight</th>';
                _html += '</tr>';
                _html += '</thead>';
                _html += '<tbody>';

                $(xmlDoc).find('Table2').each(function (index) {

                    FlightNo = $(this).find('FlightNo').text();
                    HouseNo = $(this).find('HouseNo').text();
                    PiecesAtLocation = $(this).find('PiecesAtLocation').text();
                    WeightAtLocation = $(this).find('WeightAtLocation').text();
                    Location = $(this).find('Location').text();

                    locationDetails(FlightNo, Location, PiecesAtLocation, WeightAtLocation);

                });

                _html += "</tbody></table>";
                $("#LocationDiv").show();
                $('#LocationDiv').append(_html);



                _html1 = '';

                _html1 += '<table id="tblLocation" border="1" style="width:100%;table-layout:fixed;word-break:break-word;border-color: #ccc;margin-top: 2%;">';
                _html1 += '<thead>';
                _html1 += '<tr><h5>WDO Details</h5>';
                _html1 += '</tr>';
                _html1 += '<tr>';
                _html1 += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;text-align:center;font-size:14px;text-transform: capitalize;" >WDO No.</th>';
                _html1 += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;text-align:center;font-size:14px;text-transform: capitalize;" >Pieces</th>';
                _html1 += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;text-align:center;font-size:14px;text-transform: capitalize;" >Weight</th>';
                _html1 += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;text-align:center;font-size:14px;text-transform: capitalize;" >Date</th>';
                _html1 += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;text-align:center;font-size:14px;text-transform: capitalize;" >Time</th>';

                _html1 += '</tr>';
                _html1 += '</thead>';
                _html1 += '<tbody>';

                $(xmlDoc).find('Table3').each(function (index) {

                    IMPSHIPROWID = $(this).find('IMPSHIPROWID').text();
                    WDONO = $(this).find('WDONO').text();
                    RELEASEDNOP = $(this).find('RELEASEDNOP').text();
                    RELEASEDWT = $(this).find('RELEASEDWT').text();
                    WDORelDate = $(this).find('WDORelDate').text();
                    WDORelTime = $(this).find('WDORelTime').text();

                    locationDetailsForWt(WDONO, RELEASEDNOP, RELEASEDWT, WDORelDate, WDORelTime);

                });

                _html1 += "</tbody></table>";
                $("#LocationDivForWt").show();
                $('#LocationDivForWt').append(_html1);


            } else {
                $("body").mLoading('hide');
                //errmsg = "WDO No. not found</br>";
                //$.alert(errmsg);
                //return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            //alert('Server not responding...');
            console.log(xhr.responseText);
            alert(xhr.responseText);
        }
    });
}

function shipSummeryDetails(ORIGIN, DESTINATION, ConsigneeName, Description, TotalNPX, TotalExpectedWeight) {

    html += '<table id="tblDetails" class="table table-striped table-bordered" style=" margin-bottom: 0px;font-size:14px; ">';
    html += '<h5>AWB Details</h5>';

    html += '<tbody>';
    html += '<tr>';
    html += '<td>Origin / Destination</td><td class="txtRight">' + ORIGIN + ' / ' + DESTINATION + '</td>';
    html += '</tr>';
    //html += '<tr>';
    //html += '<td>Destination</td><td class="txtRight">' + DESTINATION + '</td>';
    //html += '</tr>';
    html += '<tr>';
    html += '<td>Consignee Name</td><td class="txtRight">' + ConsigneeName + '</td>';
    html += '</tr>';
    html += '<tr>';
    html += '<td>Description</td><td class="txtRight">' + Description + '</td>';
    html += '</tr>';
    html += '<tr>';
    html += '<td>Total Pieces </td><td style="text-align:right;">' + TotalNPX + '</td>';
    html += '</tr>';
    html += '<tr>';
    html += '<td>Total Weight </td><td style="text-align:right;">' + TotalExpectedWeight + '</td>';
    html += '</tr>';

}


function locationDetails(FlightNo, Location, PiecesAtLocation, WeightAtLocation) {

    _html += '<td style="padding-left: 4px;font-size:14px;text-align:left;padding-right: 4px;">' + FlightNo + '</td>';
    _html += '<td style="padding-left: 4px;font-size:14px;text-align:left;padding-right: 4px;">' + Location + '</td>';
    _html += '<td style="padding-left: 4px;font-size:14px;text-align:right;padding-right: 4px;">' + PiecesAtLocation + '</td>';
    _html += '<td style="padding-left: 4px;font-size:14px;text-align:right;padding-right: 4px;">' + WeightAtLocation + '</td>';
    _html += '</tr>';

    // console.log(html)
}

function locationDetailsForWt(WDONO, RELEASEDNOP, RELEASEDWT, WDORelDate, WDORelTime) {

    _html1 += '<td style="padding-left: 4px;font-size:14px;text-align:left;padding-right: 4px;">' + WDONO + '</td>';
    _html1 += '<td style="padding-left: 4px;font-size:14px;text-align:right;padding-right: 4px;">' + RELEASEDNOP + '</td>';
    _html1 += '<td style="padding-left: 4px;font-size:14px;text-align:right;padding-right: 4px;">' + RELEASEDWT + '</td>';
    _html1 += '<td style="padding-left: 4px;font-size:14px;text-align:left;padding-right: 4px;">' + WDORelDate + '</td>';
    _html1 += '<td style="padding-left: 4px;font-size:14px;text-align:left;padding-right: 4px;">' + WDORelTime + '</td>';
    _html1 += '</tr>';

    // console.log(html)
}

function getLocation(LocCode, LocPieces, LocId, LocWeight) {

    //var str = data;
    //var Locpcs = str.substring(0, str.lastIndexOf("/"));
    //currentLocID = str.substring(str.lastIndexOf("/") + 2, str.length);
    //var pcs = str.substring(str.lastIndexOf("/") + 3, str.length);
    //var wt = str.substring(str.lastIndexOf("/") + 4, str.length);
    //$("#txtMovePkgs").val(pcs);
    //$("#textMoveWght").val(wt);
    //$("#locationShow").text(Locpcs);

    //const str = data.split("/");

    //var _loc = str[0];
    //var _pcs = str[1];
    //currentLocID = str[2];
    //var _wt = str[3];


    currentLocID = LocId;
    $("#txtMovePkgs").val(LocPieces);
    $("#textMoveWght").val(LocWeight);
    $("#locationShow").text(LocCode + "/" + LocPieces);



}

function exitFunction() {
    window.location.href = 'ExportOperations.html';
}

function clearFunction() {
    $("#txtScanMAWB").val('');
    $("#txtScanMAWB").focus();
    $('#divAWBdetails').hide();
    $('#divAWBdetails').empty();
    $('#tblDetails').empty();
    $('#LocationDivForWt').empty();
    $("#LocationDiv").empty();
}