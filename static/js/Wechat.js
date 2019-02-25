/**
 * Created by master on 2019/1/30.
 */
function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
      function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function seemessage(callback) {
        for(var i in callback){
            console.log(callback[i])
            var new_msg_ele="<div class='msg_item'>"+
                            "<span>"+ callback[i].from_name +"</span>" +
                            "<span>"+callback[i].timestamp+"</span>"+
                            "<div class='msg_text'>"+callback[i].msg+"</div>"+
                            "</div>";
        };
        $("#message").append(new_msg_ele);
    }