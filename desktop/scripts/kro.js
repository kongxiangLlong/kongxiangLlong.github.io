
(function ($) {


    $.kro = function () {
    }

    $.kro.returnfalse = function () { return false; }



    //拖动
    $.kro.TheDragObject = null;

    $.kro.md = function (e) {
        var _id = this.id.split('_')[2];

        $('*').css('-moz-user-select', 'none');

        var eve = e || window.event;

        var dd = new DivDrag(_id);
        $.kro.TheDragObject = dd;
        $.kro.TheDragObject.flagX = eve.pageX;
        $.kro.TheDragObject.flagY = eve.pageY;
        $.kro.TheDragObject.flagLeft = parseInt($("#divwindow_" + _id).css('left'));
        $.kro.TheDragObject.flagTop = parseInt($("#divwindow_" + _id).css('top'));

        $(document).mousemove($.kro.mm);
        $(document).mouseup($.kro.mu);

        $('#divwindow_border_' + $.kro.TheDragObject.ID).css('z-index', '1002');
        $(document).bind('selectstart', $.kro.returnfalse);


    }
    $.kro.mm = function (e) {

        hasDrag = true;
        var xx = e.pageX;
        var yy = e.pageY;

        var xflag = true;
        var yflag = true;


        if (parseInt($("#divwindow_" + $.kro.TheDragObject.ID).css('top')) <= 5 && ((yy + $.kro.TheDragObject.flagTop - $.kro.TheDragObject.flagY) <= 5)) {
            yflag = false;
        }




        if (parseInt($("#divwindow_" + $.kro.TheDragObject.ID).css('top')) >= ($(window).height() - $('#divwindow_' + $.kro.TheDragObject.ID).height() - 10) && ((yy + $.kro.TheDragObject.flagTop - $.kro.TheDragObject.flagY) >= ($(window).height() - $('#divwindow_' + $.kro.TheDragObject.ID).height() - 10))) {
            yflag = false;
        }



        if (parseInt($("#divwindow_" + $.kro.TheDragObject.ID).css('left')) <= 5 && ((xx + $.kro.TheDragObject.flagLeft - $.kro.TheDragObject.flagX) <= 5)) {
            xflag = false;
        }


        if (parseInt($("#divwindow_" + $.kro.TheDragObject.ID).css('left')) >= ($(window).width() - $('#divwindow_' + $.kro.TheDragObject.ID).width() - 10) && ((xx + $.kro.TheDragObject.flagLeft - $.kro.TheDragObject.flagX) >= ($(window).width() - $('#divwindow_' + $.kro.TheDragObject.ID).width() - 10))) {
            xflag = false;
        }




        var xm = xx - $.kro.TheDragObject.flagX;
        var ym = yy - $.kro.TheDragObject.flagY;

        if (xflag) {
            $("#divwindow_" + $.kro.TheDragObject.ID).css('left', $.kro.TheDragObject.flagLeft + xm);
        }
        if (yflag) {
            $("#divwindow_" + $.kro.TheDragObject.ID).css('top', $.kro.TheDragObject.flagTop + ym);
        }

    }

    $.kro.mu = function (e) {

        $('#divwindow_border_' + $.kro.TheDragObject.ID).css('z-index', '999');
        $(document).unbind('mousemove', $.kro.mm);
        $(document).unbind('mouseup', $.kro.mu);




        if ($.kro.TheDragObject.flagX == e.pageX && $.kro.TheDragObject.flagY == e.pageY) {
            hasDrag = false;
        }

        $.kro.TheDragObject = null;
        $('*').css('-moz-user-select', '-moz-all');

        $(document).unbind('selectstart', $.kro.returnfalse); //恢复拖拉选文本



    }


    function DivDrag(id) {
        this.flagX;
        this.flagY;
        this.flagTop;
        this.flagLeft;
        this.ID = id;
    }

    $.kro.divdrag = function () {


        var o = 'divwindow_titlebar_alert';
        $("#" + o).live('mousedown', $.kro.md);

    }







    //
    $.kro.alert = function (options) {



        var new_options = $.extend($.kro.defaults, options);
        $.cdbg(true);

        var html = $.kro.HTML(new_options);

        var e = $(html);
        e.appendTo(document.body);


        $.kro.divdrag()


        $('#divwindow_titlebuttons_close_alert').mouseover(function () { $(this).css('backgroundPosition', '-123px -53px') });
        $('#divwindow_titlebuttons_close_alert').mouseout(function () { $(this).css('backgroundPosition', '-123px -24px') });



        $('#divwindow_titlebuttons_close_alert').click(function () {
            $('#divwindow_alert').remove();
            $.cdbg_close();
        });
        $('#kro_btnOK_').click(function () {
            $('#divwindow_alert').remove();
            $.cdbg_close();
            new_options.okhandle();
        });




        

        $('#kro_btnOK_').focus();
    };


    //
    $.kro.defaults = {
        title: '信息提示',
        text: '',
        top: '',
        left: '',
        width: '500px',
        height: '130px',
        okhandle: null
    };



    //生成html
    $.kro.HTML = function (options) {


        var defaultW = parseInt(options.width);
        var defaultH = parseInt(options.height);


        var defaultW_box = defaultW - 16;
        var defaultH_box = defaultH - 16;

        var defaultW_ifr = defaultW - 16;
        var defaultH_ifr = defaultH - 16;



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


        defaultH_ifr = defaultH_box - 20;


        defaultW += "px";
        defaultH += "px";


        defaultW_box += "px";
        defaultH_box += "px";

        defaultW_ifr += "px";
        defaultH_ifr += "px";






        var html = "<div id='divwindow_alert' class='divwindow' style='top:" + top + ";left:" + left + ";width:" + defaultW + ";height:" + defaultH + "; ' >" +

                        "<div id='divwindow_box_alert' class='divwindow_box' style='width:" + defaultW_box + ";height:" + defaultH_box + "; background-color:White; border: 1px solid #A1B4B0;  ' >";

        html += "<div id='divwindow_border_alert' class='divwindow_border' >" +
                        "<div id='dw_b_center_alert' class='divwindow_border_item dw_b_center_alert'></div>" +
                        "<div id='dw_b_t_alert' class='divwindow_border_item dw_b_t_alert'></div>" +
                        "<div id='dw_b_rt_alert' class='divwindow_border_item dw_b_rt_alert'></div>" +
                        "<div id='dw_b_r_alert' class='divwindow_border_item dw_b_r_alert'></div>" +
                        "<div id='dw_b_rb_alert' class='divwindow_border_item dw_b_rb_alert'></div>" +
                        "<div id='dw_b_b_alert' class='divwindow_border_item dw_b_b_alert'></div>" +
                        "<div id='dw_b_lb_alert' class='divwindow_border_item dw_b_lb_alert'></div>" +
                        "<div id='dw_b_l_alert' class='divwindow_border_item dw_b_l_alert'></div>" +
                        "<div id='dw_b_lt_alert' class='divwindow_border_item dw_b_lt_alert'></div>" +
                    "</div>";

        html += "<div id='divwindow_content_alert' class='divwindow_content' >";

        html += "<div id='divwindow_titlebar_alert' class='divwindow_titlebar_alert' >" +


                    "<div id='divwindow_title_alert' class='divwindow_title' >" +

                        options.title +

                    "</div>" +

                "</div>" +

                "<div id='divwindow_titlebuttons_alert' class='divwindow_titlebuttons' >";

        html += "<span id='divwindow_titlebuttons_close_alert' class='divwindow_titlebuttons_item divwindow_titlebuttons_close' title='关闭' style='display:inline-block; '></span>" +
                    "</div>";

        html += "<div id='divwindow_body_alert' class='divwindow_body' style='width:" + defaultW_ifr + ";height:" + defaultH_ifr + ";  top: 20px; text-align:center; ' >" +

                    "<table style='width:" + defaultW_ifr + ";height:" + defaultH_ifr + " '><tr><td>" +

                    options.text +

                    "</td></tr><tr><td style='height:30px; '>" +

                    "<input type='button' style='width:80px;font-size:12px;' id='kro_btnOK_' value='确定'></input>" +

                    "</td></tr></table>" +

                    "</div>" +

                "</div>";



        html += "</div></div>";
        return html;


    }

})(jQuery);	
