//handler to update room page
(function(){
  $(function(){
    $.get('/roomlist', function(data){
      console.log(data);
      renderUpdatePage('update_rooms', data);
      //setting up handler
      $('select').change(function(e){
        debugger;
        var d = {
          id: $(this).attr('id').split('_')[1],
          room_value: $(this).val()
        };

        $.get('/updateroom', d, function(d){
          console.log('>>>>>>>>>.'+ d);
        });

      })

    })

    //render home page
  });



  function renderUpdatePage(selector, data){
    var arr = [];
    arr.push('<tr>'+ '<td>Room Name</td>'+'<td>Room Value</td></tr>');
    $.each(data, function(i, d){
      arr.push('<tr id=rn_'+d.id+'>'+ '<td>'+d.room_name+'</td>'+'<td>'+getDropDown(d)+'</td></tr>');
    });
    $('#'+selector).html(arr.join(''));
  }

  function getDropDown(d){
    var arr = [];
    arr.push('<select id=rn_'+d.id+'>');
    for(i=1; i<=3; i++){
      arr.push(getDropDownOption(d, i, i));
    }
    arr.push('</select>');
    return arr.join('');
  }
  function getDropDownOption(d, val, text){
    var is_selected = '';
    if(val == d.room_value){
      is_selected = 'selected';
    }
    return '<option value="'+ val +'" '+is_selected+'>'+text+'</option>';
  }

})();
