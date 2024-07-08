var Userid = window.localStorage.getItem("Userid");
var SHED_AIRPORT_CITY = window.localStorage.getItem("SHED_AIRPORT_CITY");

$(function () {
    $('#txtScannedNo').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            GetVCTDimensionDetails();
        }

        event.stopPropagation();
    });

    $('#txtScannedLbl').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            ScanVCTPrintLabelDim();
        }

        event.stopPropagation();
    });

    $('#textLength').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('#textWidth').focus();
            calculateVolume();
        }

        event.stopPropagation();
    });
    $('#textWidth').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('#textHeight').focus();
            calculateVolume();
        }

        event.stopPropagation();
    });
    $('#textHeight').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            calculateVolume();
        }
        event.stopPropagation();
    });

    $(document).on('keypress', '#tblHeight', function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == 13) {
            calculateSelectedVolume();
        }
        event.stopPropagation();
    });
    $(document).on('keypress', '#tblLength', function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == 13) { 
            calculateSelectedVolume();
        }
        event.stopPropagation();
    });
    $(document).on('keypress', '#tblWidth', function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == 13) { 
            calculateSelectedVolume();
        }
        event.stopPropagation();
    });

});

function editDimension(dimId, barcodeLabel) {
    console.log(dimId + "-" + barcodeLabel);
    $("#lblNo").text(barcodeLabel);
    getSelectedLabelDim(dimId);
    $('#modalDimensionDetail').modal('show');
}

function deleteLabel(dimId) {
    deleteSelectedLabelDim(dimId);

}

function exitModal() {
    $('#modalDimensionDetail').modal('hide');
    $("#tableDimension").empty();
    $("#ibiSuccessMsg").text('');
}

function saveSelectedDimension() {
    saveSelectedLabelDim(selectedDimRowID, $("#tblLength").val(), $("#tblWidth").val(), $("#tblHeight").val(), $("#tblVolume").val());
}

function DimDoneList(barcodeLabel, dimId) {

    html += '<tr id="row1' + barcodeLabel + '">';
    html += '<td id="ActivityType' + barcodeLabel + '">' + barcodeLabel + '</td>';
    html += '<td style="padding: 2px; width: 50px; text-align: center;">';  // Adjust width as needed
    html += '<button type="button"  onclick="editDimension(\'' + dimId + '\', \'' + barcodeLabel + '\');" id="btnAdd" class="btn btn--icon login__block__btn login__block__btn_margin Delete" style="margin: 0 auto; display: block;">';
    html += '<i class="zmdi zmdi-edit"></i></button></td>';
    html += '<td style="padding: 2px; width: 50px; text-align: center;">';  // Adjust width as needed
    html += '<button type="button" style="background-color: red;" onclick="deleteLabel(\'' + dimId + '\'); " id="btnAdd" class="btn btn--icon login__block__btn login__block__btn_margin Delete" style="margin: 0 auto; display: block;">';
    html += '<i class="zmdi zmdi-minus"></i></button></td>';
    html += '</tr>';

}

function DimPendingList(barcodeName) {

    html1 += '<tr id="row1' + barcodeName + '">';
    html1 += '<td id="ActivityType' + barcodeName + '">' + barcodeName + '</td>';
    // html1 += '<td style="padding: 2px; width: 50px; text-align: center;">';  // Adjust width as needed
    // html1 += '<button type="button" style="background-color: red;" onclick="AWBRemarkDelete(\'' + barcodeName + '\'); removeRow();" id="btnAdd" class="btn btn--icon login__block__btn login__block__btn_margin Delete" style="margin: 0 auto; display: block;">';
    // html1 += '<i class="zmdi zmdi-minus"></i></button></td>';
    html1 += '</tr>';

}

function createDynamicDimensionTable(dimId, length, width, height, volume) {

    tblhtml = '';
    tblhtml += "<tr>";

    tblhtml += "<td >";
    tblhtml += "<input type='number' id='tblLength' value='" + length + "'  style='height: 30px;color:#2196F3;font-weight:bold;text-align:right;' class='textfieldClass clsField'>";
    tblhtml += "</td>";

    tblhtml += "<td >";
    tblhtml += "<input type='number' id='tblWidth' value='" + width + "'  style='height: 30px;color:#2196F3;font-weight:bold;text-align:right;' class='textfieldClass clsField'>";
    tblhtml += "</td>";

    tblhtml += "<td >";
    tblhtml += "<input type='number' id='tblHeight' value='" + height + "'   style='height: 30px;color:#2196F3;font-weight:bold;text-align:right;' class='textfieldClass clsField'>";
    tblhtml += "</td>";

    tblhtml += "<td >";
    tblhtml += "<input type='number' id='tblVolume' value='" + volume + "' style='height: 30px;color:#2196F3;font-weight:bold;text-align:right;' class='textfieldClass clsField'>";
    tblhtml += "</td>";
    tblhtml += "</tr>";

}

