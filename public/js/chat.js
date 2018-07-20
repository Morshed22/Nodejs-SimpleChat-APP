var socket = io();
    socket.on('connect', function(){
        var params = jQuery.deparam(window.location.search);
        console.log(params);
        socket.emit('join', params, function(err){
            if (err){
                alert(err);
                window.location.href = '/'
            }else{
                console.log('successful entering')
            }
        });
    });
    
    function scrollToBottom () {
        // Selectors
        var messages = jQuery('#messages');
        var newMessage = messages.children('li:last-child')
        // Heights
        var clientHeight = messages.prop('clientHeight');
        var scrollTop = messages.prop('scrollTop');
        var scrollHeight = messages.prop('scrollHeight');
        var newMessageHeight = newMessage.innerHeight();
        var lastMessageHeight = newMessage.prev().innerHeight();
      
        if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
          messages.scrollTop(scrollHeight);
        }
      }

    socket.on('disconnect', function(){
        console.log('Disconnect from server');
    });
    socket.on('newMessage', function(message){
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = jQuery('#message-template').html();
        var html = Mustache.render(template, { 
            text:message.text,
            from:message.from,
            createdAt:formattedTime
        });
        jQuery('#messages').append(html);
        scrollToBottom();
    });

    // socket.on('updateUserList', function(users){
    //    // console.log('User list ', users);
    //     var ol = jQuery('<ol></ol>');
    //     users.forEach(function(user){
    //         ol.append.jQuery('<li></li>').text(user));
    //     });
    //     jQuery('#users').html(ol);

    // });
    socket.on('updateUserList', function (users) {
        var ol = jQuery('<ol></ol>');
      
        users.forEach(function (user) {
          ol.append(jQuery('<li></li>').text(user));
        });
      
        jQuery('#users').html(ol);
      });
      
    // socket.emit('createMessage',{
    //     from: 'jakir',
    //     text : 'hi'
    // }, function(msg){
    //     console.log('Got it', msg);
    // });
    socket.on('newLocationMessage', function(message){
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = jQuery('#location-message-template').html();
        var html = Mustache.render(template, {
            url:message.url,
            from:message.from,
            createdAt:formattedTime
        });
        jQuery('#messages').append(html);

        scrollToBottom();

    });

    var messageTextBox = jQuery('[name=message]')

    jQuery('#message-form').on('submit', function(e){
        e.preventDefault();
        socket.emit('createMessage', {
            text:messageTextBox.val()
        }, function(){
            messageTextBox.val('');
        });
    });
    var locationButton = jQuery('#send-location');
    locationButton.on('click',function(){
        if (!navigator.geolocation){
            alert('Geolocation not supported by your browser');
        }
        locationButton.attr('disabled', 'disabled').text('Sending Location..');
        navigator.geolocation.getCurrentPosition(function(position) {
            locationButton.removeAttr('disabled').text('Send location');
                socket.emit('createLocationMessage',{
               'latitude':position.coords.latitude,
               'longitude':position.coords.longitude
           });
            console.log(position);
          }, function(){
            locationButton.removeAttr('disabled').text('Send location')
              alert('unable to fetch location');
          });
    }); 