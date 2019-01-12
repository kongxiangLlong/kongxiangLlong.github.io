 




var list_kro = new Array();




 
Array.prototype.remove = function (obj) {

    for (var i = 0; i < this.length; ++i) {

        if (this[i] == obj) {

            this.splice(i, 1);

            break;

        }

    }

};



Array.prototype.getIndexByCId = function (c_id) {
    var l = this.length;
    for (var i = 0; i < l; i++) {
        var item = this[i];
        if (item.c_id == c_id) {
            return i;
        }
    }

    return -1;
};

Array.prototype.getByCId = function (c_id) {
    var l = this.length;
    for (var i = 0; i < l; i++) {
        var item = this[i]; 
        if (item.c_id == c_id) {
            return item;
        }
    }

    return null;
};


Array.prototype.getById = function (id) {
    var l = this.length;
    for (var i = 0; i < l; i++) {
        var item = this[i];
        if (item.id == id) {
            return item;
        }
    }

    return null;
};


Array.prototype.getByTitle = function (title) {
    var l = this.length;
    for (var i = 0; i < l; i++) {
        var item = this[i];
        if (item.title == title) {
            return item;
        }
    }

    return null;
};


String.prototype.PadLeft = function (width, char) {
    var str=this;
    while (str.length < width) {
        str =  char+str;
    }
    return str;
};



Number.prototype.PadLeft = function (width, char) {
    var str=this.toString();

    return str.PadLeft(width,char);
};




function padLeft(str, pad, count) {
    while (str.length < count)
        str = pad + str;
    return str;
}



var returnfalse = function () {
    return false;
};


var hasDrag = false;

var NowTime = null;



var clockInterval = null;
var gwglInterval = null;
var xxglInterval = null;
var dctzInterval = null;