function GetVCTDimensionDetails() {
    $('body').mLoading({
        text: "Please Wait..",
    });

    if ($("#txtScannedNo").val() == '') {
        return;
    }
    var InputXML = "<Root><ScanCode>"+$("#txtScannedNo").val()+"</ScanCode><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>en-us</Culture><UserId>" + Userid + "</UserId></Root>"
    $.ajax({
        type: 'POST',
        url: ExpURL + "/GetVCTPrintLabelDim",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            console.log(response.d);
            $("#ddlDoorList").empty()
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    VCTNo = $(this).find('TokenNo').text();
                    MawbNo = $(this).find('DocumentNo').text();
                    HawbNo = $(this).find('HouseNo').text();
                    TotPcs = $(this).find('TotPcs').text();
                    ScannedPcs = $(this).find('ScannedPcs').text();
                    VCTRowId = $(this).find('VCTRowID').text();
                    $("#txtVCTNo").val(VCTNo);
                    $("#txtMAWBNo").val(MawbNo);
                    $("#txtHAWBNo").val(HawbNo);
                    $("#totPcsSpan").text(TotPcs);
                    $("#savedPcsSpan").text(ScannedPcs);

                });
                $('#divDimensionDone').empty();
                html = '';
                html += '<table id="tblDimentionAcceptance" class="table  table-bordered table-striped mb-0" style="border: 1px solid #eee;">';
                html += '<thead class="theadClass">';
                html += '<tr>';
                html += '<th id="lblRemark">Label</th>';
                html += '<th id="lbRemark">Edit</th>';
                html += '<th id="lbRemark">Delete</th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody class="">';
                $(xmlDoc).find('Table1').each(function (index) {

                    $('#lblMessage').text('');
                    barcodeLabel = $(this).find('BARCODE_LABEL_NUMBER').text();
                    dimId = $(this).find('DimRowID').text();
                    console.log("++++++" + barcodeLabel);
                    DimDoneList(barcodeLabel, dimId);
                });
                html += "</tbody></table>";
                $('#divDimensionDone').append(html);

                $('#divDimensionPending').empty();
                html1 = '';
                html1 += '<table id="tblDimentionAcceptance" class="table  table-bordered table-striped mb-0" style="border: 1px solid #eee;">';
                html1 += '<thead class="theadClass">';
                html1 += '<tr>';
                html1 += '<th id="lblRemark">Label</th>';

                html1 += '</tr>';
                html1 += '</thead>';
                html1 += '<tbody class="">';
                $(xmlDoc).find('Table2').each(function (index) {

                    $('#lblMessage').text('');
                    barcodeName = $(this).find('BARCODE_LABEL_NUMBER').text();
                    console.log("-------" + barcodeName);
                    DimPendingList(barcodeName);
                });
                html1 += "</tbody></table>";
                $('#divDimensionPending').append(html1);

                $(xmlDoc).find('Table3').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('OutMsg').text();

                });



            } else {
                $("body").mLoading('hide');
                //errmsg = "WDO No. not found</br>";
                //$.alert(errmsg);
                //return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });

}

function clearDimension(){
    $("#textLength").val('');
    $("#textWidth").val('');
    $("#textHeight").val('');
    $("#textVolume").val('')
}

