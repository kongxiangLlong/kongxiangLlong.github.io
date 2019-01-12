var list_btn = new Array();

var LIId = 0;




var fm = {//菜单
    init: function () {
        fm.menu = $('#fancymenu');
        fm.current = $('li.current');
        fm.back = $("<li class='background' ><div class='left'></div></li>").appendTo($('#fancymenu ul'));

         
        if (fm.current)
            fm.setCurrent(fm.current);


        $('#fancymenu ul li').each(function (i, item) {

            $(item).mouseover(function () {
                fm.moveBg($(item));
            });
            $(item).mouseout(function () {
                fm.moveBg(fm.current);
            });
            $(item).click(function () {
                fm.setCurrent($(item));
            });

        });

    },

    setCurrent: function (el) {


        fm.back.css({
            left: el.attr('offsetLeft') + "px",
            width: el.width()
        }, {
            duration: "slow",
            queue: false,
            easing: 'easeInOutBack'
        });
        fm.current = el;
    },


    moveBg: function (to) {
        if (!fm.current)
            return;
        fm.back.animate({
            left: to.attr('offsetLeft') + "px",
            width: to.width()
        }, {
            duration: "slow",
            queue: false,
            easing: 'easeInOutBack'
        })
    }



};


(function ($) {

    
    var TheDObject = null;

    function DDrag() {
        this.flagX;
        this.flagY;
        this.flagWidth;
        this.flagHeight; 
        this.flagLeft;
        this.flagWidth_b;
        this.flagHeight_b; 
    }

   function md_(e) { 

        $(document).mousemove(mm_);
        $(document).mouseup(mu_); 
          
        TheDObject = new DDrag();
        TheDObject.flagX = e.pageX;
        TheDObject.flagY = e.pageY;
        TheDObject.flagWidth = parseInt($("#menubuttonsbar").width());
        TheDObject.flagHeight = parseInt($("#menubuttonsbar").height());
        TheDObject.flagLeft = parseInt($('#menubuttons').css('left')=="auto"?"0":$('#menubuttons').css('left'));
         
         
        TheDObject.flagWidth_b = parseInt($("#menubuttonsbar_border_b").width());
        TheDObject.flagHeight_b = parseInt($("#menubuttonsbar_border_r").height());


         
        $('*').css({'-moz-user-select': 'none','cursor':'move'});

        
        $(document).bind('selectstart', returnfalse);


    }
    function mm_(e) {
     
        var xx = e.pageX;
        var yy = e.pageY;

        var xflag = true;
        var yflag = true;

 



        var xm = TheDObject.flagX-xx;
        var ym = TheDObject.flagY-yy;

        
        var w=TheDObject.flagWidth-xm;
        var h=TheDObject.flagHeight+ym;
        
        $("#menubuttonsbar").width(w); 
        $("#menubuttonsbar").height(h); 
         
         
        $("#menubuttons").width(w*3+6);
        $(".menubuttons_box").width(w-10); 
        
        if(LIId==2){
            $('#menubuttons').css('left',TheDObject.flagLeft+xm+'px');
        }else if(LIId==3){
            $('#menubuttons').css('left',TheDObject.flagLeft+xm*2+'px');
        }
        
        $('#menubuttonsbar_border_r').height(TheDObject.flagHeight_b +ym);
        $('#menubuttonsbar_border_b').width(TheDObject.flagWidth_b-xm); 


        

          
    }

    function mu_(e) {
     
        $(document).unbind('mousemove', mm_);
        $(document).unbind('mouseup', mu_);
         
        TheDObject=null;
        
        $('*').css({'-moz-user-select':'-moz-all','cursor':''}); 

        
        $(document).unbind('selectstart', returnfalse); //恢复拖拉选文本
    }





    $.slide = function (i) {
    
        LIId = i;
        var w=$("#menubuttonsbar").width();


        $('#menubuttons').animate({


            left: -((i - 1) * w) + 'px'
        }, {
                duration: "slow",
                queue: false,
                easing: 'easeInOutBack'
            });
    }

    $.HideNavigation=function()
    {
        $('#menubuttonsbar').animate({height:'0px'},'slow','easeInOutBack',function()
            {
                $('#fancymenu').animate({left: '-410px'}, "slow","easeInOutBack",function(){$('#extendbtn').css("background", "url(images/Arrow.png) 0px 0px");}); 
            });
        $('#extendbtn').click($.ShowNavigation);
    }
    $.ShowNavigation=function()
    {
        $('#fancymenu').animate({left: '0px'}, "slow","easeInOutBack",function(){ 
                $('#menubuttonsbar').animate({height:'180px'},'slow','easeInOutBack',function(){$('#extendbtn').css("background", "url(images/Arrow.png) 26px 0px");});
            }); 
            
        $('#extendbtn').click($.HideNavigation);
     }

    $.InitNavigation = function () {

    /*
        var html = "<div id='navigationbar' class='navigationbar'>" +
                    "<div id='navigationbar_item_1' class='navigationbar_item'>" +
                        "系统相关" +
                    "</div>" +
                    "<div id='navigationbar_item_2' class='navigationbar_item'>" +
                        "系统目录" +
                    "</div>" +
                    "<div id='navigationbar_item_3' class='navigationbar_item'>" +
                        "常用工具" +
                    "</div>" +
                    "<div class='clear'>" +
                    "</div>" +
                "</div>";
                */


        var html="<DIV id=fancymenu>"+
                    "<UL class='fancymenu'>"+
                      "<LI id=menu_fancymenu_1 class=current>"+
                        "<A href='###' hidefocus=false title='系统相关' >系统相关</A>"+
                      "</LI>"+
                      "<LI id=menu_fancymenu_2 >"+
                        "<A href='###' hidefocus=false title='系统目录' >系统目录</A>"+
                      "</LI>"+
                      "<LI id=menu_fancymenu_3 >"+
                        "<A href='###' hidefocus=false title='常用工具' >常用工具</A>"+
                      "</LI>"+
                    "</UL>"+
                    "<div id='extendbtn' style='POSITION: absolute; display:block;top:-1px; right:-25px;height:41px;line-height:41px; width:26px;background:url(images/Arrow.png) 0px 0px;'></div>"+
                    "</DIV>";

        $(html).appendTo(document.body);
         


        $('#extendbtn').toggle($.ShowNavigation,$.HideNavigation);


       
        setTimeout(function(){fm.init();},"100");
    }


    $.AddOneMenubutton=function(menubutton_object)
    {     
        var ite = "<div id='menubuttons_box_item_"+ menubutton_object.c_id +"'  title='"+menubutton_object.title+"' class='menubuttons_box_item'>" +
                "<div   class='menubuttons_box_item_icon'>" +
                    "<img id='menubuttons_box_item_icon_img"+menubutton_object.c_id+"' src='images/icons/mid.png' /> "+ 
                    "</div>" +
                    "<div id='menubuttons_box_item_title_"+ menubutton_object.c_id +"' class='menubuttons_box_item_title'>" +
                        "<div>" +
                            menubutton_object.title +
                        "</div>" +
                    "</div>" +
                "</div>";
 

        $(ite).appendTo($('#'+menubutton_object.parentid));
         

        if(menubutton_object.imgsrc!=undefined&&menubutton_object.imgsrc!="")
        {
            $("#menubuttons_box_item_icon_img"+ menubutton_object.c_id).attr("src","images/icons/"+menubutton_object.imgsrc);
        }

        if(menubutton_object.eventtype==undefined)
        {
            $('#menubuttons_box_item_'+ menubutton_object.c_id).Kropop(menubutton_object);
        }else
        { 
            if(menubutton_object.eventtype=="GWGL")
            {
                $('#menubuttons_box_item_'+ menubutton_object.c_id).GWGL(menubutton_object); 
            }else if(menubutton_object.eventtype=='Clock')
            {
                $('#menubuttons_box_item_'+ menubutton_object.c_id).Clock(menubutton_object); 
            }else if(menubutton_object.eventtype=='XXGL')
            {
                $('#menubuttons_box_item_'+ menubutton_object.c_id).XXGL(menubutton_object); 
            }else if(menubutton_object.eventtype=='DCTZ')
            {
                $('#menubuttons_box_item_'+ menubutton_object.c_id).DCTZ(menubutton_object); 
            }else if(menubutton_object.eventtype=='BGZS')
            {
                $('#menubuttons_box_item_'+ menubutton_object.c_id).BGZS(menubutton_object); 
            }else if(menubutton_object.eventtype=='Calendar')
            {
                $('#menubuttons_box_item_'+ menubutton_object.c_id).Calendar(menubutton_object); 
            }

            


            
        }



        list_btn.push({'c_id':menubutton_object.c_id,'html_id':'menubuttons_box_item_'+ menubutton_object.c_id,'title':menubutton_object.title });
    }



    $.InitMenubutton = function () {

        var html = "<div id='menubuttonsbar' class='menubuttonsbar' >" +
                        "<div id='menubuttons' class='menubuttons' >" +
                            "<div id='menubuttons_box_1' class='menubuttons_box' >" +
                             
                            "</div>" +
                            "<div id='menubuttons_box_2' class='menubuttons_box' >" +
                             
                            "</div>" +
                            "<div id='menubuttons_box_3' class='menubuttons_box' >" +
                             
                            "</div>" +
                            "<div class='clear'>" +
                            "</div>" +
                        "</div>" +
                         /*
                            "<div id='menubuttonsbar_border_rt' class='menubuttonsbar_border' ></div>"+  
                            "<div id='menubuttonsbar_border_r' class='menubuttonsbar_border' ></div>"+  
                            "<div id='menubuttonsbar_border_rb' class='menubuttonsbar_border' ></div>"+
                            "<div id='menubuttonsbar_border_b' class='menubuttonsbar_border' ></div>"+
                            "<div id='menubuttonsbar_border_bl' class='menubuttonsbar_border' ></div>"+ 
                        */
                    "</div>";


        $(html).appendTo(document.body);



        $('#menubuttonsbar').mousedown(md_);





//        $.get("desktop.ashx", { "do": "GB","s":new Date().getTime() },
//          function(data){  
//          
//            if(data.substr(0,3)=="loo")
//            {
//                location = '../logout.aspx'; 
//                return;
//            }          
//            var strobjs='('+data+')';

//            var objs=eval(strobjs);

//                    
//            for(var i=0;i<objs.length;i++)
//            { 

//                if(objs[i].href.indexOf('desktop/index.aspx')!=-1)
//                {
//                    continue;
//                }
//                var menubutton_object= { 
//                    c_id:list_btn.length+1,
//                    parentid:'menubuttons_box_2',
//                    href:objs[i].href.replace('../../','../'),
//                    target:objs[i].target,
//                    title:objs[i].title
//                };
//                $.AddOneMenubutton(menubutton_object);
//            }


            
            var clearhtml="<div class='clear'></div>";
            $(clearhtml).appendTo($('#menubuttons_box_1'));

             
            
            $.AddOneMenubutton({ 
                c_id:list_btn.length+1,
                parentid:'menubuttons_box_1',
                href:'http://www.baidu.com',
                target:'',
                height:255,
                width:355,
                top:'100px',
                left:'730px',
                title:'百度'
            }); 


            $.AddOneMenubutton({ 
                c_id:list_btn.length+1,
                parentid:'menubuttons_box_1',
                href:'http://www.163.com/',
                target:'',
                title:'163'
            });
             

            $.AddOneMenubutton({ 
                c_id:list_btn.length+1,
                parentid:'menubuttons_box_3',
                href:'../tools/jsq/jsq.htm',
                target:'',
                title:'计算器',
                height:242,
                width:411,
                resizable:false
            });

             
             
            $.AddOneMenubutton({ 
                c_id:list_btn.length+1,
                height:547,
                width:562,
                parentid:'menubuttons_box_3',
                href:'../tools/wscs/HTMLPage.htm',
                target:'',
                title:'网速测试'
            }); 

            $.AddOneMenubutton({ 
                c_id:list_btn.length+1,
                parentid:'menubuttons_box_3',
                href:'http://pixlr.com/editor/',
                target:'',
                title:'网页PS'
            }); 
            
//             
//            $.AddOneMenubutton({ 
//                c_id:list_btn.length+1,
//                parentid:'menubuttons_box_1',
//                href:'../desktop/sysrelated/userabout.aspx',
//                target:'',
//                height:210,
//                width:360,
//                top:'415px',
//                left:'475px',
//                title:'账号信息'
//            });

             

              
            $.AddOneMenubutton({ 
                c_id:list_btn.length+1,
                parentid:'menubuttons_box_3', 
                top:'210px',
                left:'360px',
                target:'',
                title:'公文管理', 
                background:false,
                border_visable:false,
                title_visable:false,
                max_visable:false,
                eventtype:'GWGL'
            });
            
              
            $.AddOneMenubutton({ 
                c_id:list_btn.length+1, 
                parentid:'menubuttons_box_3', 
                imgsrc:'clock.png',
                top:'5px',
                left:'10px',
                target:'',
                title:'时钟',
                eventtype:'Clock'
            });



            $.AddOneMenubutton({
                c_id: list_btn.length + 1,
                parentid: 'menubuttons_box_3',
                target: '',
                top: '210px',
                left: '480px',
                title: '信息管理',
                background: false,
                border_visable: false,
                title_visable: false,
                max_visable: false,
                eventtype: 'XXGL'
            });


            $.AddOneMenubutton({
                c_id: list_btn.length + 1,
                parentid: 'menubuttons_box_3',
                target: '',
                top: '210px',
                left: '600px',
                title: '督查通知 ',
                background: false,
                border_visable: false,
                title_visable: false,
                max_visable: false,
                eventtype: 'DCTZ'
            });
            
             
            $.AddOneMenubutton({ 
                c_id:list_btn.length+1, 
                parentid:'menubuttons_box_3', 
                target:'',
                top:'200px',
                left:'250px',
                title:'办公助手', 
                background:false,
                border_visable:false,
                title_visable:false,
                max_visable:false,
                eventtype:'BGZS'
            });   
                      
            $.AddOneMenubutton({ 
                c_id:list_btn.length+1, 
                parentid:'menubuttons_box_3', 
                target:'',
                top:'220px',
                left:'30px',
                title:'日期', 
                background:false,
                border_visable:false,
                title_visable:false,
                max_visable:false,
                eventtype:'Calendar'
            });
            
             
            
            


            $('.menubuttons_box_item').mouseover(
                function () {
                    $(this).css('backgroundImage', 'url(images/buttonbg.png)');
                }
            );
            $('.menubuttons_box_item').mouseout(
                function () {
                    $(this).css('backgroundImage', '');
                }
            );



            
            $('#menubuttonsbar').mouseover(
                function()
                { 
                    $('#menubuttonsbar').css({'border-top':'1px solid black','border-right':'1px solid black'});
                    $('.menubuttonsbar_border').css("display","block");
                }
            );
            $('#menubuttonsbar').mouseout(
                function()
                { 
                    $('#menubuttonsbar').css('border','none');
                    $('.menubuttonsbar_border').css("display","none");
                }
            );



//            
//        });

    
    }

})(jQuery);





 