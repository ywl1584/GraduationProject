var testEditormd;
function AllDoeument() {
         $(".text").empty();
        $(".table td").remove()
        $.ajax({
            url:'/index33/',
            type:'GET',
            data:{'nowdir':$('#nowdir').text()},
            success:function (data) {
                GetJson(data)
            },
            error:function () {
                 $('.text').text("数据出错了")
            }
        })
        }
        function GetJson(data) {
        var obj=eval('('+data+')');
                for(var key in obj) {
                    if(key=="Nowdir"){
                        $("#nowingdir").text(obj[key])
                    }else{
                    var index=obj[key].lastIndexOf(".")
                    var ext=obj[key].substr(index+1)
                    if(ext!="md"&&ext!="txt"){
                        $(".text").append("<li><img src= '/static/img/foder.png'>" +
                                "<a id='f' href='#'"+key+"'>" + obj[key] + "</a></li>")
                        $(".table").append("<tr><td><li><img src='/static/img/foder.png'>" +
                                "<a id='fd' href='#11'"+"//"+key+">" + obj[key] + "</li></td><td>"+getLocalTime(key)+"</td><td>16404644</td><td>1314b</td></tr>")
                    }
                    else{
                        $(".table").append("<tr><td><li><img src='/static/img/file.png'>" +
                                "<a id='fsd' href='#'"+key+">" + obj[key] + "</a></li></td><td>"+getLocalTime(key)+"</td><td>16404644</td><td>1314b</td></tr>")
                    }
                }

            }
       }
       function TableGetJson(data) {
        var obj=eval('('+data+')');
                for(var key in obj) {
                    if(key=="Nowdir"){
                        $("#nowingdir").text(obj[key])
                    }else{
                    var index=obj[key].lastIndexOf(".")
                    var ext=obj[key].substr(index+1)
                    if(ext!="md"&&ext!="txt"){
                        $(".table").append("<tr><td><li><img src='/static/img/foder.png'>" +
                                "<a id='fd' href='#'"+key+">" + obj[key] + "</a></li></td><td>"+getLocalTime(key)+"</td><td>16404644</td><td>1314b</td></tr>")
                    }
                    else{
                        $(".table").append("<tr><td><li><img src='/static/img/file.png'>" +
                                "<a id='fsd' href='#'>" + obj[key] + "</a></li></td><td>"+getLocalTime(key)+"</td><td>16404644</td><td>1314b</td></tr>")
                    }
                }
            }
        }
			<!--创建文件夹-->
   function CreateF(){
        var x=prompt("输入文件夹名称:");
            $.ajax({
            url:'/index334/',
            type:'GET',
            data:{'name':x,'nowdir':$("#nowingdir").text()},
            traditional:true,
            success:function (data) {
                if(data==2){
                    alert("文件夹已经存在")
                }
                else if(data==1){
                    alert("文件夹名不能为空")
                }
                else {
                $(".text").empty();
                $(".table td").remove()
                    alert("创建成功")
                    GetJson(data)
                }

            }
        })
            }
			<!--创建文件-->
	function CreateFiles() {
        var x = prompt("输入markdown文件名称:");
        var y = ".md"
        x = x + y;
        $.ajax({
            url: '/index335/',
            type: 'GET',
            data: {'name': x,'nowdir':$("#nowingdir").text()},
            traditional: true,
            success: function (data) {
                if (data == 2) {
                    alert("文件已经存在")
                }
                else if (data == 1) {
                    alert("文件名不能为空")
                }
                else {
                $(".text").empty();
                $(".table td").remove()
                    alert("创建成功")
                    GetJson(data)
                }
            }
        })
    }
