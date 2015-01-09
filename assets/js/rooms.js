// self invoking function to make scope limited
(function(){
  $(function(){
    io.socket.get('/roomlist/', function(data){
      renderTable('rooms', data)
    });

    // Listen for the event called 'user'
    io.socket.on('room',function(obj){
      if (obj.verb == 'updated') {
        var data = obj.data;
        updateTable(data.id, data);
        console.log('Room '+data.room_name+' has been updated to '+data.room_value);
      }
    });
  });

  function renderTable(selector, data){
    var arr = [];
    arr.push('<tr>'+ '<td>Room Name</td>'+'<td>Room Value</td></tr>');
    $.each(data, function(i, d){
      arr.push('<tr id=rn_'+d.id+'>'+ '<td>'+d.room_name+'</td>'+'<td>'+'<button style="background-color:'+ getColor(d.room_value)+'">'+d.room_value+'</button></td></tr>');
    });
    $('#'+selector).html(arr.join(''));
  }

  function updateTable(id, data){

    $('#rn_'+id).html('<td>'+data.room_name+'</td>'+'<td>'+'<button style="background-color:'+ getColor(data.room_value)+'">'+data.room_value+'</button></td>');
  }

  function getColor(room_value){
    switch (room_value) {
      case '1':
        return 'red';
        break;
      case '2':
        return 'green';
        break;
      case '3':
        return 'blue';
        break;
    }
  }

  // function doEdit(){
  //   io.socket.get('/updateroom/',{id:1, room_value:2});
  // }
})();
