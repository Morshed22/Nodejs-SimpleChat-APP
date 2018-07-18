var socket = io();
    socket.on('connect', function(){
        console.log('Connected to server');
    });
    
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

    });

    socket.emit('createMessage',{
        from: 'jakir',
        text : 'hi'
    }, function(msg){
        console.log('Got it', msg);
    });
    socket.on('newLocationMessage', function(message){
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = jQuery('#location-message-template').html();
        var html = Mustache.render(template, {
            url:message.url,
            from:message.from,
            createdAt:formattedTime
        });
        jQuery('#messages').append(html);

        // var li = jQuery('<li></li>');
        // var a = jQuery('<a target="_blank">current location</a>');
        // li.text(`${message.from} ${formattedTime}:`)
        // a.attr('href',message.url);
        // li.append(a);
        // jQuery('#messages').append(li);

    });

    var messageTextBox = jQuery('[name=message]')

    jQuery('#message-form').on('submit', function(e){
        e.preventDefault();
        socket.emit('createMessage', {
            from:'User',
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