var socket = io();
    socket.on('connect', function(){
        console.log('Connected to server');

        socket.emit('createMessage',{
            from:'jen@example.com',
            text:'Hey. this is morshed'
        });


    });
    
    socket.on('disconnect', function(){
        console.log('Disconnect from server');
    });
    socket.on('newMessage', function(message){
        console.log('new message', message);
    });