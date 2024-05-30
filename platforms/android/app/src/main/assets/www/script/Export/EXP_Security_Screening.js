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

var ScanType, AWBROWID, SHIPROWID, HAWBROWID, Commodity, CommodityGroup, MAWB, HAWB, Pieces, GrWt, ChWt, origin, dest, screenedPcs, totPcs, screeningPcs;
const screeningMethodList = [];
const ExemptCargoList = [];
var screenMethodIdRow = "", exemptCargoIdRow = "";
var checkedItems, checkedItems2;

$(function () {
    $('#checkbox-list2').hide();
    $("#btnSaveScreeningDetails").click(function () {
        $('body').mLoading({
            text: "Please Wait..",
        });
        if ($("#txtScreeningPcs").val() == '') {
            $("body").mLoading('hide');
            errmsg = "Please enter Screening Pieces</br>";
            $.alert(errmsg);
            return;
        }

        if ($('#ddlMachineNos').find("option:selected").val() == '0') {
            $("body").mLoading('hide');
            errmsg = "Please select Machine No.</br>";
            $.alert(errmsg);
            return;
        }

        checkedItems = screeningMethodList.filter(item => $(`#${$.escapeSelector(item.text)}`).is(':checked')).map(item => item.text);
        console.log(checkedItems);
        if (checkedItems.length === 0) {
            $("body").mLoading('hide');
            $.alert("Please select at least one Screening Method.");
            return;
        }




        if ($('#checkbox-list2').is(':visible')) {
           checkedItems2 = ExemptCargoList.filter(item => $(`#${$.escapeSelector(item.text)}`).is(':checked')).map(item => item.text);
            console.log(checkedItems2);
            if (checkedItems2.length === 0) {
                $("body").mLoading('hide');
                $.alert("Please select atleast one Exempt Cargo.");
                return;
            }
        }

        getRowValues();
        console.log(screenMethodIdRow);
        console.log(exemptCargoIdRow);
        if (ScanType == "G") {
            var inputxml = "<Root><AWBNumber>" + $("#txtAWBNo").val() + "</AWBNumber><HouseNumber>" + $("#txtHawbNo").val() + "</HouseNumber><AWBROWID>" + AWBROWID + "</AWBROWID><SHIPROWID>" + SHIPROWID + "</SHIPROWID><HAWBROWID>" + HAWBROWID + "</HAWBROWID><ScreeningPieces>" + screeningPcs + "</ScreeningPieces><Origin>" + origin + "</Origin><DESTINATION>" + dest + "</DESTINATION><Commodity>" + Commodity + "</Commodity><CommodityGroup>" + CommodityGroup + "</CommodityGroup><SecurityStatusID>" + $("#ddlSecurityStatus").val() + "</SecurityStatusID><SecurityId>" + $("#ddlSecurityType").val() + "</SecurityId><MachineNo>" + $("#ddlMachineNos").val() + "</MachineNo><GroupID>" + $("#txtScanId").val() + "</GroupID><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId>" + screenMethodIdRow + "" + exemptCargoIdRow + "</Root";
            console.log(inputxml);
            saveDetails(inputxml);
        }
        else {
            var inputxml = "<Root><AWBNumber>" + $("#txtAWBNo").val() + "</AWBNumber><HouseNumber>" + $("#txtHawbNo").val() + "</HouseNumber><AWBROWID>" + AWBROWID + "</AWBROWID><SHIPROWID>" + SHIPROWID + "</SHIPROWID><HAWBROWID>" + HAWBROWID + "</HAWBROWID><ScreeningPieces>" + screeningPcs + "</ScreeningPieces><Origin>" + origin + "</Origin><DESTINATION>" + dest + "</DESTINATION><Commodity>" + Commodity + "</Commodity><CommodityGroup>" + CommodityGroup + "</CommodityGroup><SecurityStatusID>" + $("#ddlSecurityStatus").val() + "</SecurityStatusID><SecurityId>" + $("#ddlSecurityType").val() + "</SecurityId><MachineNo>" + $("#ddlMachineNos").val() + "</MachineNo><GroupID></GroupID><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId>" + screenMethodIdRow + "" + exemptCargoIdRow + "</Root";
            console.log(inputxml);
            saveDetails(inputxml);
        }
    });

    $('#txtScanId').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('body').mLoading({
                text: "Please Wait..",
            });
            if ($("#txtScanId").val() == '') {
                $("body").mLoading('hide');
                errmsg = "Please Scan Id</br>";
                $.alert(errmsg);
                return;
            } else {
                inputxml = "<Root><ScanCode>" + $("#txtScanId").val() + "</ScanCode><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
                searchDetails(inputxml);
            }
        }
        event.stopPropagation();
    });

    $('#ddlSecurityType').change(function () {
        const selectedValue = $(this).val();
        if (selectedValue === '1') {
            $('#checkbox-list2').show();
        } else {
            $('#checkbox-list2').hide();
        }
    });
});

