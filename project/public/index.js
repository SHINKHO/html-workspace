const panelProperty = {
    width: "80%",
};

$(document).ready(function () {
    let startPoint = {x:0,y:0};
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    let selectedTool = 'line';
    let selectedColor = '#000000';

    //clear
    const clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Event listeners for palette buttons
    const lineButton = document.getElementById('lineButton');
    lineButton.addEventListener('click', function() {
        selectedTool = 'line';
    });

    const squareButton = document.getElementById('squareButton');
    squareButton.addEventListener('click', function() {
        selectedTool = 'square';
    });

    const triangleButton = document.getElementById('triangleButton');
    triangleButton.addEventListener('click', function() {
        selectedTool = 'triangle';
    });

    const sprayButton = document.getElementById('sprayButton');
    sprayButton.addEventListener('click', function() {
        selectedTool = 'spray';
    });

    // Event listener for color picker
    const colorPicker = document.getElementById('colorPicker');
    colorPicker.addEventListener('change', function() {
        selectedColor = colorPicker.value;
    });
    

    let isDrawing = false; // Flag to track if drawing is in progress

    // Event listener for canvas mouse down
    canvas.addEventListener('mousedown', function(event) {
        startPoint = {x:event.clientX,y:event.clientY};
        if (selectedTool) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Set the stroke color based on the selected color
            context.strokeStyle = selectedColor;

            // Set the starting point
            context.beginPath();
            context.moveTo(x, y);

            isDrawing = true; // Start drawing
        }
    });

    // Event listener for canvas mouse up
    canvas.addEventListener('mouseup', function() {
        isDrawing = false; // Stop drawing
    });

    // Event listener for canvas mouse move
    canvas.addEventListener('mousemove', function(event) {
        if (isDrawing) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // // Clear the canvas before drawing each new frame
            // context.clearRect(0, 0, canvas.width, canvas.height);

            // Set the stroke color based on the selected color
            context.strokeStyle = selectedColor;

            // Draw based on the selected tool and current position
            switch (selectedTool) {
                case 'line':
                    context.lineTo(x, y);
                    context.stroke();
                    break;
                case 'square':
                    context.strokeRect(startPoint.x, startPoint.y, x - startPoint.x, y - startPoint.y);
                    break;
                case 'triangle':
                    context.beginPath();
                    context.moveTo(startPoint.x, startPoint.y);
                    context.lineTo(x, y);
                    context.lineTo((startPoint.x + x) / 2, y);
                    context.closePath();
                    context.stroke();
                    break;
                case 'spray':
                    const density = 30; // Adjust density as desired
                    for (let i = 0; i < density; i++) {
                        const offsetX = Math.random() * (x - startPoint.x) + startPoint.x;
                        const offsetY = Math.random() * (y - startPoint.y) + startPoint.y;
                        context.fillRect(offsetX, offsetY, 1, 1);
                    }
                    break;
            }
        }
    });

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
