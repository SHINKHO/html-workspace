const panelProperty = {
    width: "80%",
};

$(document).ready(function () {
    let movingdiv = $("#scroller");
    movingdiv.position().left = 0;
    $("body").on("mouseover", function (e) {
        let mouse_x_coordinate = e.pageX;
        let mouse_y_coordinate = e.pageY;
        $("#mouseprinter").text(
            "mouse position:" + mouse_x_coordinate + "," + mouse_y_coordinate
        );
    });
    
    /**
    $("body").on("mousewheel", function (e) {
        let amount = 0;/
        if (e.originalEvent.deltaY > 0 || e.originalEvent.deltaX > 0) {
            amount = -80;
        } else {
            amount = -80;
        }
        moveDiv(movingdiv, amount);
        let element_lf = movingdiv.children().first()
        console.log('element_lf.left width',element_lf.offset().left , element_lf.width());
        
        if(element_lf.offset().left+element_lf.width()<0){
            moveLeftmostElement(movingdiv);
            movingdiv.css("left",0);
        }
    });
    */
    $("#button_to_left").on("click",function(e){
        moveRightmostElement(movingdiv);
    });
    $("#button_to_right").on("click",function(e){
        moveLeftmostElement(movingdiv);
    });
});


function moveDiv(targetDiv, num) {
    if (!targetDiv) {
        console.log("targetDiv is undefined or null");
        return;
    }

    let currentX = $(targetDiv).position().left;
    let currentX_new = currentX + num + "px";

    $(targetDiv).css("left", currentX_new);
}

function moveLeftmostElement(targetDiv) {
    let container = targetDiv;
    let element_lf = container.children('.item').first();
    container.append(element_lf);
}

function moveRightmostElement (targetDiv){
    let container = targetDiv;
    let element_rf = container.children('.item').last();
    container.prepend(element_rf);
    console.log("movebutton hit!");
}