function getRowValues() {
   var checkedItemsRow = screeningMethodList.filter(item => $(`#${$.escapeSelector(item.text)}`).is(':checked')).map(item => item.valueId);
    screenMethodIdRow = "";
    console.log(checkedItemsRow);
    screenMethodIdRow += "<ScreeningMethod><Rows>"
    for (const item of checkedItemsRow) {
        screenMethodIdRow += "<ScreeningMethodID>" + parseInt(item) + "</ScreeningMethodID>";
        screenMethodIdRow += "<Pieces>" + $("#txtScreeningPcs").val() + "</Pieces>";
    }
    screenMethodIdRow += "</Rows></ScreeningMethod>"

   var checkedItemsRow2 = ExemptCargoList.filter(item => $(`#${$.escapeSelector(item.text)}`).is(':checked')).map(item => item.valueId);
    exemptCargoIdRow = "";
    console.log(checkedItemsRow2);
    exemptCargoIdRow += "<ExemptCargo><Rows>"
    for (const item of checkedItemsRow2) {
        exemptCargoIdRow += "<ExemptCargoID>" + parseInt(item) + "</ExemptCargoID>"
    }
    exemptCargoIdRow += "</Rows></ExemptCargo>"
}

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
                        $(".ibiSuccessMsg2").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
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


                    MAWB = $(this).find('AWBNumber').text();
                    HAWB = $(this).find('HouseNumber').text();
                    Pieces = $(this).find('NPR').text();
                    GrWt = $(this).find('AWBWtRec').text();
                    ChWt = $(this).find('CHWeight').text();
                    origin = $(this).find('Origin').text();
                    dest = $(this).find('DESTINATION').text();
                    screenedPcs = $(this).find('TotalScanPiecs').text();
                    totPcs = $(this).find('NPR').text();
                    ScanType = $(this).find('ScanType').text();
                    AWBROWID = $(this).find('AWBROWID').text();
                    SHIPROWID = $(this).find('SHIPROWID').text();
                    HAWBROWID = $(this).find('HAWBROWID').text();
                    Commodity = $(this).find('Commodity').text();
                    CommodityGroup = $(this).find('CommodityGroup').text();

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

                $(xmlDoc).find('Table1').each(function (index) {
                    valueID = $(this).find('DataValue').text();
                    dataText = $(this).find('DataText').text();

                    const item = { valueId: valueID, text: dataText };
                    // console.log(item);
                    screeningMethodList.push(item);
                    console.log();
                });

                $('#checkbox-list').html(createCheckBoxList());


                $(xmlDoc).find('Table4').each(function (index) {
                    valueID = $(this).find('DataValue').text();
                    dataText = $(this).find('DataText').text();

                    const item = { valueId: valueID, text: dataText };
                    // console.log(item);
                    ExemptCargoList.push(item);
                });

                $('#checkbox-list2').html(createCheckBoxList2());

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
    $("#txtHawbNo").val('');
    $("#txtScreeningPcs").val('');
    $("#spnPieceGrWtChgWt").text('');
    $("#spnOriginDest").text('');
    $("#spnScreenedTotPcs").text('');
    resetDropDown("#ddlSecurityStatus");
    resetDropDown("#ddlSecurityType");
    resetDropDown('#ddlMachineNos');
    $('#checkbox-list').html('');
    $('#checkbox-list2').html('');
    ExemptCargoList.length = 0;
    screeningMethodList.length = 0;
    $('#checkbox-list2').hide();
    $(".ibiSuccessMsg1").text('');
    $(".ibiSuccessMsg2").text('');
}
function createCheckBoxList(List) {

    html = '';
    for (let item = 0; item < screeningMethodList.length; item++) {
        // console.log(List[item].valueId);
        html += `<div class="checkbox"> <input type="checkbox" id="${screeningMethodList[item].text}" name="${screeningMethodList[item].valueId}" value="${screeningMethodList[item].valueId}">
        <label style="color: #444343;" class="checkbox__label" for="${screeningMethodList[item].text}">${screeningMethodList[item].text}</label></div>`;
    }
    return html;

}
function createCheckBoxList2(List) {

    html = '';
    for (let item1 = 0; item1 < ExemptCargoList.length; item1++) {
        // console.log(List[item].valueId);
        html += `<div class="checkbox"> <input type="checkbox" id="${ExemptCargoList[item1].text}" name="${ExemptCargoList[item1].valueId}" value="${ExemptCargoList[item1].valueId}">
        <label style="color: #444343;" class="checkbox__label" for="${ExemptCargoList[item1].text}">${ExemptCargoList[item1].text}</label></div>`;
    }
    return html;

}

function resetDropDown(id) {
    $(id).empty();
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo(id);
}

function saveDetails(inputXML) {
    $.ajax({
        type: 'POST',
        url: ExpURL + "/HHTSAVEEXPSCREENINGDATA",
        data: JSON.stringify({ 'InputXML': inputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            console.log(response.d)
            HideLoader();
            var str = response.d;
            if (str != null && str != "" && str != "<NewDataSet />") {

                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        fnClear();
                        $(".ibiSuccessMsg1").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                        
                        return;

                    }
                    // else if (Status == 'S') {
                    //     $(".ibiSuccessMsg1").text(StrMessage).css({ 'color': 'green', "font-weight": "bold" });

                    // } else {
                    //     $(".ibiSuccessMsg1").text('');
                    // }
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