window.onload = function () {
	
	var datalink = {
		'data': [{'src':'image/35.jpg'},
			{'src':'image/36.jpg'},
			{'src':'image/37.jpg'},
			{'src':'image/38.jpg'},
			{'src':'image/39.jpg'},
			{'src':'image/40.jpg'},
			{'src':'image/41.jpg'},
			{'src':'image/42.jpg'},
			{'src':'image/43.jpg'},
			{'src':'image/44.jpg'},
			{'src':'image/45.jpg'},
			{'src':'image/46.jpg'},
			{'src':'image/47.jpg'},
			{'src':'image/48.jpg'},
			{'src':'image/49.jpg'},
			{'src':'image/50.jpg'}]
	};

	var main = document.getElementById('main');
	var box = document.getElementById('box');
	waterfull(main,'box');

	window.onscroll = function () {

		//滑到底部加载
		if(isScroll(main,'box')) {

			for (var i = 0, len = datalink.data.length; i < len; i++) {

				var newBox = document.createElement('div');
				newBox.className = 'box';
				main.appendChild(newBox);

				var newPic = document.createElement('div');
				newPic.className = 'pic';
				newBox.appendChild(newPic);

				var newImg = document.createElement('img');
				newImg.src = datalink.data[i].src;
				newPic.appendChild(newImg);

			}

			waterfull(main,'box');
		}

		//显示/隐藏返回顶部
		var top = document.getElementById('top');
		backTop(top);
		hideTop(top);
	}
	

}

function waterfull(main,box) {

	var boxKid = getClass(main,box);   //获取所有class为box的元素

	var boxWid = boxKid[1].offsetWidth;   //获取box的宽
	var boxLine = Math.floor(document.documentElement.clientWidth/boxWid);   //获取列数

	//设置main的样式
	main.style.cssText = 'width:' + boxWid * boxLine + 'px;margin: 0 auto;';

	var boxH = [];

	for (var i = 0,len = boxKid.length; i < len; i++) {

		var boxHeight = boxKid[i].offsetHeight;

		if (i < boxLine) {
			boxH.push(boxHeight);
		}
		else {
			
			var minH = Math.min.apply(null,boxH);
			var minIndex = getIndex(boxH,minH);
			boxKid[i].style.cssText = 'position:absolute; left:' + boxWid * minIndex +'px; top:' + minH +'px';
			boxH[minIndex] = boxH[minIndex] + boxKid[i].offsetHeight;
		}
		
	}
}
//获取所有class为box的div
function getClass(main,box) {

	var kidArr = [];
	//获取mian下所有的div元素
	var barr = main.getElementsByTagName('div');

	//循环遍历出所有class未box的元素
	for (var i = 0,len = barr.length; i < len; i++) {
		if(barr[i].className == box){
			kidArr.push(barr[i]);
		}		
	};

	return kidArr;
	
}
//获取高最小的列的下标
function getIndex(boxHg,minHg) {

	for (var i = 0,len = boxHg.length;i < len;i++) {
		if (boxHg[i] == minHg){
			return i;
		}
	}
}

function isScroll(main,box) {

	var sbox = getClass(main,box);
	var len = sbox.length;
	var sboxH = sbox[len - 1].offsetTop + sbox[len - 1].offsetHeight;
	var sboxT = document.documentElement.scrollTop || document.body.scrollTop;
	var sboxC = document.documentElement.clientHeight || document.body.clientHeight;
	if (sboxT + sboxC >= sboxH) {
		return true;
	}
}

//返回顶部
function backTop(top) {

	var sboxT = document.documentElement.scrollTop || document.body.scrollTop;
	var sboxC = document.documentElement.clientHeight || document.body.clientHeight;
	if (sboxT >= sboxC) {

		top.style.display = 'block';
	}

	//点击返回顶部
	top.onclick = function () {

		timer = setInterval(function () {

			var boxTop = document.documentElement.scrollTop || document.body.scrollTop;
			var boxT = Math.floor(-boxTop/6);
			console.log(boxTop);
			document.documentElement.scrollTop = document.body.scrollTop = boxTop + boxT;
			isTop = true;

			if (boxTop == 0) {

				clearInterval(timer);
			}
		},30);

	}
}

//隐藏返回顶部
function hideTop(top) {

	var sboxT = document.documentElement.scrollTop || document.body.scrollTop;
	var sboxC = document.documentElement.clientHeight || document.body.clientHeight;
	if (sboxT < sboxC) {

		top.style.display = 'none';
	}
}