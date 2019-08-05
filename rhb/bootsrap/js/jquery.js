		function getTime(t){
			var d,y,m,data,h,f,s;
			d=new Date(t*1000);
			y=d.getFullYear();
			m=d.getMonth()+1;
			date=d.getDate();
			h=d.getHours();
			f=d.getMinutes();
			s=d.getSeconds();
			return y+"-"+m+"-"+date+" "+h+":"+f+":"+s;
		}

		function POST(url,data,fn){
			var xhr;
			try{
				xhr=new XMLHttpRequest()
			}catch (e){
				xhr=new ActiveXObject("Microsoft","XMLHTTP")
			}
			xhr.open("post",url,true)
			xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
			xhr.send(data);
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4&&xhr.status==200){
					fn&&fn(xhr.responseText)
				}
			}
		}

		function GET(url,data,fn){
			var xhr=null;
			if(window.XMLHttpRequest){
				xhr=new XMLHttpRequest();
			}else{
				xhr=new ActiveXObject("Microsoft","XMLHTTP")
			}
			xhr.open("get",url+"?"+data+"&t="+Math.random(),true)
			xhr.send();//提交请求
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4&&xhr.status==200){
					fn&&fn(xhr.responseText)
				}
			}
		}

		function ajax(method,url,data,fn){
			var xhr=null;
			try{
				xhr=new XMLHttpRequest()
			}catch (e){
				xhr=new ActiveXObject("Microsoft","XMLHTTP")
			}
			if(method.toLowerCase()=="get"&&data){
				url+="?"+data+"&p="+Math.random();
			}
			xhr.open(method.toLowerCase(),url,true)//建立一个请求
			if(method.toLowerCase()=="get"){
				xhr.send()//提交请求
			}else{//post 方式 需要设置请求头 再提交请求
				xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
				xhr.send(data)
			}
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4&&xhr.status==200){
					if(fn){
						fn(xhr.responseText)
					}
				}
			}
		}

		function move(obj,json,fn){
			clearInterval(obj.tt)
			var ic=0,speed=0;
			obj.tt=setInterval(function(){
				var onoff=true;
				for (attr in json)
				{
					if (attr=="opacity")
					{
						ic=parseFloat(getStyle(obj,attr))*100
					}else{
						ic=parseInt(getStyle(obj,attr))
					}
					speed=(json[attr]-ic)/6;
					speed=speed>0?Math.ceil(speed):Math.floor(speed);
					if (ic!=json[attr])
					{
						onoff=false;
						if (attr=="opacity")
						{
							obj.style[attr]=(ic+speed)/100
							obj.style.filter="alpha(attr="+ic+speed+")"
						}else{
							obj.style[attr]=ic+speed+"px"
						}
					}	
				}
				if (onoff)
				{
					clearInterval(obj.tt)
					if (fn)
					{
						fn()
					}
				}
			},30)
		}
		function getStyle(obj,attr){
			return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,null)[attr]
		}
		//匀速运动
		function move1(obj,attr,end,fn){
			clearInterval(obj.tt);
			var speed=0;
			var ic=0;
			obj.tt=setInterval(function(){
				ic=parseInt(getStyle(obj,attr))+speed;
				speed=(end-ic)/7
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				obj.style[attr]=ic+"px";
				if(ic==end){
					clearInterval(obj.tt);
					fn&&fn()
				}
			},30)
		}
		function hq(str){
			return document.querySelector(str)
		}
		function hqs(str){
			return document.querySelectorAll(str)
		}