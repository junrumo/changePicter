/**
*@changePicter对象的作用就是轮播图片
*@params.imgArray   图片列表
*@params.infoArray  图片描述信息组
*@params.imgWidth   图片的宽度
*@params.imgHeight  图片的高度
*@params.focusDiv   轮播图片容器部分的div的id
*@params.imgTimes   图片之间切换时间，时间越大，切换速度越快
*@params.totalTime 图片移动的速度，时间越大，速度越小
*@params.iconImgArray 左右小箭头图标
*@
*/
var ChangePicter = (function(window){
    var ChangePicter = function(params){
        return new ChangePicter.fn.init(params);
    } 

    ChangePicter.fn = ChangePicter.prototype = {
        constructor : ChangePicter,
        init:function(params){
            this.currWindow = params.f || window;  
            this.imgArray = typeof(params.imgArray) === "undefined" ? [] : params.imgArray; //轮播图片数组
            this.infoArray = typeof(params.infoArray) === "undefined" ? [] : params.infoArray;//轮播图片描述数组
            this.imgWidth = typeof(params.imgWidth) === "undefined" ? 400 : params.imgWidth;//图片宽度
            this.focusDiv = typeof(params.focusDiv) === "undefined" ? -1 : params.focusDiv;//父容器图片id
            this.imgTimes = typeof(params.imgTimes) === "undefined" ? 2500 : params.imgTimes; // 图片切换的时间
            this.iconImgArray = typeof(params.iconImgArray) == "undefined" ? [] : params.iconImgArray;
            this.total_time = typeof(params.totalTime) == "undefined" ? 300 : params.totalTime;
            this.hasIcon = typeof(params.hasIcon) === "undefined" ? true : params.hasIcon;
            this.curIndex = 0;                                                     
            this.fontSize = '18px';
            this.color = '#000000';
            this.imgLen = this.imgArray.length;


            this.imgHeight = typeof(__imgHeight) === "undefined" ? 200 : __imgHeight;//图片高度
    
            this.autoChange = 0;

            this.currentIndex = 1;
            this.turned = false;
            this.imgs = "";
            this.time = 0;

            this.imgLiString = "";
            this.infoLiString = "";
            this.indexListLiString = "";
            this.imgHTML = "";
            this.infoHTML = "";
            this.indexListHTML = "";

            this.showMenuData = function(){
                this.startShow();
            }
        },

        $:function(__id){
            return this.currWindow.document.getElementById(__id);
        },

        startShow:function(){
            this.$(this.focusDiv).innerHTML = this.creatChangePicterDom();
            imgs = this.$("imgs");
            this.showDots();
            var self = this;
            this.play();  //触发图片轮播

            this.$(this.focusDiv).onmouseover = function(){
                self.stop();
            }
            this.$(this.focusDiv).onmouseout = function(){
                self.play();
            }

            //箭头切换
            this.$("left").onmouseover = function(){
                self.$("left").style.opacity = "0.8";
            }

            this.$("left").onmouseout = function(){
                self.$("left").style.opacity = "0";
            }

            this.$("left").onclick = function(){
                self.left();
            }

            this.$("right").onmouseover = function(){
                self.$("right").style.opacity = "0.8";
            }
            this.$("right").onmouseout = function(){
                self.$("right").style.opacity = "0";
            }
            this.$("right").onclick = function(){
                self.right();
            }
        },

        creatChangePicterDom:function(){
            if(this.imgLen === 0){
                return false;
            }else{
                this.imgLiString += "<img src="+ this.imgArray[this.imgLen - 1] +" style='float:left;width:"+ this.imgWidth + "px;'/>";
                for(var i = 0; i < this.imgLen; i++){
                    this.imgLiString += "<img src="+ this.imgArray[i] +" style='float:left;width:"+ this.imgWidth + "px;'/>";
                    this.infoLiString += this.infoArray.length === 0 ? "" : "<li style= font-size:"+ this.fontSize +";color:"+ this.color +">" + this.infoArray[i] + "</li>";
                    this.indexListLiString +=  "<span id='dot"+ i +"' style='width:10px;height:10px;float:left;margin-right:8px;background:#333333;border:solid 1px #FFF;border-radius:50%;cursor:pointer;' valueSpan="+ i +"></span>";
                }
                if(this.iconImgArray.length === 0){
                    if(this.hasIcon){
                        this.iconLeftString = "<div id='left' style='position:absolute;top:40%;left:10px;width:40px;height:40px;color: #fff;background:rgb(235, 97, 0);line-height:39px;text-align: center;opacity: 0;z-index: 30;cursor: pointer;font-size: 36px;font-weight: bold;transition:opacity 0.3s ease-in-out'>&lt;</div>";
                        this.iconRightString = "<div id='right' style='position:absolute;top:40%;right:10px;width:40px;height:40px;color: #fff;background:rgb(235, 97, 0);line-height:39px;text-align: center;opacity: 0;z-index: 30;cursor: pointer;font-size: 36px;font-weight: bold;transition:opacity 0.3s ease-in-out'>&gt;</div>";
                    }else{
                        this.iconLeftString = "";
                        this.iconRightString = "";
                    }
                }else{
                    this.iconLeftString = "<div id='left' style='position:absolute;top:50%;left:20px;transition:opacity 0.3s ease-in-out'><img src=" + this.iconImgArray[0] + "/></div>";
                    this.iconRightString = "<div id='right' style='position:absolute;top:50%;right:20px;transition:opacity 0.3s ease-in-out'><img src=" + this.iconImgArray[1] + "/></div>";
                }
                this.imgLiString += "<img src="+ this.imgArray[0] +" style='float:left;width:"+ this.imgWidth + "px;'/>";
                this.imgHTML = "<div id='imgs' style='width:"+this.imgWidth * (this.imgLen + 1) +'px;height:'+ this.imgHeight +'px;z-index:10;position:absolute;left:'+ -this.imgWidth + "px;'>" + this.imgLiString +"</div>";
                this.infoHTML = this.infoArray.length === 0 ? "" : "<ul style='z-index:30;position:absulute;left:10px;bottom:10px;'>" + this.infoLiString +"</ul>";
                this.indexListHTML = "<div style='z-index:30;position:absolute;right:10px;bottom:10px;height:10px;width:"+ 20 * this.imgLen +"px;'>" + this.indexListLiString +"</div>";
                return this.imgHTML + this.infoHTML + this.indexListHTML + this.iconLeftString + this.iconRightString;
            }
        },

        showDots:function(){
            for(var i = 0; i < this.imgLen; i++){
                //debugger;
                if(this.$("dot" + i).style.background == 'rgb(235, 97, 0)'){
                    this.$("dot" + i).style.background = '#333333';
                    break;
                }
            }
            this.$("dot" + (this.currentIndex - 1)).style.background = 'rgb(235, 97, 0)';
        },

        turn:function(__offset){
            this.turned = true;
            var new_left = parseInt(imgs.style.left) + __offset;                              //位移总时间
            var interval = 10;                                  //每次位移间隔时间
            var speed = __offset/(this.total_time/interval);           //位移速度——每次位移量
            var self = this;

            this.go = function(){
                if((speed < 0 && parseInt(imgs.style.left) > new_left) || (speed > 0 && parseInt(imgs.style.left) < new_left)){
                    imgs.style.left = parseInt(imgs.style.left) + speed +'px';
                    setTimeout(self.go,interval);
                }else{
                    self.turned = false;
                    imgs.style.left = new_left +'px';
                    if( new_left < - self.imgWidth * (self.imgLen - 1)){
                        imgs.style.left = 0 +'px';
                    }else if( new_left > -self.imgWidth){
                        imgs.style.left = -self.imgWidth * (self.imgLen) +'px';
                    }
                }
            }
            this.go();
        },

        play:function(){
            var self = this;
            this.time = setInterval(function(){
                if(self.currentIndex === self.imgLen){
                    self.currentIndex = 1;
                }else{
                    self.currentIndex += 1;
                }
                self.showDots();
                if(!self.turned){
                    self.turn(-self.imgWidth);
                }
            },self.imgTimes);
        },

        stop:function(){
            clearInterval(this.time);
        },

        right:function(){
            if(this.currentIndex == this.imgLen){
                this.currentIndex = 1;
            }else{
                this.currentIndex += 1;
            }
            this.showDots();
            if(!this.turned){
                this.turn(-this.imgWidth);
            }
        },

        left:function(){
            if(this.currentIndex == 1){
                this.currentIndex = this.imgLen;
            }else{
                this.currentIndex -= 1;
            }
            this.showDots();
            if(!this.turned){
                this.turn(this.imgWidth);
            }
        }

    }

    ChangePicter.fn.init.prototype = ChangePicter.fn;

    return ChangePicter;

}());

