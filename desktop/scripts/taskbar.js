(function ($) {

    var lr_e = null;


    $.TaskbarToLeft = function (tothesl) {

        $.TaskbarToRORLEnd();
        lr_e = setInterval(
            function () {
                document.getElementById('evtex').value += 'left'
                var sl = document.getElementById('TaskbarCenter').scrollLeft;
                document.getElementById('TaskbarCenter').scrollLeft = document.getElementById('TaskbarCenter').scrollLeft - 10


                if (document.getElementById('TaskbarCenter').scrollLeft == sl || ((typeof tothesl == 'number') && tothesl >= document.getElementById('TaskbarCenter').scrollLeft)) {
                    $.TaskbarToRORLEnd();
                }

            }
        , 30);



    }


    $.TaskbarToRight = function (tothesl) {

        $.TaskbarToRORLEnd();
        lr_e = setInterval(
            function () {
                document.getElementById('evtex').value += 'right'

                var sl = document.getElementById('TaskbarCenter').scrollLeft;
                document.getElementById('TaskbarCenter').scrollLeft = document.getElementById('TaskbarCenter').scrollLeft + 10;

                if (document.getElementById('TaskbarCenter').scrollLeft == sl || ((typeof tothesl == 'number') && tothesl <= document.getElementById('TaskbarCenter').scrollLeft)) {
                    $.TaskbarToRORLEnd();
                }
            }
        , 30);
    }

    $.TaskbarToRORLEnd = function () {
        if (lr_e != null) {
            clearInterval(lr_e);
            lr_e = null;
        }
    }


    $.ShowTaskbarItem = function (id) {

        var index = list_kro.getIndexByCId(id) + 1;

        if (index == 0) {
            setTimeout(function () { $.ShowTaskbarItem(id), 100 })
            return;
        }



        var sleft = document.getElementById('TaskbarCenter').scrollLeft

        var centerwidth = $('#TaskbarCenter').width();

        //计算右侧
        var width = (index * 122);

        var allwidth = centerwidth + sleft;


        if (width > allwidth) {
            var tothesl = sleft + width - allwidth + 10; //10为余地 
            $.TaskbarToRight(tothesl);
        }


        //计算左侧

        var left = (index - 1) * 122;

        if (left < sleft) {
            $.TaskbarToLeft(left);
        }

    }



    $.InitTaskbar = function () {
        var html = "<div id='Taskbar'>" +
                        "<div id='TaskbarLeft' class='TaskbarBox'>" +
                            "<div id='logout'></div>" +
                            "<div class='TaskbarLine'>" +
                            "</div>" +
                        "</div>" +
                        "<div id='TaskbarCenter' class='TaskbarBox'>" +

                        "<div id='TaskbarCenterSquare' class='TaskbarBox'>" +
                        "</div>" +

                        "</div>" +
                        "<div id='TaskbarRight_btns' class='TaskbarBox'>" +
                            "<div id='TaskbarRight_btns_left' >" +
                            "</div>" +
                            "<div id='TaskbarRight_btns_right'>" +
                            "</div>" +
                        "</div>" +
                        "<div id='TaskbarRight' class='TaskbarBox'>" +
                            "<div class='TaskbarLine'>" +
                            "</div>" +
                            "<a href='###' target='_blank' >" +
                            "<div id='TaskbarRight_box' >" +
                            "</div>" +
                            "</a>" +
                        "</div>" +
                        "</div>";

        $(html).appendTo(document.body);



        $('#TaskbarCenter').width($(document).width() - 238);
        $(window).resize(function () { $('#TaskbarCenter').width($('#Taskbar').width() - 238); });


        $('#logout').click(
            function () {
                if (confirm("确定要离开？")) {
//                    location = '../logout.aspx';
                }
            }

        );




        $('#TaskbarRight_btns_left').mousedown($.TaskbarToLeft);
        $('#TaskbarRight_btns_left').mouseup($.TaskbarToRORLEnd);
        $('#TaskbarRight_btns_right').mousedown($.TaskbarToRight);
        $('#TaskbarRight_btns_right').mouseup($.TaskbarToRORLEnd);


    }


    $.TaskbarCenterAdd = function (id) {
        var title = list_kro.getByCId(id).title;


        var html = "<div id='TaskbarCenter_item_" + id + "' class='TaskbarCenter_item'>" +

                        "<div class='TaskbarCenter_item_title'>" + title + "</div>" +

                        "<div class='TaskbarCenter_item_close'></div>" +

                        "<div styel='clear:both;'></div>" +

                        "</div>";


        var e = $(html);


        e.appendTo('#TaskbarCenterSquare');

        $("#TaskbarCenter_item_" + id).click(function () {
            var _id = this.id.split('_')[2];
            var item = list_kro.getByCId(id);
            var s = item.status;

            if (s == "min") {
                $('#divwindow_' + _id).show()
                $.windowfocus(_id);
                item.status = '';
            } else {

                if ($('#divwindow_' + id).attr('class') == 'divwindowCur') {
                    $('#divwindow_' + _id).hide();
                    item.status = 'min';
                } else {
                    $.windowfocus(_id);
                }
            }

        });

        $('#TaskbarCenterSquare').width(list_kro.length * 123)
    }


    $.TaskbarCenterDel = function (id) {

        $("#TaskbarCenter_item_" + id).remove();

        list_kro.remove(list_kro.getByCId(id));

        $('#TaskbarCenterSquare').width(list_kro.length * 123)

    }
    $.TaskbarCenterCur = function (id) {


        $('.TaskbarCenter_item').css('backgroundRepeat', '');
        $('.TaskbarCenter_item').css('backgroundPosition', '50px 50px');



        $('#TaskbarCenter_item_' + id).css('backgroundRepeat', 'repeat-x');
        $('#TaskbarCenter_item_' + id).css('backgroundPosition', '0px -129px');


        $.ShowTaskbarItem(id);






    }






})(jQuery);