function getLocalTime(nS) {
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}
function MKDocumentText(data) {
    var after="<div id='toolsDivMKAfter'>" +
        "<button type='button'class='btn btn-default btn-lg'style='border: none;outline: none;'onclick='afterMK()'>" +
        "<span class='glyphicon glyphicon-menu-left' aria-hidden='true'></span>返回 " +
        "</button>" +
        "<button type='button'class='btn btn-default btn-lg'style='border: none;outline: none;float: right;'onclick='SetMKdocument()'>" +
        "<span class='glyphicon glyphicon-open' aria-hidden='true'></span>发布 </button>" +
        "</div>"
    $(".toolsdiv").prepend(after)
    $("#toolsDivMKBefore").remove()
    $("#dirs").css("display","none")
    $(".table").css("display","none")
    $("#toolsDivMKAfter").css("display","")
    $(".ChatFriends").remove()
    					$.getScript("/static/plugins/editor.md-master/editormd.js", function() {
                        $(".toolsdiv").append("<div id=\"test-editormd\"></div>");

                        testEditormd = editormd("test-editormd", {
                            width: 1500,
                            height: 870,
                            markdown : data,
                            path :'/static/plugins/editor.md-master/lib/'
                        });
					});
}
function afterMK() {
        $(".FocusFilename").empty()
        var before="<div class='btn-group' role='group'id='toolsDivMKBefore'>" +
        "<button type='button' class='btn btn-default dropdown-toggle 'data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' style='margin-top: 14px;margin-left: 14px'>" +
        "<span class='caret'></span>新建 " +
        "</button> " +
        "<ul class='dropdown-menu'>" +
        "<li onclick='CreateFiles()'><a href='#'>markdown文件</a> </li>" +
        "<li onclick='CreateF()'><a href='#'>文件夹</a> </li> " +
        "</ul> " +
        "</div>"
         var FriendsButton="<div>" +
        "<button type='button'class='ChatFriends' onclick='Friends()'>" +
        "<span><img src='/static/img/(Friends_tab_selected)_SFont.CN.png'></span>" +
        "</button> " +
        "</div>"
    $(".toolsdiv").prepend(before)
    $(".ChatTools").append(FriendsButton)
    $("#toolsDivMKBefore").css("display","")
    $("#dirs").css("display","")
    $(".table").css("display","")
    $("#toolsDivMKAfter").remove()
    testEditormd.editor.remove();
    $.ajax({
        url:'/index333/',
        type:'GET',
        data:{'dir':$(this).text(),'nowdir':$("#nowingdir").text()},
        traditional:true,
        success:function (data) {
           TableGetJson(data)
        },
        error:function () {
            alert("返回数据错误")
        }
    })
}
function SetMKdocument() {
    $.ajax({
        url:'/index342/',
        type:'POST',
        data:{'dir':$(".FocusFilename").text(),'nowdir':$("#nowingdir").text(),'article':$(".editormd-markdown-textarea").text()},
        traditional:true,
        success:function (data) {
            alert(data)
            testEditormd.editor.remove();
            afterMK()
            $(".FocusFilename").empty()
        },
        error:function () {
            alert("返回数据错误")
        }
    })
}
function Friends() {
    $("#dirs").css("display","none")
    $(".table").css("display","none")
    $(".document").css("display","none")
    $(".toolsdiv").css("border-bottom","1px solid #b9b6b0")
    $(".ChatFriends").remove()
    $("#toolsDivMKBefore").remove()
     var FriendsToolsButton="<div id='toolsDivFriendsAfter'>" +
        "<button type='button'class='btn btn-default btn-lg'style='border: none;outline: none;' onclick='AfterFriends()'>" +
        "<span class='glyphicon glyphicon-menu-left'aria-hidden='true'></span>返回" +
        "</button> " +
        "</div>"
    var Friends="<div class='FindFriendDiv'><div class='FindFriends'>" +
        "<p>请输入账号进行搜索</p>" +
        " <input type='text' class='form-control FindFriendsName' placeholder='仅支持本站注册的账号用户'/>" +
        "</div></div>"
    var ListFriends="<div class='ListF'>" +
        "<span><img src='/static/img/(Friends_tab_selected)_SFont.CN.png'></span>" +
        "<p style='display: inline-block'>成员列表（成员角色说明）</p>" +
        "</div>"
    $(".toolsdiv").prepend(FriendsToolsButton)
    $(".centerdiv").append(Friends)
    $(".centerdiv").append(ListFriends)
    $.ajax({
        url:"/index343/",
        type:"GET",
        data:{"username":$("#useringname").text()},
        traditional:true,
        success:function (data) {
            var obj=eval('('+data+')')
            for (var key in obj){
                var ListFriends="<li class='friends'>"+obj[key]+"</li>"
                $(".ListF").append(ListFriends)
            }
        }
    })
}
function AfterFriends() {
    $("#dirs").css("display","")
    $(".table").css("display","")
    $(".document").css("display","")
    $(".toolsdiv").css("border-bottom","none")
    $(".FindFriendDiv").remove()
    $(".friends").remove()
    $("#toolsDivFriendsAfter").remove()
    $(".ListF").remove()
    var before="<div class='btn-group' role='group'id='toolsDivMKBefore'>" +
        "<button type='button' class='btn btn-default dropdown-toggle 'data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' style='margin-top: 14px;margin-left: 14px'>" +
        "<span class='caret'></span>新建 " +
        "</button> " +
        "<ul class='dropdown-menu'>" +
        "<li onclick='CreateFiles()'><a href='#'>markdown文件</a> </li>" +
        "<li onclick='CreateF()'><a href='#'>文件夹</a> </li> " +
        "</ul> " +
        "</div>"
    var FriendsButton="<div>" +
        "<button type='button'class='ChatFriends' onclick='Friends()'>" +
        "<span><img src='/static/img/(Friends_tab_selected)_SFont.CN.png'></span>" +
        "</button> " +
        "</div>"
    $(".toolsdiv").prepend(before)
    $(".ChatTools").append(FriendsButton)
        $.ajax({
        url:'/index333/',
        type:'GET',
        data:{'dir':$(this).text(),'nowdir':$("#nowingdir").text()},
        traditional:true,
        success:function (data) {
            $(".table td").remove()
           TableGetJson(data)
        },
        error:function () {
            alert("返回数据错误")
        }
    })
}
function AddFriends() {
    var name=$(".FriendP").text();
    var msg="确定要添加'"+name+"'为好友吗？"
    if(confirm(msg)==true){
        $.ajax({
            url:"/index345/",
            type:"GET",
            data:{"name":name,"UserName":$("#useringname").text()},
            traditional:true,
            success:function (data) {
                if(data == "1"){
                    alert("该用户已经是你的好友")
                }else {
                    alert("添加成功")
                    $(".FindFriendDiv").remove()
                    $(".ListF").remove()
                    Friends()
                }
            }
        })
    }
    else{
        return false;
    }


}