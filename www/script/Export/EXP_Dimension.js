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
});

function editDimension(data) {
    console.log(data);
    getSelectedLabelDim(data);
    $('#modalDimensionDetail').modal('show');
}

function exitModal() {
    $('#modalDimensionDetail').modal('hide');
    $("#tableDimension").empty();
    $("#ibiSuccessMsg").text('');
}

function DimDoneList(barcodeLabel, dimId) {

    html += '<tr id="row1' + barcodeLabel + '">';
    html += '<td id="ActivityType' + barcodeLabel + '">' + barcodeLabel + '</td>';
    html += '<td style="padding: 2px; width: 50px; text-align: center;">';  // Adjust width as needed
    html += '<button type="button"  onclick="editDimension(\'' + dimId + '\');" id="btnAdd" class="btn btn--icon login__block__btn login__block__btn_margin Delete" style="margin: 0 auto; display: block;">';
    html += '<i class="zmdi zmdi-edit"></i></button></td>';
    html += '<td style="padding: 2px; width: 50px; text-align: center;">';  // Adjust width as needed
    html += '<button type="button" style="background-color: red;" onclick="AWBRemarkDelete(\'' + dimId + '\'); removeRow();" id="btnAdd" class="btn btn--icon login__block__btn login__block__btn_margin Delete" style="margin: 0 auto; display: block;">';
    html += '<i class="zmdi zmdi-minus"></i></button></td>';
    html += '</tr>';

}
function RemarkListDetails1(barcodeName) {

    html1 += '<tr id="row1' + barcodeName + '">';
    html1 += '<td id="ActivityType' + barcodeName + '">' + barcodeName + '</td>';
    // html1 += '<td style="padding: 2px; width: 50px; text-align: center;">';  // Adjust width as needed
    // html1 += '<button type="button" style="background-color: red;" onclick="AWBRemarkDelete(\'' + barcodeName + '\'); removeRow();" id="btnAdd" class="btn btn--icon login__block__btn login__block__btn_margin Delete" style="margin: 0 auto; display: block;">';
    // html1 += '<i class="zmdi zmdi-minus"></i></button></td>';
    html1 += '</tr>';

}

function GetVCTDimensionDetails() {
    $('body').mLoading({
        text: "Please Wait..",
    });

    if ($("#txtScannedNo").val() == '') {
        return;
    }
    var InputXML = "<Root><ScanCode>0000083148</ScanCode><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><Culture>en-us</Culture><UserId>" + Userid + "</UserId></Root>"
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
                html1 += '<th id="lblRemark">Activity</th>';

                html1 += '</tr>';
                html1 += '</thead>';
                html1 += '<tbody class="">';
                $(xmlDoc).find('Table2').each(function (index) {

                    $('#lblMessage').text('');
                    barcodeName = $(this).find('BARCODE_LABEL_NUMBER').text();
                    console.log("-------" + barcodeName);
                    RemarkListDetails1(barcodeName);
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

function getSelectedLabelDim() {
    $('body').mLoading({
        text: "Please Wait..",
    });
    var InputXML = "<Root><DIMRowID>1</DIMRowID><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
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

function saveSelectedLabelDim() {
    $('body').mLoading({
        text: "Please Wait..",
    });
    var InputXML = "<Root><DimRowID>1</DimRowID><Length>15</Length><Width>14</Width><Height>12</Height><Volume>0.2</Volume><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
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

function deleteSelectedLabelDim() {
    $('body').mLoading({
        text: "Please Wait..",
    });
    var InputXML = "<Root><DIMRowID>1</DIMRowID><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>";
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

function calculateVolume() {
    $('body').mLoading({
        text: "Please Wait..",
    });
    var InputXML = "<Root><Length>10</Length><Width>20</Width><Height>15</Height><AirportCity>" + SHED_AIRPORT_CITY + "</AirportCity><UserId>" + Userid + "</UserId></Root>"
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
            $("#ddlDoorList").empty()
            if (str != null && str != "" && str != "<NewDataSet />") {
                var xmlDoc = $.parseXML(str);
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



