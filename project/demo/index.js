const panelProperty = {
    width: "80%",
};

$(document).ready(function () {
    let movingdiv = $("#scroller");
    $("body").on("mouseover", function (e) {
        let mouse_x_coordinate = e.pageX;
        let mouse_y_coordinate = e.pageY;
        $("#mouseprinter").text(
            "mouse position:" + mouse_x_coordinate + "," + mouse_y_coordinate
        );
    });
    $("body").on("mousewheel", function (e) {
        let amount = 0;
        if (e.originalEvent.deltaY > 0 || e.originalEvent.deltaX > 0) {
            amount = -20;
        } else {
            amount = 20
        }
        
        moveDiv(movingdiv, amount);
        if(movingdiv.first().offset().left+element_lf.outerWidth<0){
            removeLeftmostElement(movingdiv);
            movingdiv.css("left",0);
        }
        
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

function removeLeftmostElement(targetDiv) {
    let container = targetDiv;
    let element_lf = container.children('.item').first();
    let elf_right = element_lf.offset().left + element_lf.outerWidth();
    
    console.log("leftmost right : "+elf_right);
    let containerLeft = container.position().left;
    console.log("container's left : "+containerLeft);
    leftmostElement.appendTo(targetDiv);
    leftmostElement.remove(); // Remove the leftmost element

}
