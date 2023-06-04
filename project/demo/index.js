
  
  $(document).ready(function () {
    const outerdiv = 0;
    const movingdiv = $("#scroller");
    
    let panelProperty = {
        width: "80%",
        element_no : movingdiv.children().length
      };
    
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
        amount = +20;
      } else {
        amount = -20;
      }
  
      moveDiv(movingdiv, amount);
      moveOuterDiv(movingdiv);
    });
  });
  
  // Move target division
  function moveDiv(targetDiv, num) {
    if (!targetDiv) {
      console.log("targetDiv is undefined or null");
      return;
    }
  
    targetDiv.children().each(function () {
      const $child = $(this);
      const currentLeft = parseInt($child.css('left'), 10);
      const newLeft = currentLeft + num;
      $child.css('left', newLeft + 'px');
    });
  }
  
  // Move elements outside the target division
  function moveOuterDiv(targetDiv) {
    //get required information from the targetdivision
    let contents = targetDiv.children();
    let content;
    let popout_dir;
    
    //loop every content and find if there is something goes out of the
    //tragetDiv

    //container properties saved in a map 
    //with offset : x-coordinate of left edge
    //and width : x-coordinate of right edge - offset.  
    let container_props = {
        'offset' : targetDiv.offset().left,
        'width' : targetDiv.innerWidth()
    }
    console.log('prop of container', container_props);
    contents.each(function(i,e){
    //element properties saved in anotherr map with the same key name.
        const elem = $(e);
        const elem_props = {
            'offset' : elem.offset().left,
            'width' : elem.outerWidth(),
        };
        console.log("rightb of elem", elem_props['width']+ elem_props['offset']);

        if(elem_props['offset']+elem_props['width']<container_props['offset']){
            popout_dir = 'L'; ;
            return;
        }else if(elem_props['offset']>=
        container_props['offset']+container_props['width']){
            popout_dir = 'R'
            return;
        }
    });

    //now if the popout_dir is L , move the division to the right side 
    // R, move the division to the left side
    console.log("popout_dir",popout_dir);
    if(popout_dir){
        if(popout_dir==='L'){

        }else if(popout_dir ==='R'){

        }
    };

  }
  