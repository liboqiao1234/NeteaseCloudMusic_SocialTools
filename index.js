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
        opt.success(xhr.responseText);
      }
  }
}
var debug = function (name){
  console.log(name);
}
//

function login(){
  var username=query("#phonenum").value;
  var password=query("#password").value;
  // debug(username+" "+password);
  ajax({type:"get",url:"index.js",success:function(e){debug(e)}});
}
