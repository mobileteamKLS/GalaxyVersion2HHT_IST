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

$(function () {

    // $("#btnSearch").click(function () {
    //     $('body').mLoading({
    //         text: "Please Wait..",
    //     });
    //     if ($("#txtScanMAWB").val() == '') {
    //         $("body").mLoading('hide');
    //         errmsg = "Please enter Barcode No.</br>";
    //         $.alert(errmsg);
    //         return;
    //     } else {
    //         inputxml = "<Root><GroupID>" + $("#txtScanMAWB").val() + "</GroupID><UserId>" + Userid + "</UserId><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity></Root>";
    //         searchDetails(inputxml);
    //     }

    // });

    $('#txtScanId').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('body').mLoading({
                text: "Please Wait..",
            });
            if ($("#txtScanId").val() == '') {
                $("body").mLoading('hide');
                errmsg = "Please Scan No.</br>";
                $.alert(errmsg);
                return;
            } else {
                inputxml = "<Root><ScanCode>" + $("#txtScanId").val() + "</ScanCode><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
                searchDetails(inputxml);
            }
        }
        event.stopPropagation();
    });
});

searchDetails = function (InputXML) {

    $.ajax({
        type: 'POST',
        url: ExpURL + "/HHTGETEXPSCREENINGDATA",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d)
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {

                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table6').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                        return;
                        //clearRecords();
                    }
                    // else if (Status == 'S') {
                    //     $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    // } else {
                    //     $(".ibiSuccessMsg1").text('');
                    // }
                });
                $(xmlDoc).find('Table').each(function (index) {
                    var MAWB, HAWB, Pieces, GrWt, ChWt, origin, dest, screenedPcs, totPcs;

                    MAWB = $(this).find('AWBNumber').text();
                    HAWB = $(this).find('HouseNumber').text();
                    Pieces = $(this).find('NPR').text();
                    GrWt = $(this).find('AWBWtRec').text();
                    ChWt = $(this).find('CHWeight').text();
                    origin = $(this).find('Origin').text();
                    dest = $(this).find('DESTINATION').text();
                    screenedPcs = $(this).find('TotalScanPiecs').text();
                    totPcs = $(this).find('NPR').text();

                    $("#txtAWBNo").val(MAWB);
                    $("#txtHawbNo").val(HAWB);
                    $("#spnPieceGrWtChgWt").text(Pieces + " / " + GrWt + " / " + ChWt);
                    $("#spnOriginDest").text(origin + " / " + dest);
                    $("#spnScreenedTotPcs").text(screenedPcs + " / " + totPcs);
                });

                $('#ddlSecurityStatus').empty();
                $(xmlDoc).find('Table2').each(function (index) {
                    DataValue = $(this).find('Identifier').text();
                    DataText = $(this).find('DataText').text();
                    defaultvalue = $(this).find('DataText').text();
                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlSecurityStatus');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(DataValue).text(DataText);
                    newOption.appendTo('#ddlSecurityStatus');
                    $("#ddlSecurityStatus").val($(this).find('DefaultSelected').text());
                });


                $('#ddlSecurityType').empty();
                $(xmlDoc).find('Table3').each(function (index) {
                    DataValue = $(this).find('DataValue').text();
                    DataText = $(this).find('DataText').text();

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlSecurityType');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(DataValue).text(DataText);
                    newOption.appendTo('#ddlSecurityType');
                    $("#ddlSecurityType").val($(this).find('DefaultSelected').text());
                });

                $('#ddlMachineNos').empty();
                $(xmlDoc).find('Table5').each(function (index) {
                    MacID = $(this).find('MacId').text();
                    MachineName = $(this).find('MachineName').text();

                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlMachineNos');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(MacID).text(MachineName);
                    newOption.appendTo('#ddlMachineNos');
                });

            } else {
                $("body").mLoading('hide');
                errmsg = "Record not found</br>";
                $.alert(errmsg);
                return;
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

function fnClear() {
    $('#txtScanId').val('');
    $("#txtAWBNo").val('');
    $("#txtHawbNo").val();
    $("#spnPieceGrWtChgWt").text('');
    $("#spnOriginDest").text('');
    $("#spnScreenedTotPcs").text('');
    resetDropDown("#ddlSecurityStatus");
    resetDropDown("#ddlSecurityType");
    resetDropDown('#ddlMachineNos');

}

function resetDropDown(id) {
    $(id).empty();
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo(id);
}