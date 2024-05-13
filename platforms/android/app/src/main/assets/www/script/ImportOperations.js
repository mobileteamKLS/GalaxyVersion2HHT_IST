

var Column1ForBeakdown = window.localStorage.getItem("Column1ForBeakdown");
var pageXMLArray = window.localStorage.getItem("pageXMLArray");
var PARAMETER_VALUE_for_WDOScanOnAWBHHT = window.localStorage.getItem("PARAMETER_VALUE_for_WDOScanOnAWBHHT");
(function () {
    document.addEventListener('backbutton', onBackKeyDown, false);
    //document.addEventListener('deviceready', DropDown, false);

    setTimeout(function () {
        window.location.href = 'Login.html'
    }, 1200000);
}
)();



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

    if (Column1ForBeakdown == 'Y') {
        $("#divBreakdown").show();
    } else {
        $("#divBreakdown").hide();
    }

    if (PARAMETER_VALUE_for_WDOScanOnAWBHHT == 'Y') {
        $("#divWDORelease").show();
    } else {
        $("#divWDORelease").hide();
    }

    onPageShowHideImport();

});


function setTurkish() {
    //$('#ImpTitle').html("Gösterge Tablosunu Içe Aktar");
    $('#lblFlCheckIn').text("Ucus Check In");
    $('#lblDocUpload').text("Belge Yukleme");
    $('#lblLocation').text("Lokasyon");
    $('#lblIntMov').text("İç hareket");
    $('#lblWDO').text("Depo Teslim Siparişi");
}

function setHungarian() {
    $('#lblFlCheckIn').text("Járat érkeztetés");
    $('#lblDocUpload').text("Okmány feltöltés");
    $('#lblLocation').text("Lokáció");
    $('#lblIntMov').text("Átlokálás");
    $('#lblWDO').text("Árukiadás");



}


function onBackKeyDown() {
    if ($('#divDashBoardImport').is(':visible')) {
        $('#divMode').show();
        $('#divDashBoardImport').hide();
        $('#divDashBoardExport').hide();
    }
    else if ($('#divDashBoardExport').is(':visible')) {
        $('#divMode').show();
        $('#divDashBoardImport').hide();
        $('#divDashBoardExport').hide();
    }
    else {
        navigator.app.backHistory();
    }
}
function DropDownClick() {
    //if (element.id == "aImport") {
    //    if ($('#aImport').attr('aria-expanded').toString() == "false") {
    //        $('#divMain').removeClass("VerticallyCenter");
    //    }
    //    else {
    //        $('#divMain').addClass("VerticallyCenter");
    //    }
    //}
    //else if (element.id == "aExport") {
    //    if ($('#aExport').attr('aria-expanded').toString() == "false") {
    //        $('#divMain').removeClass("VerticallyCenter");
    //    }
    //    else {
    //        $('#divMain').addClass("VerticallyCenter");
    //    }
    //}

    if ($('#btnnavbar').attr('aria-expanded').toString() == "false") {
        $('#divMain').removeClass("VerticallyCenter");
    }
    else {
        $('#divMain').addClass("VerticallyCenter");
    }

}
function DisplayScreen(Mode) {
    if (Mode == "FlightCheckIn") {
        window.location.href = "IMP_FlightCheckIn.html";
    }
    else if (Mode == "DocsUpload") {
        window.location.href = "IMP_DocsUpload.html";
    }
    else if (Mode == "Location") {
        window.location.href = "IMP_Location.html";
    }
    else if (Mode == "InternalMovement") {
        localStorage.setItem('InternalMovement', 'InternalMovement');
        window.location.href = "IMP_InternalMovement.html";
    }
    else if (Mode == "WDO") {
        localStorage.setItem('WDO', 'WDO');
        window.location.href = "IMP_WDO.html";
    }
    else if (Mode == "AWBRemarks") {
        localStorage.setItem('Is_I_E', 'I');
        window.location.href = "IMP_AWBRemarks.html";
    }
    else if (Mode == "Breakdown") {
        localStorage.setItem('IMP_Breakdown_Parant', 'IMP_Breakdown_Parant');
        window.location.href = "IMP_Breakdown_Parant.html";
    }

    else if (Mode == "IMP_WDORelease") {
        localStorage.setItem('IMP_WDORelease', 'IMP_WDORelease');
        window.location.href = "IMP_WDORelease.html";
    }
}

function onPageShowHideImport() {

    var pageXmlDoc = $.parseXML(pageXMLArray);
    $(pageXmlDoc).find('Table2').each(function (index) {

        PageName = $(this).find('PageName').text();
        IsActive = $(this).find('IsActive').text();
        Module = $(this).find('Module').text();

        if (index == 0) {
            if (Module == 'Import' && PageName == 'IMP_AWBRemarks.html' && IsActive == '1') {
                $("#AWBRemarks").show();
            } else {
                $("#AWBRemarks").hide();

            }
        }

        if (index == 1) {
            if (Module == 'Import' && PageName == 'IMP_Breakdown_Parant.html' && IsActive == '1') {
                $("#divBreakdown").show();
            } else {
                $("#divBreakdown").hide();
            }
        }

        if (index == 2) {
            if (Module == 'Import' && PageName == 'IMP_DocsUpload.html' && IsActive == '1') {
                $("#DocsUpload").show();
            } else {
                $("#DocsUpload").hide();
            }
        }

        if (index == 3) {

            if (Module == 'Import' && PageName == 'IMP_FlightCheckIn.html' && IsActive == '1') {

           // if (Module == 'Import' && Module == 'Import' && PageName == 'IMP_FlightCheckIn.html' && IsActive == '1') {

                $("#FlightCheckIn").show();
            } else {
                $("#FlightCheckIn").hide();

            }
        }

        if (index == 4) {
            if (Module == 'Import' && PageName == 'IMP_InternalMovement.html' && IsActive == '1') {
                $("#InternalMovement").show();
            } else {
                $("#InternalMovement").hide();
            }
        }

        if (index == 5) {
            if (Module == 'Import' && PageName == 'IMP_Location.html' && IsActive == '1') {
                $("#Location").show();
            } else {
                $("#Location").hide();
            }
        }

        if (index == 6) {
            if (Module == 'Import' && PageName == 'IMP_WDO.html' && IsActive == '1') {
                $("#WDO").show();
            } else {
                $("#WDO").hide();
            }
        }



        if (Module == 'Import' && PageName == 'IMP_WDORelease.html' && IsActive == '1') {
            $("#divWDORelease").show();
        } else {
            $("#divWDORelease").hide();
        }


    });

}
