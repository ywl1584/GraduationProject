from django.shortcuts import redirect,render
from django.http import HttpResponse
import json
import os,shutil
import markdown
def showpg1(request):
    return render(request,'markdown.html',locals())
def ajax(request):
    Nowdir=request.GET.get('nowdir')
    return  HttpResponse(json.dumps(Method1( Nowdir)))
# 列举文件以及文件夹
def ajax2(request):
    if request.method=='GET':
        GetdirName=request.GET.get('dir')
        GetNowdir=request.GET.get('nowdir')
        Idir=GetNowdir+'\\'+GetdirName
    return HttpResponse(json.dumps(Method1(Idir)))
# 创建文件夹
def ajax3(request):
    GetName=request.GET.get('name')
    GetNowdir=request.GET.get('nowdir')
    if GetName=="":
        return  HttpResponse("1")
    NewDir=GetNowdir+'\\'+GetName
    if os.path.exists(NewDir):
        return HttpResponse("2")
    else:
        os.mkdir(NewDir)
        return HttpResponse(json.dumps(Method1(GetNowdir)))
    #创建文件
def ajax4(request):
    GetName=request.GET.get('name')
    GetNowdir=request.GET.get('nowdir')
    if GetName[0:-3]=="":
        return HttpResponse("1")
    NewDir=GetNowdir+'\\'+GetName
    if os.path.exists(NewDir):
        return HttpResponse("2")
    else:
        open(NewDir,'w')
        return HttpResponse(json.dumps(Method1(GetNowdir)))
    #获取markdown文件内容
def ajax5(request):
    GetNewdirName=request.POST.get('dir')
    GetNowDir=request.POST.get('nowdir')
    Newdir=GetNowDir+'\\'+GetNewdirName
    with open(Newdir,'r') as f:
        ff=f.read()
    print(ff)
    return HttpResponse(ff)
    #保存修改后的文件
def ajax8(request):
    GetNewdirName=request.POST.get('dir')
    GetNowDir=request.POST.get('nowdir')
    GetArticle=request.POST.get('article')
    Newdir=GetNowDir+'\\'+GetNewdirName
    fout=open(Newdir,'r+')
    fout.write(GetArticle)
    fout.close()
    print("成功")
    return HttpResponse("发布成功")
    #修改文件名
def  ajax6(request):
    GetNewdirName=request.GET.get('dir')
    GetOlddirName=request.GET.get('oldDir')
    GetNowdir=request.GET.get('nowdir')
    OldDir=GetNowdir+'\\'+GetOlddirName
    NewDir=GetNowdir+'\\'+GetNewdirName
    if os.path.exists(NewDir):
        return HttpResponse("1")
    else:
        os.rename(OldDir,NewDir)
        return HttpResponse(json.dumps(Method1(GetNowdir)))
    # 删除文件
def ajax7(request):
        GetNewdirName = request.GET.get('dir')
        GetNowdir = request.GET.get('nowdir')
        deletedir = GetNowdir + '\\' + GetNewdirName
        shutil.rmtree(deletedir)
        return HttpResponse(json.dumps(Method1(GetNowdir)))
# 共用方法(得到创建时间)
def Method1(dir):
    dictF = {}
    dictF['Nowdir']=dir
    for foder in os.listdir(dir):
        dir2 = dir + '\\' + foder
        ctime=os.path.getctime(dir2)
        dictF[ctime] = foder
    return dictF
