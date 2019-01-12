

(function ($) {


    //遮罩后 用它来变遮罩大小
    var winresize = function () {


        var widthMore = document.body.scrollWidth || (document.documentElement.scrollWidth);
        var sw = Math.max($.getBrowserSize().width, widthMore) + 20;

        var heightMore = document.body.scrollHeight || (document.documentElement.scrollHeight); 
        var sh = Math.max($.getBrowserSize().height, heightMore) + 40;

        $("#divCloseBG,#divCloseBGIF").width(sw);
        $("#divCloseBG,#divCloseBGIF").height(sh);

    };

    //不执行方法
    var returnfalse = function () {
        return false;
    };

    $.extend({

        getHtmlBody: function () {

            if (document.compatMode == "CSS1Compat") {
                return document.documentElement;
            } else {
                return document.body;
            }

        },
        getBrowserSize: function () {
            var pageWidth = window.innerWidth, pageHeight = window.innerHeight;
            if (typeof pageWidth != "number") {
                if (document.compatMode == "CSS1Compat") {
                    pageWidth = document.documentElement.clientWidth;
                    pageHeight = document.documentElement.clientHeight;
                } else {
                    pageWidth = document.body.clientWidth;
                    pageHeight = document.body.clientHeight;
                }
            }
            return {
                width: pageWidth,
                height: pageHeight
            }

        },
        //垂直滚动条所在位置
        getPageScroll: function () {
            var yScroll;
            if (self.pageYOffset) {
                yScroll = self.pageYOffset;
            } else if (document.documentElement && document.documentElement.scrollTop) {
                yScroll = document.documentElement.scrollTop;
            } else if (document.body) {
                yScroll = document.body.scrollTop;
            }
            return yScroll;
        },

        //无用
        isie6: function ()//是否是ie6
        {
            if (navigator["appVersion"].substr(22, 1) == "6") {
                return true;
            }
            else {
                return false;
            }
        },
        //无用
        allselecthide: function (f)//隐藏那些select
        {
            var str = 'none';
            if (f) {
                str = 'inline';
            }
            var x = document.getElementsByTagName('select');
            for (var i = 0; i < x.length; i++) {
                var s = x[i];

                if (str == 'none') {

                    //if(!document.getElementById(s.id+"_span")){
                    var n = document.createElement("span");
                    n.id = s.id + "_span";
                    n.style.width = s.offsetWidth * 0.9;
                    n.style.height = s.offsetHeight;
                    n.style.paddingTop = '5px';
                    n.style.paddingLeft = '5px';
                    n.innerHTML = s.options[s.selectedIndex].text;
                    s.parentNode.insertBefore(n, s);
                    //}
                } else {
                    if (document.getElementById(s.id + "_span")) {
                        document.getElementById(s.id + "_span").parentNode.removeChild(document.getElementById(s.id + "_span"));
                    }
                }

                s.style.display = str;
            }
        },

        setscroll: function (open) {

            var htmlbody = $.getHtmlBody();
            if (open) {
                htmlbody.scroll = "yes"
                htmlbody.style.overflow = "auto";
            } else {
                htmlbody.scroll = "no"
                htmlbody.style.overflow = "hidden";

            }
        },


        cdbg: function (scrolllock)//遮盖背景
        {
            //滚动条  先来滚动条 后面好算宽高
            if (scrolllock) {
                $.setscroll(false);
            }

            //算 宽 
            //var x=%.getHtmlBody().scrollHeight+$.getPageScroll();
            

            var widthMore = document.body.scrollWidth || (document.documentElement.scrollWidth);
            var sw = Math.max($.getBrowserSize().width, widthMore) + 20;
            //算 高
            var heightMore = document.body.scrollHeight || (document.documentElement.scrollHeight);
            var sh = Math.max($.getBrowserSize().height, heightMore) + 50;


            $("<iframe id='divCloseBGIF' frameborder='0' src='about:blank' scroll='no' style='position:absolute;display:none;z-index:500;left:0px;top:0px;overflow:hidden;width:" + sw + "px;height:" + sh + "px;' ></iframe>").appendTo("body");
            $("<div id='divCloseBG' style='position:absolute;display:none;z-index:501;background-color:#000000;left:0px;top:0px;overflow:hidden;width:" + sw + "px;height:" + sh + "px;' ></div>").appendTo("body");


            //jquery接管
            $("#divCloseBGIF,#divCloseBG").css({ opacity: "0", display: "block" });

            //慢慢显示
            $("#divCloseBGIF,#divCloseBG").animate({
                opacity: "1"
            }, 800);

            //变遮罩宽高 
            $(window).bind('resize', winresize);
            //禁止鼠标拖拉选文本
            $(document).bind('selectstart', returnfalse);

        },

        cdbg_close: function ()//关闭背景
        {
            //慢慢消失
            $("#divCloseBG,#divCloseBGIF").animate({
                opacity: "0"
            }, 800, 'swing', function () {
                $('#divCloseBG,#divCloseBGIF').remove(); //移除
                $.setscroll(true)//滚动条
                $(window).unbind('resize', winresize); //遮罩层取消随着变大小
                $(document).unbind('selectstart', returnfalse); //恢复拖拉选文本

            });

        }

    });


})(jQuery);