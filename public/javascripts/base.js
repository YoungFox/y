
//用户名校验
function checkName(strName){
	var reg=/^[a-z0-9_\u4e00-\u9fa5]{2,12}$/i;
	if(reg.test(strName)){
		return true;
		}
		else{
		return false;
		}
}

//邮箱校验
function isEmail(strEmail) {
	var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	if (reg.test(strEmail)){
		return true;
	}
	else{
		return false;
	  }
}


var winUiList = $('.winUiContent .col').find('div');
for(var i = 0;i<winUiList.length;i++){
	var randomColor = parseInt(Math.random()*256); 
	var randomColor1 = parseInt(Math.random()*256); 
	var randomColor2= parseInt(Math.random()*256); 
	winUiList.eq(i).css('background-color','rgb('+randomColor+','+randomColor1+','+randomColor2+')')
      }

