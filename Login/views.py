from django.shortcuts import render,redirect,HttpResponse
from .forms import UserForm
from .RegisterForm import RegisterForm
from . import models
import json,time,queue
GLOBAL_MSG_QUEUES={}
def index(request):
    pass
    return render(request, 'index.html')
#登陆
def login(request):
   if request.session.get('is_login',None):
       return redirect('/index')
   if request.method == "POST":
       login_form=UserForm(request.POST)
       if login_form.is_valid():
           username = login_form.cleaned_data['username']
           password = login_form.cleaned_data['password']
           try:
               user=models.User.objects.get(name=username)
               if user.password == password:
               # if authenticate(user.password=password):
                   request.session['is_login']=True
                   request.session['user_id']=user.id
                   request.session['user_name']=user.name
                   # 登陆成功跳转到首页
                   return redirect("/markdownT/")
               else:
                   message = "密码不正确!"
           except:
               message = "用户名不正确!"
               # return HttpResponse("用户名或密码错误")
       return render(request, 'Login.html', locals())
   login_form=UserForm()
   return render(request,'Login.html',locals())
#注销
def logout(request):
    if not request.session.get("is_login",None):
        return redirect("/Login/")
    request.session.flush()
    return redirect("/index/")
#注册
def register(request):
    if request.method == "POST":
        register_form=RegisterForm(request.POST)
        message="请检查填写内容"
        if register_form.is_valid():
            username=register_form.cleaned_data['username']
            password1=register_form.cleaned_data['password1']
            password2=register_form.cleaned_data['password2']
            email=register_form.cleaned_data['email']
            sex=register_form.cleaned_data['sex']
            if password1 != password2:
                message="两次密码不一致"
                return render(request,'Register.html',locals())
            else:
                same_name=models.User.objects.filter(name=username)
                if same_name:
                    message="用户已经存在！"
                    return render(request,'Register.html',locals())
                same_email=models.User.objects.filter(email=email)
                if same_email:
                    message="邮箱已经存在！"
                    return render(request,'Register.html',locals())
                #创建用户
                new_user=models.User.objects.create()
                new_user.name=username
                new_user.password=password1
                new_user.email=email
                new_user.sex=sex
                new_user.save()
                return redirect("/Login/")
    register_form=RegisterForm()
    return render(request,'Register.html',locals())
#发送信息
def sendMessage(request):
    print(request.POST)
    msg_data=request.POST.get('data')
    if msg_data:
        msg_data=json.loads(msg_data)
        msg_data['timestamp']=time.time()
        friends=models.User.objects.get(name=msg_data['from']).friends.all()
        # if not GLOBAL_MSG_QUEUES['admin']:
        #     GLOBAL_MSG_QUEUES['admin']=queue.Queue()
        # GLOBAL_MSG_QUEUES['admin'].put(msg_data)
        for friend_List in friends:
            if not GLOBAL_MSG_QUEUES.get(friend_List.name):
            # if not GLOBAL_MSG_QUEUES[friend_List.name]:
                GLOBAL_MSG_QUEUES[friend_List.name]=queue.Queue()
            if friend_List.name !=msg_data['from']:
                GLOBAL_MSG_QUEUES[friend_List.name].put(msg_data)
        #     GLOBAL_MSG_QUEUES[friend_List.name]=queue.Queue()
        #     GLOBAL_MSG_QUEUES[friend_List.name].put(msg_data)
    print(GLOBAL_MSG_QUEUES)
    return HttpResponse("信息发送成功")
#接收信息
def Get_newMessage(request):
    # GLOBAL_MSG_QUEUES['admin']=queue.Queue()
    # msg_count=GLOBAL_MSG_QUEUES['admin'].qsize()
    # q_obj=GLOBAL_MSG_QUEUES['admin']
    # print(request.session['user_name'])
    GLOBAL_MSG_QUEUES[request.session['user_name']] = queue.Queue()
    msg_count=GLOBAL_MSG_QUEUES[request.session['user_name']].qsize()
    print(msg_count)
    q_obj=GLOBAL_MSG_QUEUES[request.session['user_name']]
    msg_list = []
    if msg_count > 0:
        for msg in range(msg_count):
            msg_list.append(q_obj.get())
        print("new message",msg_list)
    else:#没消息，挂起
        # print(GLOBAL_MSG_QUEUES)
        print("挂起")
        try:
            msg_list.append(q_obj.get(timeout=60))
        except queue.Empty:
            print("no have message")
    return HttpResponse(json.dumps(msg_list))
def Getfriends(request):
    GetFriendsList={}
    i=0
    GetuserName=request.GET.get('username')
    Friends=models.User.objects.get(name=GetuserName).friends.all()
    for Friends_List in Friends:
        GetFriendsList[Friends_List.name]=Friends_List.name
    return HttpResponse(json.dumps(GetFriendsList))
def FindUser(request):
    GetUserName=request.GET.get('name')
    FindUserName=models.User.objects.filter(name=GetUserName)
    if not FindUserName:
        return HttpResponse("1")
    else:
        for Username in FindUserName:
            return HttpResponse(Username.name)
def AddFriends(request):
    GetAddUserName = request.GET.get("name")
    GetUserName = request.GET.get("UserName")
    Friends=models.User.objects.get(name=GetUserName).friends.all()
    for Friends_List in Friends:
        if GetAddUserName == Friends_List.name:
            return HttpResponse("1")
    a = models.User.objects.get(name=GetUserName)
    b = models.User.objects.get(name=GetAddUserName)
    a.friends.add(b)
    return HttpResponse("2")
