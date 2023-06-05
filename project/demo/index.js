
  
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
      const $next_child = $child.after();
      let child_prop = {
            'width' : $child.outerWidth,
            'left' : parseInt($child.css('left',10))
      }

      let next_child_prop = {
            'width' : $next_child.outerWidth,
            'left' : parseInt($next_child.css('left'),10)
      }

      parseInt(next_child_prop['width'],10);
      $child.after().css("left",child_prop['width']+next_child_prop['left']);
      
      const newLeft = child_prop['left'] + num;
      const newNext = next_child_prop['left'] + child_prop['width'];

      $child.css('left', newLeft + 'px');
      $next_child.css('left',newNext+'px');
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
       // console.log("rightb of elem", elem_props['width']+ elem_props['offset']);

        if(elem_props['offset']+elem_props['width']<container_props['offset']){
            popout_dir = 'L';
            content = elem;
            return;
        }else if(elem_props['offset']>=
        container_props['offset']+container_props['width']){
            popout_dir = 'R'
            content = elem;
            return;
        }
    });

    //now if the popout_dir is L , move the division to the right side 
    // R, move the division to the left side
    console.log("popout_dir",popout_dir);
    if(popout_dir){
        if(popout_dir==='L'){
            allign_contents(targetDiv,'L');
            targetDiv.append(content);
        }else if(popout_dir ==='R'){
            allign_contents(targetDiv,'R');
            targetDiv.prepend(content);
        }
    };

  }

  function allign_contents(targetDiv, direction){
    if(direction === 'L'){
        targetDiv.css("left",targetDiv.outerWidth+'px');
    }else if(direction === 'R'){

    }
  }
  