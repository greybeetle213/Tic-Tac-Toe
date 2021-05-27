function closePopup(popUpFunction){
    if(popUpFunction != undefined){ //if a function has been given
        popUpFunction() //run it
    }
    $("#popup").css("visibility", "hidden") //close the popup
}
popup = {
    alert:function(title, content, prompt="close", onclose="") {
        $("#popupTitle").html(title)
        $("#popupText").html(content)
        $("#popupButtons").html("<button id='popupButton' onclick='closePopup("+onclose+")'>"+prompt+"</button>") //make a button
        $("#popup").css("visibility", "visible") //show the popup
    },
    confirm:function(title,content,accept,deny,on_accept="",on_deny=""){
        $("#popupTitle").html(title)
        $("#popupText").html(content)
        $("#popupButtons").html("<button id='popupButton' onclick='closePopup("+on_accept+")'>"+accept+"</button> <button id='popupButton2' onclick='closePopup("+on_deny+")'>"+deny+"</button>")
        $("#popup").css("visibility", "visible") //show the popup
    }
}
