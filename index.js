var query = function (selector){
  return document.querySelector(selector);
}
var ajax = function (opt){
  var xhr=new XMLHttpRequest();
  var str = "";
  for(var key in opt.data){
    str+=(key+"="+opt.data[key]+"&");
  }
  str=str.slice(0,str.length-1);
  if(opt.type=="get" || opt.type=="GET"){
    opt.url+="?";
    opt.url+=str;
    xhr.open("get",opt.url);
    xhr.send();
  }else if(opt.type=="post" || opt.type=="POST"){
    xhr.open("post",opt.url);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.send(str);
  }
  xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status == 200){
        opt.success&&opt.success(xhr.responseText);
      }
  }
}
var debug = function (name){
  console.log(name);
}
//
me={"uid":1,"nickname":"网易云音乐","follows":0,"followers":0};
detail_me={};
function get_detail(id){
  var res={};
  ajax({
    type:"post",
    url:"http://192.168.3.17:3000/user/detail/",
    data:{"uid":id},
    success:function(e){
      res=JSON.parse(e);
    }
  });
  return res;
}
function login(){
  var username=query("#phonenum").value;
  var password=query("#password").value;
  // debug(username+" "+password);
  // ajax({type:"get",url:"index.js",success:function(e){debug(e)}});
  ajax({
    type:"post",
    url:"http://192.168.3.17:3000/login/cellphone/",
    data:{"phone":username,"password":password},
    success:function(e){
      var tmp=JSON.parse(e);
      me["uid"]=tmp["account"]["id"];
      query("#my_nickname").innerHTML=tmp["profile"]["nickname"];
      query("#my_uid").innerHTML=tmp["account"]["id"];
    }
  });
  detail_me = get_detail(me["uid"]);
  query("#my_follows a").innerHTML=detail_me["profile"]["follows"];
  query("#my_followers a").innerHTML=detail_me["profile"]["followeds"];
}


function get_fans(id){
  ajax({
    type:"get",
    url:"http://192.168.3.17:3000/user/followeds/",
    data:{
      "uid":id,
      "limit":1000
    },
    success:function(e){
      debug(e);
    }
  });
}
