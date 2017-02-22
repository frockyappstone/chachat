// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap-sprockets
//= require jquery_ujs
//= require turbolinks
//= require sync
//= require chats


(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage;
        if($(".message.appeared").last().is(".right")){
          message_side = 'right';
        }else{
          // message_side = 'left';
          message_side = 'right';
        }
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = message_side === 'left' ? 'right' : 'left';

            message = new Message({
                text: text,
                message_side: message_side
            });
            // message.draw();
            postToServer(message);
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        postToServer = function(message){
          $.post("/chats.json", {chat: { body: message.text }}, message.draw());
          // var $form = $("#new_chat");
          // $form.find("input[type=text]").val(message.text);
          // $form.submit();
        }

        $(document).on("click", ".send_message", function (e) {
            return sendMessage(getMessageText());
        });
        $(document).on("keyup", ".message_input", function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });
        // sendMessage('Hello Philip! :)');
        // setTimeout(function () {
        //     return sendMessage('Hi Sandy! How are you?');
        // }, 1000);
        // return setTimeout(function () {
        //     return sendMessage('I\'m fine, thank you!');
        // }, 2000);
    });
}.call(this));
