
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
        if (e.originalEvent.deltaY > 0 || e.originalEvent.deltaX > 0) {
            moveDiv(movingdiv, -20);
        } else {
            moveDiv(movingdiv, 20);
        }
        // hideDiv(movingdiv.children().first());
        console.log(movingdiv.children().first().offset().left);
    });
});

function moveDiv(targetDiv, num) {
    if (!targetDiv) {
        console.log("targetDiv is undefined or null");
        return;
    }

    let currentX = $(targetDiv).position().left;
    let currentX_new = currentX + num + "px";
    targetDiv.css("left", currentX_new);
    let firstborn = $(targetDiv).children().first();
    
    if($(targetDiv).children().first().offset)
}

function hideDiv(targetDiv) {
    const scroller = $("#scroller");
    const targetRight = $(targetDiv).position().left + $(targetDiv).outerWidth();
}