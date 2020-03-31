var port = 3000; 
var socket = io.connect('http://localhost:' + port);

$(function () {
    const socket = io.connect();

    var $form = $('#messForm');
    var $name = $('#name');
    var $textArea = $('#message');
    var $allMess = $('#allMess');

    $form.submit(function (event) {
        event.preventDefault();
        socket.emit('send mess', {

            mess: $textArea.val(),
            name: $name.val(),

        });
        $textArea.val('');
    });

    socket.on('add mess', function (data) {
        if ((data.mess != '') && (data.name != '')) {
            $allMess.append(
            `<div><b>${data.name}</b>: ${data.mess}</div>`);
        }


    });

})