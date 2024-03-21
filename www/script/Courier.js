var OrgName = localStorage.getItem('OrgName');
var pageXMLArray = window.localStorage.getItem("pageXMLArray");
(function () {

    setTimeout(function () {
        window.location.href = 'Login.html'
    }, 1200000);
    document.addEventListener('backbutton', onBackKeyDown, false);
    //document.addEventListener('deviceready', DropDown, false);
  //  $(".titleFont").html(OrgName);
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
    }

    onPageShowHideCourier();

});

function setHungarian() {
    $('#lblFltChekIn').text("Járat érkeztetés");
    $('#lblBin').text("Számlázási");
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
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    document.addEventListener("backbutton", function (e) {
        e.preventDefault();
        navigator.notification.confirm("Are you sure want to Logout from App?", onConfirmExit, "Confirmation", "Yes,No");
    }, false);
}
function onConfirmExit(button) {
    if (button == 2) { //If User select a No, then return back;
        return;
    } else {
        location.href = "Login.html";
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
    localStorage.removeItem('fsqno');
    if (Mode == "CourierFlightCheckIn") {
        window.location.href = "CourierFlightCheckIn.html";
        window.localStorage.setItem("c_flag", '0');
       
        localStorage.setItem('Mode', 'CourierFlightCheckIn');
    } else if (Mode == "Binning") {
        window.location.href = "CourierBinning.html";
       
        localStorage.setItem('Mode', 'Binning');
    } else if (Mode == 'CourierFlightCheckInMPSLevel') {
        window.location.href = "CourierFlightCheckInMPSLevel.html";
        localStorage.setItem('Mode', 'CourierFlightCheckInMPSLevel');
    } else if (Mode == 'BinningMPSLevel') {
        window.location.href = "BinningMPSLevel.html";
        localStorage.setItem('Mode', 'BinningMPSLevel');
    }
    else if (Mode == "AWBRemarks") {
        localStorage.setItem('Is_I_E', 'C');
        window.location.href = "IMP_AWBRemarks.html";
    }
}


function onPageShowHideCourier() {

    var pageXmlDoc = $.parseXML(pageXMLArray);
    $(pageXmlDoc).find('Table4').each(function (index) {

        PageName = $(this).find('PageName').text();
        IsActive = $(this).find('IsActive').text();
        Module = $(this).find('Module').text();

        if (index == 0) {
            if (Module == 'Courier' && PageName == 'BinningMPSLevel.html' && IsActive == '1') {
                $("#BinningMPSLevel").show();
            } else {
                $("#BinningMPSLevel").hide();

            }
        }

        if (index == 1) {
            if (Module == 'Courier' && PageName == 'CourierBinning.html' && IsActive == '1') {
                $("#Binning").show();
            } else {
                $("#Binning").hide();
            }
        }

        if (index == 2) {
            if (Module == 'Courier' && PageName == 'CourierFlightCheckIn.html' && IsActive == '1') {
                $("#CourierFlightCheckIn").show();
            } else {
                $("#CourierFlightCheckIn").hide();
            }
        }

        if (index == 3) {
            if (Module == 'Courier' && PageName == 'CourierFlightCheckInMPSLevel.html' && IsActive == '1') {
                $("#CourierFlightCheckInMPSLevel").show();
            } else {
                $("#CourierFlightCheckInMPSLevel").hide();

            }
        }

        if (index == 4) {
            if (Module == 'Courier' && PageName == 'IMP_AWBRemarks.html' && IsActive == '1') {
                $("#AWBRemarks").show();
            } else {
                $("#AWBRemarks").hide();
            }
        }


    });

}