(function ($) {




    //拖动
    var TheDragObject = null;

    function md(e, id) {
        var _id = id;
        if (_id == undefined) {
            _id = this.id.split('_')[2];
        }
        
        $('*').css('-moz-user-select', 'none');

        var eve = e || window.event;

        var dd = new DivDrag(_id);
        TheDragObject = dd;
        TheDragObject.flagX = eve.pageX;
        TheDragObject.flagY = eve.pageY;
        TheDragObject.flagLeft = parseInt($("#divwindow_" + _id).css('left'));
        TheDragObject.flagTop = parseInt($("#divwindow_" + _id).css('top'));

        $(document).mousemove(mm);
        $(document).mouseup(mu);

        $('#divwindow_border_' + TheDragObject.ID).css('z-index', '1002');
        $(document).bind('selectstart', returnfalse);
         

    }
    function mm(e) {
    
        hasDrag=true;
        var xx = e.pageX;
        var yy = e.pageY;

        var xflag = true;
        var yflag = true;


        if (parseInt($("#divwindow_" + TheDragObject.ID).css('top')) <= 5 && ((yy + TheDragObject.flagTop - TheDragObject.flagY) <= 5)) {
            yflag = false;
        }




        if (parseInt($("#divwindow_" + TheDragObject.ID).css('top')) >= ($(window).height() - $('#divwindow_' + TheDragObject.ID).height() - 10) && ((yy + TheDragObject.flagTop - TheDragObject.flagY) >= ($(window).height() - $('#divwindow_' + TheDragObject.ID).height() - 10))) {
            yflag = false;
        }



        if (parseInt($("#divwindow_" + TheDragObject.ID).css('left')) <= 5 && ((xx + TheDragObject.flagLeft - TheDragObject.flagX) <= 5)) {
            xflag = false;
        }


        if (parseInt($("#divwindow_" + TheDragObject.ID).css('left')) >= ($(window).width() - $('#divwindow_' + TheDragObject.ID).width() - 10) && ((xx + TheDragObject.flagLeft - TheDragObject.flagX) >= ($(window).width() - $('#divwindow_' + TheDragObject.ID).width() - 10))) {
            xflag = false;
        }




        var xm = xx - TheDragObject.flagX;
        var ym = yy - TheDragObject.flagY;

        if (xflag) {
            $("#divwindow_" + TheDragObject.ID).css('left', TheDragObject.flagLeft + xm);
        }
        if (yflag) {
            $("#divwindow_" + TheDragObject.ID).css('top', TheDragObject.flagTop + ym);
        }
         
    }

    function mu(e) {

        $('#divwindow_border_' + TheDragObject.ID).css('z-index', '999');
        $(document).unbind('mousemove', mm);
        $(document).unbind('mouseup', mu);


         

        if(TheDragObject.flagX == e.pageX&&TheDragObject.flagY == e.pageY)
        {
            hasDrag=false;
        }
            
        TheDragObject = null;
        $('*').css('-moz-user-select', '-moz-all'); 

        $(document).unbind('selectstart', returnfalse); //恢复拖拉选文本
        
        
        
    }


    function DivDrag(id) {
        this.flagX;
        this.flagY;
        this.flagTop;
        this.flagLeft;
        this.ID = id;
    }

    $.divdrag = function (id) {


        var o = 'divwindow_titlebar_' + id;
        $("#" + o).live('mousedown', md);

    }

    //拖动



    //大小


    $.fn.resizable = function () {

        this.each(function () {

            var ro = $(this);

            var _id = this.id.split('_')[3];


            var position = this.id.split('_')[2];
            ro.mousedown(function (event) {



                $('#divwindow_border_' + _id).css('z-index', '1002');

                $(document).bind('selectstart', returnfalse);
                $('*').css('-moz-user-select', 'none');

                var cursor = ro.css('cursor');
                ro.focus();

                $('body').css('cursor', cursor);


                var ev = event || window.event;
                var po = { 'x': ev.clientX, 'y': ev.clientY }

                var w1 = parseInt($("#divwindow_" + _id).width());
                var h1 = parseInt($("#divwindow_" + _id).height());

                var w2 = parseInt($("#divwindow_box_" + _id).width());
                var h2 = parseInt($("#divwindow_box_" + _id).height());

                var w3 = parseInt($("#divwindow_body_" + _id).width());
                var h3 = parseInt($("#divwindow_body_" + _id).height());



                var l = parseInt($("#divwindow_" + _id).css('left'));
                var t = parseInt($("#divwindow_" + _id).css('top'));





                $(document).mousemove(function (event) {

                    var eve = event || window.event;
                    var xx = eve.clientX;
                    var yy = eve.clientY;



                    var xc = xx - po.x;
                    var yc = yy - po.y;



                    if (position.indexOf("r") > -1) {
                        $("#divwindow_" + _id).width(w1 + xc);
                        $("#divwindow_box_" + _id).width(w2 + xc);
                        $("#divwindow_body_" + _id).width(w3 + xc);


                    }

                    if (position.indexOf("l") > -1) {

                        $("#divwindow_" + _id).css('left', l + xc);

                        $("#divwindow_" + _id).width(w1 - xc);
                        $("#divwindow_box_" + _id).width(w2 - xc);
                        $("#divwindow_body_" + _id).width(w3 - xc);

                    }
                    if (position.indexOf("b") > -1) {

                        $("#divwindow_" + _id).height(h1 + yc);

                        $("#divwindow_box_" + _id).height(h2 + yc);
                        $("#divwindow_body_" + _id).height(h3 + yc);



                    }
                    if (position.indexOf("t") > -1) {
                        $("#divwindow_" + _id).css('top', t + yc);

                        $("#divwindow_" + _id).height(h1 - yc);
                        $("#divwindow_box_" + _id).height(h2 - yc);
                        $("#divwindow_body_" + _id).height(h3 - yc);


                    }

                });

                $(document).mouseup(function () {

                    $('#divwindow_border_' + _id).css('z-index', '999');
                    $(document).unbind('mousemove');
                    $(document).unbind('mouseup');
                    $(document).unbind('selectstart', returnfalse);


                    $('body').css('cursor', '');

                    $('*').css('-moz-user-select', '-moz-all');
                });

            });

        });
    }


    $.divresize = function (id) {

        $("#divwindow_box_" + id + " > div[class^='divwindow_resize_item']").resizable()

    }

    //大小


    //多个共存切换焦点
    $.divfocus = function (id) {
        $.windowfocus(id);
        $(".divwindow_border").mousedown(function (event) {
            var c_id = this.id.split('_')[2];
            $.windowfocus(c_id);

            if(list_kro.getByCId(c_id).draggable)
            {
                md(event, c_id);
            }
        });
    }


    $.windowfocus = function (id) {
    

        $('.divwindowCur').attr('class', 'divwindow');

        
        $('.dw_b_t').css("backgroundPosition", "0 -80px");
        $('.dw_b_rt').css("backgroundPosition", "-12px 0");
        $('.dw_b_r').css("backgroundPosition", "-12px 0");
        $('.dw_b_rb').css("backgroundPosition", "-12px -12px");
        $('.dw_b_b').css("backgroundPosition", "0 -92px");
        $('.dw_b_lb').css("backgroundPosition", "0 -12px");
        $('.dw_b_l').css("backgroundPosition", "0 0");
        $('.dw_b_lt').css("backgroundPosition", "0 0");


        $('.divwindow_border').css('z-index', '1002');

        $('.divwindow_titlebar').css("backgroundImage", "url(images/window.png)");
        $('#divwindow_' + id).attr('class', 'divwindowCur');
        $('#divwindow_border_' + id).css('z-index', '999');



        $('#dw_b_t_' + id).css("backgroundPosition", "0 -100px");
        $('#dw_b_rt_' + id).css("backgroundPosition", "-32px 0");
        $('#dw_b_r_' + id).css("backgroundPosition", "-32px 0");
        $('#dw_b_rb_' + id).css("backgroundPosition", "-32px -12px");
        $('#dw_b_b_' + id).css("backgroundPosition", "0 -112px");
        $('#dw_b_lb_' + id).css("backgroundPosition", "-20px -12px");
        $('#dw_b_l_' + id).css("backgroundPosition", "-20px 0");
        $('#dw_b_lt_' + id).css("backgroundPosition", "-20px 0");


        $('#divwindow_titlebar_' + id).css("backgroundImage", "url(images/window_cur.png)");

        $.TaskbarCenterCur(id);
    }

    //多个共存切换焦点


    //生成html
    $.getKropopHTMl = function (options) {
        var id = options.c_id;
        var defaultW = parseInt(options.width);
        var defaultH = parseInt(options.height);


        var defaultW_box=defaultW-16;
        var defaultH_box=defaultH-16;

        var defaultW_ifr=defaultW-16;
        var defaultH_ifr=defaultH-16;

 

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
        


        if(options.border_visable==true)
        {
            defaultW_ifr = defaultW_box - 2;
            defaultH_ifr = defaultH_box - 2;
        }

        if(options.title_visable==true)
        { 
            defaultH_ifr = defaultH_box - 20;
        }




        defaultW += "px";
        defaultH += "px";


        defaultW_box += "px";
        defaultH_box += "px";

        defaultW_ifr += "px";
        defaultH_ifr += "px";

        




        var html = "<div id='divwindow_" + id + "' class='divwindow' style='top:" + top + ";left:" + left + ";width:" + defaultW + ";height:" + defaultH + "; ' >" +

                        "<div id='divwindow_box_" + id + "' class='divwindow_box' style='width:" + defaultW_box + ";height:" + defaultH_box + ";"+ ((options.background==true)?"background-color:White;":"")+((options.border_visable==true)?"border: 1px solid #A1B4B0;":"") +" ' >";

        if(options.border_visable==true)
        {
            html+="<div id='divwindow_border_" + id + "' class='divwindow_border' >" +
                        "<div id='dw_b_center_" + id + "' class='divwindow_border_item dw_b_center'></div>" +
                        "<div id='dw_b_t_" + id + "' class='divwindow_border_item dw_b_t'></div>" +
                        "<div id='dw_b_rt_" + id + "' class='divwindow_border_item dw_b_rt'></div>" +
                        "<div id='dw_b_r_" + id + "' class='divwindow_border_item dw_b_r'></div>" +
                        "<div id='dw_b_rb_" + id + "' class='divwindow_border_item dw_b_rb'></div>" +
                        "<div id='dw_b_b_" + id + "' class='divwindow_border_item dw_b_b'></div>" +
                        "<div id='dw_b_lb_" + id + "' class='divwindow_border_item dw_b_lb'></div>" +
                        "<div id='dw_b_l_" + id + "' class='divwindow_border_item dw_b_l'></div>" +
                        "<div id='dw_b_lt_" + id + "' class='divwindow_border_item dw_b_lt'></div>" +
                    "</div>";
        }
        html+="<div id='divwindow_content_" + id + "' class='divwindow_content' >";
        
        if(options.title_visable==true)
        {

            html+="<div id='divwindow_titlebar_" + id + "' class='divwindow_titlebar' >" +


                        "<div id='divwindow_title_" + id + "' class='divwindow_title' >" +

                            options.title +

                        "</div>" +

                    "</div>" +
   

                    "<div id='divwindow_titlebuttons_" + id + "' class='divwindow_titlebuttons' >" +


                        "<span id='divwindow_titlebuttons_min_" + id + "' class='divwindow_titlebuttons_item divwindow_titlebuttons_min' title='最小化' style='display: inline-block; '></span>";

                        if(options.max_visable==true&&options.resizable==true)
                        {
                            html+="<span id='divwindow_titlebuttons_restore_" + id + "' class='divwindow_titlebuttons_item divwindow_titlebuttons_restore' title='还原' style='display: none; '></span>" +
                                "<span id='divwindow_titlebuttons_max_" + id + "' class='divwindow_titlebuttons_item divwindow_titlebuttons_max' title='最大化' style='display:inline-block; '></span>";
                        }
                        html+="<span id='divwindow_titlebuttons_close_" + id + "' class='divwindow_titlebuttons_item divwindow_titlebuttons_close' title='关闭' style='display:inline-block; '></span>" +
                        "</div>"; 

        }
        html+="<div id='divwindow_body_" + id + "' class='divwindow_body' style='width:" + defaultW_ifr + ";height:" + defaultH_ifr + ";  "+ ((options.title_visable==true)?"top: 20px;":"top:0px")  +" ' >" +

                    "<iframe frameborder='0' id='divwindow_iframe_" + id + "' class='divwindow_iframe' width='100%' height='100%' style='border: 1px;' border='0' allowtransparency='true' src='" + options.href + "' ></iframe>" +

                    "</div>" +

                "</div>";

        if(options.border_visable==true&&options.resizable==true)
        {
            html+="<div id='divwindow_resize_t_" + id + "' class='divwindow_resize_item divwindow_resize_t' ></div>" +
                    "<div id='divwindow_resize_r_" + id + "' class='divwindow_resize_item divwindow_resize_r' ></div>" +
                    "<div id='divwindow_resize_b_" + id + "' class='divwindow_resize_item divwindow_resize_b' ></div>" +
                    "<div id='divwindow_resize_l_" + id + "' class='divwindow_resize_item divwindow_resize_l' ></div>" +
                    "<div id='divwindow_resize_rt_" + id + "' class='divwindow_resize_item divwindow_resize_rt'></div>" +
                    "<div id='divwindow_resize_rb_" + id + "' class='divwindow_resize_item divwindow_resize_rb'></div>" +
                    "<div id='divwindow_resize_lb_" + id + "' class='divwindow_resize_item divwindow_resize_lb'></div>" +
                    "<div id='divwindow_resize_lt_" + id + "' class='divwindow_resize_item divwindow_resize_lt'></div>";
        }


        html+="</div></div>";
        return html;


    }
    //生成html


    //按钮绑定
    $.buttons = function (id) {
        $('#divwindow_titlebuttons_min_' + id).mouseover(function () { $(this).css('backgroundPosition', '-63px -53px') });
        $('#divwindow_titlebuttons_min_' + id).mouseout(function () { $(this).css('backgroundPosition', '-63px -24px') });

        $('#divwindow_titlebuttons_restore_' + id).mouseover(function () { $(this).css('backgroundPosition', '-183px -53px') });
        $('#divwindow_titlebuttons_restore_' + id).mouseout(function () { $(this).css('backgroundPosition', '-183px -24px') });

        $('#divwindow_titlebuttons_max_' + id).mouseover(function () { $(this).css('backgroundPosition', '-94px -53px') });
        $('#divwindow_titlebuttons_max_' + id).mouseout(function () { $(this).css('backgroundPosition', '-94px -24px') });

        $('#divwindow_titlebuttons_close_' + id).mouseover(function () { $(this).css('backgroundPosition', '-123px -53px') });
        $('#divwindow_titlebuttons_close_' + id).mouseout(function () { $(this).css('backgroundPosition', '-123px -24px') });



        $('#divwindow_titlebuttons_min_' + id).click(function () {
            list_kro.getByCId(id).status = 'min';
            $('#divwindow_' + id).hide();
        });




        $('#divwindow_titlebuttons_restore_' + id).click(function () {

            var item=list_kro.getByCId(id);
            item.status = 'restore';

            var p = item.p;

            var width = parseInt(p.width);
            var height = parseInt(p.height);

            var top = p.top;
            var left = p.left;


            $('#divwindow_' + id).width(width);
            $("#divwindow_box_" + id).width(width - 16);
            $("#divwindow_body_" + id).width(width - 2 - 16);


            $('#divwindow_' + id).height(height);
            $("#divwindow_box_" + id).height(height - 16);
            $("#divwindow_body_" + id).height(height - 22 - 16);


            $('#divwindow_' + id).css('top', top);
            $('#divwindow_' + id).css('left', left);
            $(this).hide();
            $('#divwindow_titlebuttons_max_' + id).css('display', 'inline-block');
        });





        $('#divwindow_titlebuttons_max_' + id).click(function () {

            var item=list_kro.getByCId(id);
            item.status = 'max';

            var width = $('#divwindow_' + id).width();
            var height = $('#divwindow_' + id).height();

            var top = $('#divwindow_' + id).css('top');
            var left = $('#divwindow_' + id).css('left');

            item.p = { 'width': width, 'height': height, 'top': top, 'left': left };


            width = parseInt($(document).width()) - 16 ;
            height = parseInt($.getBrowserSize().height) - 16;

            $('#divwindow_' + id).width(width);
            $("#divwindow_box_" + id).width(width - 16);
            $("#divwindow_body_" + id).width(width - 2 - 16);


            $('#divwindow_' + id).height(height);
            $("#divwindow_box_" + id).height(height - 16);
            $("#divwindow_body_" + id).height(height - 22 - 16);


            $('#divwindow_' + id).css('top', '5px');
            $('#divwindow_' + id).css('left', '5px');
            $(this).hide();
            $('#divwindow_titlebuttons_restore_' + id).css('display', 'inline-block');
        });




        $('#divwindow_titlebuttons_close_' + id).click(function () {
            list_kro.getByCId(id).status = 'close';

            $('#divwindow_' + id).remove();
            $.TaskbarCenterDel(id);
        });

    }
    //按钮绑定

    //调用式弹出框
    $.kropop = function (options) {
        var defaults = {
            width: 800,
            height: 550,
            top: '',
            left: '',
            href: "http://www.cnblogs.com",
            title: '测试Title',
            c_id: '',
            bglock: false,
            border_visable:true,
            resizable:true,
            draggable:true,
            title_visable:true,
            max_visable:true,
            background:true 

        }

        
  
        if(list_kro.getByCId(options.c_id)!=null)
        {
            $.windowfocus(options.c_id);
            return;
        } 

        var new_options = $.extend(defaults, options);
        var html = $.getKropopHTMl(new_options);

        if (new_options.bglock) {
            $.cdbg();
        }

        var e = $(html);
        e.appendTo(document.body);


        $.buttons(new_options.c_id);

        
        if(new_options.draggable)
        {
            $.divdrag(new_options.c_id);
        }


        if(new_options.resizable){
            $.divresize(new_options.c_id);
        }
        $.divfocus(new_options.c_id);

        list_kro.push({ 'c_id': new_options.c_id, 'status': 'restore', 'title': new_options.title ,'draggable':new_options.draggable})
        $.TaskbarCenterAdd(new_options.c_id);

    }






    //弹出框
    $.fn.Kropop = function (options) {

        var defaults = {
            width: 800,
            height: 550,
            top: '',
            left: '',
            href: "http://www.cnblogs.com",
            title: '测试Title',
            c_id: '',
            bglock: false,
            border_visable:true,
            resizable:true,
            draggable:true,
            title_visable:true,
            max_visable:true,
            background:true 
        }



        this.each(function () {
            var theObject = $(this);
            var new_options = $.extend(defaults, options);

            /* 
            var  svar="";

            for (var i in new_options) 
            {
                svar+=i+":";
                svar+=new_options[i];
                svar+=",\r\n"
            }
            alert(svar);
            */
            theObject.click(function () {

             
  
                if(list_kro.getByCId(options.c_id)!=null)
                {
                    $.windowfocus(options.c_id);
                    return;
                } 


                var html = $.getKropopHTMl(new_options);

                if (new_options.bglock) {
                    $.cdbg();
                }

                var e = $(html);
                e.appendTo(document.body);


                $.buttons(new_options.c_id);

        
                if(new_options.draggable)
                {
                    $.divdrag(new_options.c_id);
                }
                
                if(new_options.resizable){
                    $.divresize(new_options.c_id);
                } 
                $.divfocus(new_options.c_id);
                 
                list_kro.push({ 'c_id': new_options.c_id, 'status': 'restore', 'title': new_options.title ,'draggable':new_options.draggable})
                $.TaskbarCenterAdd(new_options.c_id);


            });

        }
		)
    }





    

    //督查通知html
    $.getDCTZHTMl=function (options) 
    {
        var id = options.c_id;
        var defaultW = parseInt(options.width);
        var defaultH = parseInt(options.height);


        var defaultW_box=defaultW;
        var defaultH_box=defaultH;

        var defaultW_ifr=defaultW;
        var defaultH_ifr=defaultH-21;

 

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
        


        if(options.border_visable==true)
        {
            defaultW_ifr = defaultW_box - 2;
            defaultH_ifr = defaultH_box - 2;
        }
 



        defaultW += "px";
        defaultH += "px";


        defaultW_box += "px";
        defaultH_box += "px";

        defaultW_ifr += "px";
        defaultH_ifr += "px";

        




        var html = "<div id='divwindow_" + id + "' class='divwindow' style='  top:" + top + ";left:" + left + ";width:" + defaultW + ";height:" + defaultH + "; ' >" +

                        "<div id='divwindow_box_" + id + "' class='divwindow_box' style='margin: 0px; width:" + defaultW_box + ";height:" + defaultH_box + "; ' >";
 
        html+="<div  style='height:21px;position: relative; display:block;' >"+
              
              "<div id='divwindow_Closeob_" + id + "' class='divwindow_Closeob'  > </div>"+
                
                "<div class='both'></div>"+
                "</div>";
            

        html+="<div id='divwindow_content_" + id + "' class='divwindow_content' style='height:"+defaultH_ifr+"'   >";


        html+="<div id='divwindow_body_" + id + "' class='divwindow_body' style='width:" + defaultW_ifr + ";height:" + defaultH_ifr + ";top:0px;' >" +
         
                        "<div style=' width:100%;height:100%;background: url(images/DCTZ.png) no-repeat;margin:0px;top:0px;' >"+
                            "<div style='line-height:35px;height:35px;' ></div>"+
                            "<div id='DCTZ1' class='divlink' style='top:34px;'>督查通知(<span id='DCTZ1_count' >*</span>)</div>"+
                            "<div id='DCTZ2' class='divlink' style='top:56px;'>督查通知单(<span id='DCTZ2_count' >*</span>)</div>"+
                            "<div id='DCTZ3' class='divlink' style='top:78px;'>督查通报(<span id='DCTZ3_count' >*</span>)</div>"+ 
                            "<div id='DCTZ4' class='divlink' style='top:100px;'>网上民声(<span id='DCTZ4_count' >*</span>)</div>"+ 
                        "</div>"+
                    "</div>" +

                "</div>";

 

        html+="</div></div>";
        return html;
    }



    //督查通知
    $.fn.DCTZ=function(options)
    {
        var defaults = {
            width: 100,
            height: 160,
            top: '',
            left: '', 
            title: '公文管理',
            c_id: '',
            bglock: false,
            border_visable:false,
            resizable:false,
            draggable:true,
            title_visable:false,
            max_visable:false,
            background:false
        }

        this.each(function () {
        
            
            var theObject = $(this);
            var new_options = $.extend(defaults, options);
        

            theObject.click(function () {
            
            
                if(list_kro.getByCId(options.c_id)!=null)
                {
                    $.windowfocus(options.c_id);
                    return;
                } 
                
                var html = $.getDCTZHTMl(new_options);
                
                var e = $(html);
                e.appendTo(document.body);
                 
         
                $.divfocus(new_options.c_id);
                 
                                  
                
                $("#divwindow_" + new_options.c_id ).mousedown(function (event) { 
                    var _id = this.id.split('_')[1];
                    $.windowfocus(_id);
                    md(event, _id);
                });
                
                $("#divwindow_" + new_options.c_id ).mouseover(function (event) { 
                    var _id = this.id.split('_')[1];
                    $("#divwindow_Closeob_" + _id ).css('display','block');
                });
                $("#divwindow_" + new_options.c_id ).mouseout(function (event) { 
                    var _id = this.id.split('_')[1];
                    $("#divwindow_Closeob_" + _id ).css('display','none');
                });
                



                $('#divwindow_Closeob_'+new_options.c_id ).click(
                    function()
                    {
                        var _id = this.id.split('_')[2];
                        list_kro.getByCId(_id).status = 'close';

                        $('#divwindow_' + _id).remove();
                        $.TaskbarCenterDel(_id); 
                        clearInterval(dctzInterval);
                        dctzInterval=null;
                    }
                );

 

                $('#DCTZ1').click(function(){

                    if(!hasDrag)
                    {
                        $.kropop({c_id:'A8', width:780, title:'督查通知',href:'../dck/Default.aspx?bFlag=0&classid=100009'});
                    }else{
                        hasDrag=false;
                    }
                });
                $('#DCTZ2').click(function(){
                    
                    if(!hasDrag)
                    {
                        $.kropop({c_id:'A9',width:780,title:'督查通知单',href:'../dck/Default.aspx?bFlag=0&classid=100010'});
                    }else{
                        hasDrag=false;
                    }
                });
                $('#DCTZ3').click(function(){
                    if(!hasDrag)
                    {
                        $.kropop({c_id:'A10',width:780,title:'督查通报',href:'../dck/Default.aspx?bFlag=0&classid=100011'});
                    }else{
                        hasDrag=false;
                    }
                });

                $('#DCTZ4').click(function(){
                    if(!hasDrag)
                    {
                        $.kropop({c_id:'A11',width:780,title:'网上民声',href:'../dck/Default.aspx?bFlag=0&classid=100015'});
                    }else{
                        hasDrag=false;
                    }
                });

                 
                list_kro.push({ 'c_id': new_options.c_id, 'status': 'restore', 'title': new_options.title ,'draggable':new_options.draggable})
                $.TaskbarCenterAdd(new_options.c_id);
            
            
                $.DCTZrun();
                dctzInterval=setInterval(function () { $.DCTZrun() }, '10000');
                
            });

         

        });


    }


    

    
    //公文管理刷
    $.DCTZrun=function()
    {
        $.get("desktop.ashx", { "do": "DCTZ","s":new Date().getTime() },
              function(data){   
                if(data.substr(0,3)=="loo")
                {
                    location = '../logout.aspx'; 
                    return;
                }            
                var objs=eval("("+data+")");
                
                $('#DCTZ1_count').html(objs.tz);
                $('#DCTZ2_count').html(objs.tzd);
                $('#DCTZ3_count').html(objs.tb);
                $('#DCTZ4_count').html(objs.ms);
                 
              });
    }









    //公文管理html
    $.getGWGLHTMl=function (options) 
    {

     
        var id = options.c_id;
        var defaultW = parseInt(options.width);
        var defaultH = parseInt(options.height);


        var defaultW_box=defaultW;
        var defaultH_box=defaultH;

        var defaultW_ifr=defaultW;
        var defaultH_ifr=defaultH-21;

 

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
        


        if(options.border_visable==true)
        {
            defaultW_ifr = defaultW_box - 2;
            defaultH_ifr = defaultH_box - 2;
        }
 



        defaultW += "px";
        defaultH += "px";


        defaultW_box += "px";
        defaultH_box += "px";

        defaultW_ifr += "px";
        defaultH_ifr += "px";

        




        var html = "<div id='divwindow_" + id + "' class='divwindow' style='  top:" + top + ";left:" + left + ";width:" + defaultW + ";height:" + defaultH + "; ' >" +

                        "<div id='divwindow_box_" + id + "' class='divwindow_box' style='margin: 0px; width:" + defaultW_box + ";height:" + defaultH_box + "; ' >";
 
        html+="<div  style='height:21px;position: relative; display:block;' >"+
              
              "<div id='divwindow_Closeob_" + id + "' class='divwindow_Closeob'  > </div>"+
                
                "<div class='both'></div>"+
                "</div>";
            

        html+="<div id='divwindow_content_" + id + "' class='divwindow_content'  style='height:"+defaultH_ifr+"' >";


        html+="<div id='divwindow_body_" + id + "' class='divwindow_body' style='width:" + defaultW_ifr + ";height:" + defaultH_ifr + ";top:0px;' >" +
         
                        "<div style=' width:100%;height:100%;background: url(images/GWGL.png) no-repeat;margin:0px;top:0px;' >"+
                            "<div style='line-height:35px;height:35px;' ></div>"+
                            "<div id='t1' class='divlink' style='top:34px;'>文件传阅(<span id='t1_count' >*</span>)</div>"+
                            "<div id='t2' class='divlink' style='top:56px;'>待办件(<span id='t2_count' >*</span>)</div>"+
                            "<div id='t3' class='divlink' style='top:78px;'>用章申请(<span id='t3_count' >*</span>)</div>"+ 
                            "<div id='t4' class='divlink' style='top:100px;'>收文(<span id='t4_count' >*</span>)</div>"+ 
                        "</div>"+
                    "</div>" +

                "</div>";

 

        html+="</div></div>";
        return html;
         
          
    }


    






 




 
 


    //公文管理
    $.fn.GWGL = function (options) {

        var defaults = {
            width: 100,
            height: 160,
            top: '',
            left: '', 
            title: '公文管理',
            c_id: '',
            bglock: false,
            border_visable:false,
            resizable:false,
            draggable:true,
            title_visable:false,
            max_visable:false,
            background:false 

        } 

        this.each(function () {
        
            
            var theObject = $(this);
            var new_options = $.extend(defaults, options);
        

            theObject.click(function () {
            
            
                if(list_kro.getByCId(options.c_id)!=null)
                {
                    $.windowfocus(options.c_id);
                    return;
                } 
                
                var html = $.getGWGLHTMl(new_options);
                
                var e = $(html);
                e.appendTo(document.body);
                 
         
                $.divfocus(new_options.c_id);
                 
                                  
                
                $("#divwindow_" + new_options.c_id ).mousedown(function (event) { 
                    var _id = this.id.split('_')[1];
                    $.windowfocus(_id);
                    md(event, _id);
                });
                
                $("#divwindow_" + new_options.c_id ).mouseover(function (event) { 
                    var _id = this.id.split('_')[1];
                    $("#divwindow_Closeob_" + _id ).css('display','block');
                });
                $("#divwindow_" + new_options.c_id ).mouseout(function (event) { 
                    var _id = this.id.split('_')[1];
                    $("#divwindow_Closeob_" + _id ).css('display','none');
                });
                



                $('#divwindow_Closeob_'+new_options.c_id ).click(
                    function()
                    {
                        var _id = this.id.split('_')[2];
                        list_kro.getByCId(_id).status = 'close';

                        $('#divwindow_' + _id).remove();
                        $.TaskbarCenterDel(_id); 
                        clearInterval(gwglInterval);
                        gwglInterval=null;
                    }
                );

 

                $('#t1').click(function(){

                    if(!hasDrag)
                    {
                        $.kropop({c_id:'A1',width:780,title:'文件传阅',href:'../mainFlow/browseList.aspx?bFlag=2&classid=100012'});
                    }else{
                        hasDrag=false;
                    }
                });
                $('#t2').click(function(){
                    
                    if(!hasDrag)
                    {
                        $.kropop({c_id:'A2',width:780,title:'待办件',href:'../mainFlow/browseList.aspx?bFlag=2&classid=100006'});
                    }else{
                        hasDrag=false;
                    }
                });
                $('#t3').click(function(){
                    if(!hasDrag)
                    {
                        $.kropop({c_id:'A3',width:780,title:'用章申请',href:'../mainFlow/browseList.aspx?bFlag=2&classid=100008'});
                    }else{
                        hasDrag=false;
                    }
                });

                $('#t4').click(function(){
                    if(!hasDrag)
                    {
                        $.kropop({c_id:'A4',width:780,title:'收文',href:'../mainFlow/browseList.aspx?bFlag=2&classid=100016'});
                    }else{
                        hasDrag=false;
                    }
                });

                 
                list_kro.push({ 'c_id': new_options.c_id, 'status': 'restore', 'title': new_options.title ,'draggable':new_options.draggable})
                $.TaskbarCenterAdd(new_options.c_id);
            
            
                $.GWGLrun();
                gwglInterval=setInterval(function () { $.GWGLrun() }, '10000');
                
            });

         

        });


    }


    //公文管理刷
    $.GWGLrun=function()
    {
        $.get("desktop.ashx", { "do": "GWGL","s":new Date().getTime() },
              function(data){   
              
                if(data.substr(0,3)=="loo")
                {
                    location = '../logout.aspx'; 
                    return;
                }          
                var objs=eval("("+data+")");
                
                $('#t1_count').html(objs.a);
                $('#t2_count').html(objs.b);
                $('#t3_count').html(objs.c);
                $('#t4_count').html(objs.d);
                 
              });
    }



    //信息管理 
    $.getXXGLHTMl=function (options) 
    {

     
        var id = options.c_id;
        var defaultW = parseInt(options.width);
        var defaultH = parseInt(options.height);


        var defaultW_box=defaultW;
        var defaultH_box=defaultH;

        var defaultW_ifr=defaultW;
        var defaultH_ifr=defaultH-21;

 

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
        


        if(options.border_visable==true)
        {
            defaultW_ifr = defaultW_box - 2;
            defaultH_ifr = defaultH_box - 2;
        }
 



        defaultW += "px";
        defaultH += "px";


        defaultW_box += "px";
        defaultH_box += "px";

        defaultW_ifr += "px";
        defaultH_ifr += "px";

        




        var html = "<div id='divwindow_" + id + "' class='divwindow' style='   top:" + top + ";left:" + left + ";width:" + defaultW + ";height:" + defaultH + "; ' >" +

                        "<div id='divwindow_box_" + id + "' class='divwindow_box' style='margin: 0px; width:" + defaultW_box + ";height:" + defaultH_box + "; ' >";
 
        html+="<div  style='height:21px;position: relative; display:block;' >"+
              
              "<div id='divwindow_Closeob_" + id + "' class='divwindow_Closeob'  > </div>"+
                
                "<div class='both'></div>"+
                "</div>";
            

        html+="<div id='divwindow_content_" + id + "' class='divwindow_content'  style='height:"+defaultH_ifr+"'  >";


        html+="<div id='divwindow_body_" + id + "' class='divwindow_body' style='width:" + defaultW_ifr + ";height:" + defaultH_ifr + ";top:0px;' >" +
         
                        "<div style=' width:100%;height:100%;background: url(images/XXGL.png)  no-repeat;margin:0px;top:0px;' >"+
                            "<div style='line-height:35px;height:35px;' ></div>"+
                            "<div id='XXGL1' class='divlink' style='top:38px; '>发信息</div>"+
                            "<div id='XXGL2' class='divlink' style='top:62px; '>收件箱(<span id='XXGL2_count' >*</span>-<span id='XXGL2_count_NR' >*</span>)</div>"+
                            "<div id='XXGL3' class='divlink' style='top:88px; '>发件箱(<span id='XXGL3_count' >*</span>)</div>"+ 
                        "</div>"+
                    "</div>" +

                "</div>";

 

        html+="</div></div>";
        return html;
         
          
    }



    

    //信息管理
    $.fn.XXGL = function (options) {

        var defaults = {
            width: 100,
            height: 160,
            top: '',
            left: '', 
            title: '信息管理',
            c_id: '',
            bglock: false,
            border_visable:false,
            resizable:false,
            draggable:true,
            title_visable:false,
            max_visable:false,
            background:false 

        } 

        this.each(function () {
        
            
            var theObject = $(this);
            var new_options = $.extend(defaults, options);
        

            theObject.click(function () {
            
            
                if(list_kro.getByCId(options.c_id)!=null)
                {
                    $.windowfocus(options.c_id);
                    return;
                } 
                
                var html = $.getXXGLHTMl(new_options);
                
                var e = $(html);
                e.appendTo(document.body);
                 
         
                $.divfocus(new_options.c_id);
                 
                                  
                
                $("#divwindow_" + new_options.c_id ).mousedown(function (event) { 
                    var _id = this.id.split('_')[1];
                    $.windowfocus(_id);
                    md(event, _id);
                });
                
                $("#divwindow_" + new_options.c_id ).mouseover(function (event) { 
                    var _id = this.id.split('_')[1];
                    $("#divwindow_Closeob_" + _id ).css('display','block');
                });
                $("#divwindow_" + new_options.c_id ).mouseout(function (event) { 
                    var _id = this.id.split('_')[1];
                    $("#divwindow_Closeob_" + _id ).css('display','none');
                });
                



                $('#divwindow_Closeob_'+new_options.c_id ).click(
                    function()
                    {
                        var _id = this.id.split('_')[2];
                        list_kro.getByCId(_id).status = 'close';

                        $('#divwindow_' + _id).remove();
                        $.TaskbarCenterDel(_id); 
                        clearInterval(xxglInterval);
                        xxglInterval=null;
                    }
                );

 

                $('#XXGL1').click(function(){

                    if(!hasDrag)
                    {
                        $.kropop({c_id:'A5',width:780,title:'发信息',href:'../message/SendShortMessage.aspx'});
                    }else{
                        hasDrag=false;
                    }
                });
                $('#XXGL2').click(function(){
                    
                    if(!hasDrag)
                    {
                        $.kropop({c_id:'A6',width:780,title:'收件箱',href:'../message/MessageCenter.aspx'});
                    }else{
                        hasDrag=false;
                    }
                });
                $('#XXGL3').click(function(){
                    if(!hasDrag)
                    {
                        $.kropop({c_id:'A7',width:780,title:'发件箱',href:'../message/SendMessage.aspx'});
                    }else{
                        hasDrag=false;
                    }
                });

                 
                list_kro.push({ 'c_id': new_options.c_id, 'status': 'restore', 'title': new_options.title ,'draggable':new_options.draggable})
                $.TaskbarCenterAdd(new_options.c_id);
             
            
                $.XXGLrun();
                xxglInterval=setInterval(function () { $.XXGLrun() }, '10000');
            }); 

        });


    }
    
    $.XXGLrun=function()//信息管理刷
    {
        $.get("desktop.ashx", { "do": "XXGL","s":new Date().getTime() },
              function(data){   
              
                if(data.substr(0,3)=="loo")
                {
                    location = '../logout.aspx'; 
                    return;
                }          
                var objs=eval("("+data+")");

                
                $('#XXGL2_count').html(objs.s);
                $('#XXGL2_count_NR').html(objs.nr);
                $('#XXGL3_count').html(objs.f);
                 

              });
    }






    //时间html
    $.getClockHTMl=function(options)
    {
        var id = options.c_id;
        var defaultW = parseInt(options.width);
        var defaultH = parseInt(options.height);


        var defaultW_box=defaultW;
        var defaultH_box=defaultH;

        var defaultW_ifr=defaultW;
        var defaultH_ifr=defaultH-20; 
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
         

        if(options.border_visable==true)
        {
            defaultW_ifr = defaultW_box - 2;
            defaultH_ifr = defaultH_box - 2;
        } 

        defaultW += "px";
        defaultH += "px";


        defaultW_box += "px";
        defaultH_box += "px";

        defaultW_ifr += "px";
        defaultH_ifr += "px";
           
             
        var html = "<div id='divwindow_" + id + "' class='divwindow' style='  top:" + top + ";left:" + left + ";width:" + defaultW + ";height:" + defaultH + "; ' >" +

                        "<div id='divwindow_box_" + id + "' class='divwindow_box' style='margin: 0px; width:" + defaultW_box + ";height:" + defaultH_box + "; ' >";
        
        html+="<div  style='height:21px;position: relative; display:block;' >"+
              
              "<div id='divwindow_Closeob_" + id + "' class='divwindow_Closeob'  > </div>"+
                
                "<div class='both'></div>"+
                "</div>";
            
        html+="<div id='divwindow_content_" + id + "' class='divwindow_content'  style='height:"+defaultH_ifr+"'  >";

 

        html+="<div id='divwindow_body_" + id + "' class='divwindow_body' style=\"background:url('images/clockbg.png') no-repeat;width:" + defaultW_ifr + ";height:" + defaultH_ifr + ";top:0px; \" >" +
         

         
                    "</div>" +
                    
                    "<div id='eclock' style='height:20px;width:100%;text-align:center;position: relative;z-index: 1000;top:"+defaultH_ifr+";display:block; font-size:15px;font-weight: bold; '></div>"+
                "</div>";

 

        html+="</div></div>";
        return html;

    }

    //初始化时间
    $.InitNowTime=function()
    {
//         
//        $.get("desktop.ashx", { "do": "GNT","s":new Date().getTime() },
//              function(data){   
//              
//                if(data.substr(0,3)=="loo")
//                {
//                    location = '../logout.aspx'; 
//                    return;
//                }          
//                var objs=eval("("+data+")"); 
//                
//                NowTime=new Date();
//                
//                NowTime.setHours(objs.hh);
//                NowTime.setMinutes(objs.mm);
//                NowTime.setSeconds(objs.ss);

//                
//                $.Clockrun();
//                clockInterval =setInterval(function () { $.Clockrun() }, '1000');
//                 
//              });
                NowTime=new Date(); 
                
                $.Clockrun();
                clockInterval =setInterval(function () { $.Clockrun() }, '1000');


    }

    $.Clocktrans=function(ctx,x,y,angle ){   
         ctx.transform(Math.cos(angle), Math.sin(angle),  
            -Math.sin(angle), Math.cos(angle),  
            x*(1-Math.cos(angle)) + x*Math.sin(angle),  
              y*(1-Math.cos(angle)) - y*Math.sin(angle))  

              
    } 

    $.Clockpointer=function(ctx,x,y,z,cx,cy){ 
         ctx.beginPath(); 
          
         ctx.moveTo(x,y);  

         ctx.lineTo(x,z); 
         ctx.stroke(); 
         ctx.fill(); 
    }   

    //时间刷
    $.Clockrun = function () {


        if(NowTime==null)
        {
            return;
        }

        var ho = NowTime.getHours();
        var mn = NowTime.getMinutes();
        var sc = NowTime.getSeconds();
        
        if($.Clock_IsCanvas==true){ 
            var h=ho>12?(ho-12)*5+parseInt(mn/12):ho*5+parseInt(mn/12); //时针 初始位置
        
            var c=document.getElementById("clock_canvas"); 
            var ctx=c.getContext("2d"); //获取绘图对象 
            ctx.clearRect(0,0,c.width,c.height); //清除上次绘制的图形  
   
            ctx.save(); //保存当前绘图状态 
            var x=75
            var y=75
            var sAngle=(Math.PI*2)/60*sc; //秒度 
            
            //秒针转动 
            ctx.save(); 
            ctx.lineWidth=3; 
            ctx.strokeStyle="#B90303"; 
            $.Clocktrans(ctx,x,y,sAngle);   
            $.Clockpointer(ctx,x,y,y-50,x+10,y+10); 
            ctx.restore(); 

            
            //分针转动 
            ctx.save();  
            ctx.lineWidth=6; 
            $.Clocktrans(ctx,x,y,(Math.PI*2)/60*mn);  
            $.Clockpointer(ctx,x,y,y-45); 
            ctx.restore(); 
  
 
            //时针转动 
            ctx.save();   
            ctx.lineWidth=8;    
            $.Clocktrans(ctx,x,y,(Math.PI*2)/60*h);  
            $.Clockpointer(ctx,x,y,y-40); 
            ctx.restore(); 
     
      

        }else{
            document.getElementById('sl').Rotation = sc * 6;
            document.getElementById('ml').Rotation = mn * 6 + sc / 10;
            document.getElementById('hl').Rotation = ho * 30 + mn / 2;
         }
          





        document.getElementById('eclock').innerHTML=ho.PadLeft(2,'0')+":"+mn.PadLeft(2,'0')+":"+sc.PadLeft(2,'0');
         
        NowTime.setTime(NowTime.getTime()+1000);
    }


    $.Clock_IsCanvas=false

    //时间
    $.fn.Clock = function (options) {

        var defaults = {
            width: 150,
            height: 170,
            top: '',
            left: '', 
            title: '时钟',
            c_id: '',
            bglock: false,
            border_visable:false,
            resizable:false,
            draggable:true,
            title_visable:false,
            max_visable:false,
            background:false 

        } 

        this.each(function () {
        
            
            var theObject = $(this);
            var new_options = $.extend(defaults, options);
        

            theObject.click(function () {
            
            
                if(list_kro.getByCId(options.c_id)!=null)
                {
                    $.windowfocus(options.c_id);
                    return;
                } 
                
                var html = $.getClockHTMl(new_options);
                
                var e = $(html);
                e.appendTo(document.body);
                 

                try {
                    document.createElement('canvas').getContext('2d');
                    $.Clock_IsCanvas=true;
                } catch (e) {
    
                }
                if($.Clock_IsCanvas==true){
                    document.getElementById('divwindow_body_'+options.c_id).innerHTML="<canvas id='clock_canvas' width='150' height='150'></canvas>"  


                }else{

                document.getElementById('divwindow_body_'+options.c_id).innerHTML="<v:group id='clk' style='width: 150px; height: 150px ;filter: alpha(opacity=90);  position:absolute; top :0px; left:0px;' coordorig='0,0' coordsize='150,150'>"+
                        "<v:group id='sl' style='z-index: 33;top: 0px; left: 0px; width: 150px;  height: 150px' coordsize='150,150'>"+
                            "<v:line from='75,85' to='75,20' strokecolor='#B90303'  strokeweight='3pt'> "+
                            "</v:line>"+
                        "</v:group>"+
                        "<v:group id='ml' style='z-index: 30; top: 0px;left: 0px; width: 150px;  height: 150px' coordsize='150,150'>"+
                            "<v:line from='75,75' to='75,30' strokeweight='5pt'>"+
                                "<v:stroke startarrow='oval'>"+
                                "</v:stroke>"+
                            "</v:line>"+
                        "</v:group>"+
                        "<v:group id='hl' style='z-index: 30; top: 0px; left: 0px; width: 150px; height: 150px' coordsize='150,150'>"+
                            "<v:line from='75,75' to='75,35' strokeweight='7pt'>"+
                            "</v:line>"+
                        "</v:group>"+
                        "<v:oval style=' z-index:40;left:72px;top:72px;width:6px;height:6px' strokecolor='#003366'/>"+
                        "</v:oval>"+
                    "</v:group> ";

                    }
         
                $.divfocus(new_options.c_id);
                 
                
                $("#divwindow_" + new_options.c_id ).mousedown(function (event) { 
                    var _id = this.id.split('_')[1];
                    $.windowfocus(_id);
                    md(event, _id);
                });
                
                $("#divwindow_" + new_options.c_id ).mouseover(function (event) { 
                    var _id = this.id.split('_')[1];
                    $("#divwindow_Closeob_" + _id ).css('display','block');
                });
                $("#divwindow_" + new_options.c_id ).mouseout(function (event) { 
                    var _id = this.id.split('_')[1];
                    $("#divwindow_Closeob_" + _id ).css('display','none');
                });
                



                $('#divwindow_Closeob_'+new_options.c_id ).click(
                    function()
                    {
                        var c_id = this.id.split('_')[2];
                        list_kro.getByCId(c_id).status = 'close';

                        $('#divwindow_' + c_id).remove();
                        $.TaskbarCenterDel(c_id);
                        clearInterval(clockInterval);
                        clockInterval=null;
                    }
                );

                 
                list_kro.push({ 'c_id': new_options.c_id, 'status': 'restore', 'title': new_options.title ,'draggable':new_options.draggable})
                $.TaskbarCenterAdd(new_options.c_id);
            
            
                $.InitNowTime();
            
            });

         

        });


    }

    //办公助手html
    $.getBGZSHTMl=function(options)
    {    
       
        var id = options.c_id;
        var defaultW = parseInt(options.width);
        var defaultH = parseInt(options.height);


        var defaultW_box=defaultW;
        var defaultH_box=defaultH;

        var defaultW_ifr=defaultW;
        var defaultH_ifr=defaultH-21;

 

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
        


        if(options.border_visable==true)
        {
            defaultW_ifr = defaultW_box - 2;
            defaultH_ifr = defaultH_box - 2;
        }
 



        defaultW += "px";
        defaultH += "px";


        defaultW_box += "px";
        defaultH_box += "px";

        defaultW_ifr += "px";
        defaultH_ifr += "px";

        




        var html = "<div id='divwindow_" + id + "' class='divwindow' style='  top:" + top + ";left:" + left + ";width:" + defaultW + ";height:" + defaultH + "; ' >" +

                        "<div id='divwindow_box_" + id + "' class='divwindow_box' style='margin: 0px; width:" + defaultW_box + ";height:" + defaultH_box + "; ' >";
 
        html+="<div  style='height:21px;position: relative; display:block;' >"+
              
              "<div id='divwindow_Closeob_" + id + "' class='divwindow_Closeob'  > </div>"+
                
                "<div class='both'></div>"+
                "</div>";
            

        html+="<div id='divwindow_content_" + id + "' class='divwindow_content'  style='height:"+defaultH_ifr+"' >";


        html+="<div id='divwindow_body_" + id + "' class='divwindow_body' style='width:" + defaultW_ifr + ";height:" + defaultH_ifr + ";top:0px;' >" +
         
                        "<div style=' width:100%;height:100%;background: url(images/BGZSBJ.png) no-repeat;margin:0px;top:0px;' >"+ 
                            "<div id='bgzs1'  class='divlink' style='width:60px;height:20px;background: url(images/BGZS.png) 50% 50% no-repeat;margin:0px;top:93px; left:5px;padding:10px;' >"+ 
                            "</div>"+
                        "</div>"+
                    "</div>" +

                "</div>";

 

        html+="</div></div>";
        return html;

    }


    //办公助手
    $.fn.BGZS = function (options) {

  
        var defaults = {
            width: 110,
            height: 175,
            top: '',
            left: '', 
            title: '办公助手',
            c_id: '',
            bglock: false,
            border_visable:false,
            resizable:false,
            draggable:true,
            title_visable:false,
            max_visable:false,
            background:false 

        } 

        this.each(function () {
        
            
            var theObject = $(this);
            var new_options = $.extend(defaults, options);
        

            theObject.click(function () {
            
            
                if(list_kro.getByCId(options.c_id)!=null)
                {
                    $.windowfocus(options.c_id);
                    return;
                } 
                
                var html = $.getBGZSHTMl(new_options);
                
                var e = $(html);
                e.appendTo(document.body);
                 
         
                $.divfocus(new_options.c_id);
                 
                                  
                
                $("#divwindow_" + new_options.c_id ).mousedown(function (event) { 
                    var _id = this.id.split('_')[1];
                    $.windowfocus(_id);
                    md(event, _id);
                });
                
                $("#divwindow_" + new_options.c_id ).mouseover(function (event) { 
                    var _id = this.id.split('_')[1];
                    $("#divwindow_Closeob_" + _id ).css('display','block');
                });
                $("#divwindow_" + new_options.c_id ).mouseout(function (event) { 
                    var _id = this.id.split('_')[1];
                    $("#divwindow_Closeob_" + _id ).css('display','none');
                });
                






                $('#divwindow_Closeob_'+new_options.c_id ).click(
                    function()
                    {
                        var _id = this.id.split('_')[2];
                        list_kro.getByCId(_id).status = 'close';

                        $('#divwindow_' + _id).remove();
                        $.TaskbarCenterDel(_id);  
                    }
                );

 


                $('#bgzs1').click(
                    function(){
                        $.ShowNavigation();
                    
                        $('#menu_fancymenu_3').click(); 
                    }
                );
  

                 
                list_kro.push({ 'c_id': new_options.c_id, 'status': 'restore', 'title': new_options.title ,'draggable':new_options.draggable})
                $.TaskbarCenterAdd(new_options.c_id);
             
              
            }); 

        });



    }


    //日期html
    $.getCalendarHTMl=function(options)
    {
        var id = options.c_id;
        var defaultW = parseInt(options.width);
        var defaultH = parseInt(options.height);


        var defaultW_box=defaultW;
        var defaultH_box=defaultH;

        var defaultW_ifr=defaultW;
        var defaultH_ifr=defaultH-21;

 

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
        


        if(options.border_visable==true)
        {
            defaultW_ifr = defaultW_box - 2;
            defaultH_ifr = defaultH_box - 2;
        }
 



        defaultW += "px";
        defaultH += "px";


        defaultW_box += "px";
        defaultH_box += "px";

        defaultW_ifr += "px";
        defaultH_ifr += "px";

        




        var html = "<div id='divwindow_" + id + "' class='divwindow' style='  top:" + top + ";left:" + left + ";width:" + defaultW + ";height:" + defaultH + "; ' >" +

                        "<div id='divwindow_box_" + id + "' class='divwindow_box' style='margin: 0px; width:" + defaultW_box + ";height:" + defaultH_box + "; ' >";
 
        html+="<div  style='height:21px;position: relative; display:block;' >"+
              
              "<div id='divwindow_Closeob_" + id + "' class='divwindow_Closeob'  > </div>"+
                
                "<div class='both'></div>"+
                "</div>";
            

        html+="<div id='divwindow_content_" + id + "' class='divwindow_content'  style='height:"+defaultH_ifr+"' >";


        html+="<div id='divwindow_body_" + id + "' class='divwindow_body' style='width:" + defaultW_ifr + ";height:" + defaultH_ifr + ";top:0px;' >" +
         
                        "<div style=' width:100%;height:100%;background: url(images/Calendar.png) no-repeat;margin:0px;top:0px;' >"+ 
                        "<div id='Calendar1' style='top:35px;left:60px;z-index:1000;position:absolute;font-size:20px;font-familyTrebuchet MS;font-weight:bold;color:#858585'>"+
                        "</div>"                            
                        "</div>"+
                    "</div>" +

                "</div>";

 

        html+="</div></div>";
        return html;
    }


    
    //日期
    $.fn.Calendar = function (options) {
  
        var defaults = {
            width: 190,
            height: 160,
            top: '',
            left: '', 
            title: '日期',
            c_id: '',
            bglock: false,
            border_visable:false,
            resizable:false,
            draggable:true,
            title_visable:false,
            max_visable:false,
            background:false 

        } 

        this.each(function () {
        
            
            var theObject = $(this);
            var new_options = $.extend(defaults, options);
        

            theObject.click(function () {
            
            
                if(list_kro.getByCId(options.c_id)!=null)
                {
                    $.windowfocus(options.c_id);
                    return;
                } 
                
                var html = $.getCalendarHTMl(new_options);
                
                var e = $(html);
                e.appendTo(document.body);
                 
         
                $.divfocus(new_options.c_id);
                 
                                  
                
                $("#divwindow_" + new_options.c_id ).mousedown(function (event) { 
                    var _id = this.id.split('_')[1];
                    $.windowfocus(_id);
                    md(event, _id);
                });
                
                $("#divwindow_" + new_options.c_id ).mouseover(function (event) { 
                    var _id = this.id.split('_')[1];
                    $("#divwindow_Closeob_" + _id ).css('display','block');
                });
                $("#divwindow_" + new_options.c_id ).mouseout(function (event) { 
                    var _id = this.id.split('_')[1];
                    $("#divwindow_Closeob_" + _id ).css('display','none');
                });
                






                $('#divwindow_Closeob_'+new_options.c_id ).click(
                    function()
                    {
                        var _id = this.id.split('_')[2];
                        list_kro.getByCId(_id).status = 'close';

                        $('#divwindow_' + _id).remove();
                        $.TaskbarCenterDel(_id);  
                    }
                );

 
                 
                list_kro.push({ 'c_id': new_options.c_id, 'status': 'restore', 'title': new_options.title ,'draggable':new_options.draggable})
                $.TaskbarCenterAdd(new_options.c_id);
             
                $.Calendarrun();
              
            }); 

        });



    }



    $.Calendarrun=function()//信息管理刷
    {
//        $.get("desktop.ashx", { "do": "CALE","s":new Date().getTime() },
//              function(data){   
//              
//                if(data.substr(0,3)=="loo")
//                {
//                    location = '../logout.aspx'; 
//                    return;
//                }          
//                var objs=eval("("+data+")");
//                 
//                $('#Calendar1').html("<div>"+objs.YY+"年"+objs.MM+"月</div><div style='padding-left:30px;' ><span style='font-size:28px;' >"+objs.DD+"</span>日</div>");
//                 

//              });


              
                var  data = "{YY:'" + new Date().getFullYear()+ "',MM:'" + new Date().getMonth() + "',DD:'" + new Date().getDate()+ "'  }";
                var objs=eval("("+data+")");
                 
                $('#Calendar1').html("<div>"+objs.YY+"年"+objs.MM+"月</div><div style='padding-left:30px;' ><span style='font-size:28px;' >"+objs.DD+"</span>日</div>");
                 
    }


})(jQuery);	