function ScanVCTPrintLabelDim() {
    if ($("#txtScannedLbl").val() == '') {
        return;
    }
    if ($("#textLength").val() == '') {
        $.alert("Please enter Length.");
        return;
    }
    if ($("#textWidth").val() == '') {
        $.alert("Please enter Width.");
        return;
    }
    if ($("#textHeight").val() == '') {
        $.alert("Please enter Height.");
        return;
    }

    $('body').mLoading({
        text: "Please Wait..",
    });
    var InputXML = "<Root><ScanCode>" + $("#txtScannedLbl").val() + "</ScanCode><VCTRowID>" + VCTRowId + "</VCTRowID><Length>" + $("#textLength").val() + "</Length><Width>" + $("#textWidth").val() + "</Width><Height>" + $("#textHeight").val() + "</Height><Volume>" + $("#textVolume").val() + "</Volume><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
    $.ajax({
        type: 'POST',
        url: ExpURL + "/ScanVCTPrintLabelDim ",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            console.log(response.d);
            $("#ddlDoorList").empty()
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('OutMsg').text();
                    if (Status == "S") {
                        GetVCTDimensionDetails();
                        clearDimension();
                    }
                    if(Status=="E"){
                        $("#ibiSuccessMsg2").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                    }
                });
            } else {
                $("body").mLoading('hide');
                //errmsg = "WDO No. not found</br>";
                //$.alert(errmsg);
                //return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

function getSelectedLabelDim(dimId) {
    $('body').mLoading({
        text: "Please Wait..",
    });
    var InputXML = "<Root><DIMRowID>" + dimId + "</DIMRowID><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
    $.ajax({
        type: 'POST',
        url: ExpURL + "/GetSelectedLabelDim",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            console.log(response.d);
            $("#ddlDoorList").empty()
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    selectedDimRowID = $(this).find('DimRowID').text();
                    selectedLength = $(this).find('LENGTH').text();
                    selectedWidth = $(this).find('WIDTH').text();
                    selectedHeight = $(this).find('HEIGHT').text();
                    selectedVolume = $(this).find('VOLUME').text();
                    createDynamicDimensionTable(selectedDimRowID, selectedLength, selectedWidth, selectedHeight, selectedVolume);
                    $('#tableDimension').append(tblhtml);
                    $('#tableDimension').show();
                });



            } else {
                $("body").mLoading('hide');
                //errmsg = "WDO No. not found</br>";
                //$.alert(errmsg);
                //return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

function saveSelectedLabelDim(dimId, length, width, height, volume) {
    $('body').mLoading({
        text: "Please Wait..",
    });
    var InputXML = "<Root><DimRowID>" + dimId + "</DimRowID><Length>" + length + "</Length><Width>" + width + "</Width><Height>" + height + "</Height><Volume>" + volume + "</Volume><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
    $.ajax({
        type: 'POST',
        url: ExpURL + "/SaveSelectedLabelDim",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            console.log(response.d);
            $("#ddlDoorList").empty()
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('OutMsg').text();
                    if(Status=="S"){
                        exitModal();
                    }
                    if(Status=="E"){
                        $("#ibiSuccessMsg").text(StrMessage).css({ "color": "Red", "font-weight": "bold" });
                    }

                });



            } else {
                $("body").mLoading('hide');
                //errmsg = "WDO No. not found</br>";
                //$.alert(errmsg);
                //return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

function deleteSelectedLabelDim(dimId) {
    $('body').mLoading({
        text: "Please Wait..",
    });
    var InputXML = "<Root><DimRowID>"+dimId+"</DimRowID><AirportCity>"+SHED_AIRPORT_CITY+"</AirportCity><UserId>"+Userid+"</UserId></Root>";
    $.ajax({
        type: 'POST',
        url: ExpURL + "/DeleteSelectedLabelDim",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            console.log(response.d);
            $("#ddlDoorList").empty()
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('OutMsg').text();
                    if(Status=="S"){
                        GetVCTDimensionDetails();
                    }
                });

            } else {
                $("body").mLoading('hide');
                //errmsg = "WDO No. not found</br>";
                //$.alert(errmsg);
                //return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
}

function calculateVolume() {
    // $('body').mLoading({
    //     text: "Please Wait..",
    // });
    if ($("#textLength").val() == '' || $("#textWidth").val() == '' || $("#textHeight").val() == '') {
        return;
    }
    var InputXML = "<Root><Length>" + $("#textLength").val() + "</Length><Width>" + $("#textWidth").val() + "</Width><Height>" + $("#textHeight").val() + "</Height><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>"
    $.ajax({
        type: 'POST',
        url: ExpURL + "/CalculateDimVolume",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            console.log(response.d);
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    volume = $(this).find('OutMsg').text();
                    if (Status == "S") {
                        $("#textVolume").val(volume);
                    }
                });
            } else {
                $("body").mLoading('hide');
                //errmsg = "WDO No. not found</br>";
                //$.alert(errmsg);
                //return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });

}

function calculateSelectedVolume() {
    // $('body').mLoading({
    //     text: "Please Wait..",
    // });
    if ($("#tblLength").val() == '' || $("#tblWidth").val() == '' || $("#tblHeight").val() == '') {
        return;
    }
    var InputXML = "<Root><Length>" + $("#tblLength").val() + "</Length><Width>" + $("#tblWidth").val() + "</Width><Height>" + $("#tblHeight").val() + "</Height><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>"
    $.ajax({
        type: 'POST',
        url: ExpURL + "/CalculateDimVolume",
        data: JSON.stringify({ 'InputXML': InputXML }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            HideLoader();
            var str = response.d;
            console.log(response.d);
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    Status = $(this).find('Status').text();
                    volume = $(this).find('OutMsg').text();
                    if (Status == "S") {
                        $("#tblVolume").val(volume);
                    }
                });
            } else {
                $("body").mLoading('hide');
                //errmsg = "WDO No. not found</br>";
                //$.alert(errmsg);
                //return;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });

}

function clearFunction() {
    $("#txtScannedNo").val('');
    $("#txtVCTNo").val('');
    $("#txtMAWBNo").val('');
    $("#txtHAWBNo").val('');
    $("#textLength").val('');
    $("#textWidth").val('');
    $("#textHeight").val('');
    $("#textVolume").val('');
    $("#txtScannedLbl").val('');
    $("#totPcsSpan").text('');
    $("#savedPcsSpan").text('');
    $("#ibiSuccessMsg").text('');
    $("#ibiSuccessMsg1").text('');
    $("#ibiSuccessMsg2").text('');
    $('#divDimensionDone').empty();
    $('#divDimensionPending').empty();
   
}

function fnExit() {
    window.location.href = 'ExportOperations.html';
}



