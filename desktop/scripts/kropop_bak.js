/*
*
*
* kropop 0.5
* Copyright (c) 2011 flyedt   k
* Date: 2011-01-30
* 使用KroPop弹出窗口，窗口内容可以为指定页面、自定义html提示框等。均可返回内容、回调方法。
*
*--------页面必备--------
*
*<!--kropop 小孔-->
*<script type="text/javascript" language="JavaScript" src="js/jquery-1.4.4.js" ></script>//jquery
*<script type="text/javascript" language="JavaScript" src="js/cdbg.js"></script>//背景屏蔽
*<script type="text/javascript" language="JavaScript" src="js/kropop.js"></script>//自己
*<script type="text/javascript" language="JavaScript" src="js/jquery.drag.js"></script>//拖动
*<script type="text/javascript" language="JavaScript" src="js/jquery.corner.js"></script>//圆角
*尚未样式
*
*
*--------页面必备--------
*
*
*------页面使用方法------
*
* $(document).ready(function() {
*        
*        
*        
*        
*        
*        
*	      
*	      
*	      
*		  
*        
*        
*        
*		  
*        
*        
*});
*
*
*
*
*
*
*
*------页面使用方法------
*
*  
*
*所牵扯到的页面：
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*/










(function ($) {

    $.extend({

        Callback: null,
        CloseXWindow: function (closebg) {
            $("#kropop_div").remove();

            if (closebg) {
                $.cdbg_close();
            }
        },

        GetCallback: function () {

            return $.Callback;
        }


    });




    $.fn.resizable = function () {

        this.each(function () {
            var ro = $(this);
            var tid = ro.attr('tid');
            var direction = ro.attr('class').split('-')[2];
            var oss = document.body.onselectstart;

            ro.mousedown(function (event) {


                document.body.onselectstart = function () { return false };

                ro.focus();



                $('*').css('-moz-user-select', 'none');

                var ev = event || window.event;
                var po = { 'x': ev.clientX, 'y': ev.clientY }

                var w = parseInt($('#' + tid).width());
                var h = parseInt($('#' + tid).height());
                var bh = h - 22;

                var l = parseInt($('#' + tid).css('left'));
                var t = parseInt($('#' + tid).css('top'));

                //alert(tid + '\t' + direction);

                if (document.getElementById(tid + '_head')) {
                    bh = bh - $('#' + tid + '_head').height();
                }


                $('body').mousemove(function (event) {

                    var eve = event || window.event;
                    var xx = eve.clientX;
                    var yy = eve.clientY;



                    var xc = xx - po.x;
                    var yc = yy - po.y;



                    if (direction.indexOf("e") > -1) {
                        $('#' + tid).width(w + xc);
                        $('#' + tid + '_table').width(w + xc);
                    }

                    if (direction.indexOf("w") > -1) {

                        $('#' + tid).css('left', l + xc);

                        $('#' + tid).width(w - xc);
                        $('#' + tid + '_table').width(w - xc);

                    }
                    if (direction.indexOf("s") > -1) {

                        $('#' + tid).height(h + yc);
                        $('#' + tid + '_table').height(h + yc);
                        $('#' + tid + '_body').height(bh + yc);

                    }
                    if (direction.indexOf("n") > -1) {
                        $('#' + tid).css('top', t + yc);

                        $('#' + tid).height(h - yc);
                        $('#' + tid + '_table').height(h - yc);
                        $('#' + tid + '_body').height(bh - yc);

                    }






                });





                $('body').mouseup(function () {
                    $('body').unbind('mousemove');
                    $('body').unbind('mouseup');
                    $('body').unbind('select');

                    document.body.onselectstart = oss;

                    $('*').css('-moz-user-select', '-moz-all');
                });
            });




        });

    };




    $.fn.kropopclose = function () {


        this.each(function () {
            $(this).remove();
        });
    };



    $.fn.kropop = function (options)// 
    {
        var defaults = {
            width: 700,
            height: 500,
            top: '',
            left: '',
            //center: true,
            content: "",
            url: "http://g.cn",
            useherf: false,

            showtitle: true,
            title: '',
            titleheight: 30,

            showclose: true,

            bglock: true,
            scrolllock: true,

            drag: true,
            resizable: true,

            callback: function () {
                //alert(id);
            }
        }

        var options = $.extend(defaults, options);

        $.Callback = options.callback;


        var defaultW = parseInt(options.width);
        var defaultH = parseInt(options.height);

        var defaultH_Body = defaultH - 22;

        if (options.showtitle) {
            defaultH_Body = defaultH_Body - parseInt(options.titleheight);
        }

        var top = '';
        var left = '';


        if (options.top == '') {
            top = $.getPageScroll() + ($.getBrowserSize().height - defaultH) / 2 + 'px';
        } else {
            top = parseInt(options.top) + 'px';
        }


        if (parseInt(top) < 0) {
            top = '0px';
        }



        if (options.left == '') {
            left = ($.getBrowserSize().width - defaultW) / 2 + 'px';
        } else {
            left = parseInt(options.left) + 'px';
        }

        if (parseInt(left) < 0) {
            left = '0px';
        }


        defaultW += "px";
        defaultH += "px";

        defaultH_Body += "px";






        var p_html_s = " <div id='this_is_the_ID' class='kropop_div' style=' position:absolute;display:block;z-index:105;top:" + top + ";left:" + left + ";width:" + defaultW + ";height:" + defaultH + ";' > ";



        if (options.showclose) {
            p_html_s += "<a href='#' class='bubbleclose' title='关闭' onclick=\"$(\'#this_is_the_ID\').kropopclose();\" hidefocus='true' ></a>";
        }


        //变大小
        if (options.resizable) {
            p_html_s += "<div class='kp-resizable-se' tid='this_is_the_ID' ></div>";
            p_html_s += "<div class='kp-resizable-sw' tid='this_is_the_ID' ></div>";
            p_html_s += "<div class='kp-resizable-ne' tid='this_is_the_ID' ></div>";
            p_html_s += "<div class='kp-resizable-nw' tid='this_is_the_ID' ></div>";

            p_html_s += "<div class='kp-resizable-n' tid='this_is_the_ID' ></div>";
            p_html_s += "<div class='kp-resizable-e' tid='this_is_the_ID' ></div>";
            p_html_s += "<div class='kp-resizable-s' tid='this_is_the_ID' ></div>";
            p_html_s += "<div class='kp-resizable-w' tid='this_is_the_ID' ></div>";
        }
        //变大小



        p_html_s += " <iframe  src='about:blank'  frameborder='0'  style='opacity:0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity:0; width: 100%; height: 100%; position: absolute;top: 0px; left: 0px;' ></iframe> ";

        p_html_s += " <table id='this_is_the_ID_table'  class='popup'   style=' width:" + defaultW + ";height:" + defaultH + ";' ><tr><td id='topleft' class='corner'></td><td class='top'></td><td id='topright' class='corner'></td></tr><tr><td class='left'></td><td class='center' > ";



        if (options.showtitle) {
            p_html_s += " <div  id='this_is_the_ID_head' class='kropop_div_head'  style='background-color: #00FF0F;width:100%;height:" + parseInt(options.titleheight) + "px;display:block; '    >" + options.title + "</div> ";
        }
        p_html_s += " <div id='this_is_the_ID_body'  class='kropop_div_body'  style=' width:100%; height:" + defaultH_Body + "; ' > ";




        var p_html_e = " </div>";

        p_html_e += "</td><td class='right'></td></tr><tr><td id='bottomleft' class='corner'></td><td class='bottom'></td><td id='bottomright' class='corner'></td></tr></table> ";

        p_html_e += " </div> "








        this.each(function () {
            var theObject = $(this);



            var IFUrl = options.useherf ? theObject.attr('href') : options.url;



            theObject.click(function () {

                if (options.bglock) {
                    $.cdbg(options.scrolllock);
                }


                var the_ID = new Date().getTime();

                //alert(the_ID)

                var p_html = p_html_s.replace(/this_is_the_ID/g, 'id_' + the_ID);







                if (options.content == "") {
                    var p_html_if = "<iframe class='kropop_div_body_if' frameborder='0'  src='" + IFUrl + "' style='width: 100%; height: 100%;'></iframe>";
                    p_html = p_html + p_html_if;
                } else {
                    p_html = p_html + options.content;
                }

                p_html += p_html_e;








                var e = $(p_html);


                e.appendTo(document.body)

                if (options.drag) {
                    e.easydrag();
                }

                if (options.showtitle) {
                    e.setHandler('id_' + the_ID + '_head');
                    $('#id_' + the_ID + '_head').corner("3px");
                }




                //变大小
                if (options.resizable) {
                    $("#id_" + the_ID + " > div[class^='kp-resizable']").resizable();
                }
                //变大小




                return false;


            });

        }
		)
    }



})(jQuery);	