


$(document).ready(function () {





    if ($.browser.msie) {
        if ($.browser.version == '6.0') {
            $.kro.alert({ title: '信息', text: "您正在使用 Internet Explorer 6 低版本的IE浏览器。<br/>为更好的浏览本页，建议您将浏览器升级到 <a href='../download/IE8-WindowsXP-x86-CHS.exe' target='_blank'>IE8(WinXP系统)</a> / <a href='IE8-WindowsServer2003-x86-CHS.exe' target='_blank'>IE8(Win2003系统)</a>", okhandle: function () { location.href = 'http://www.microsoft.com/china/windows/internet-explorer/ie8howto.aspx'; } });
            return;

        }
    }

    $.InitTitle();


    $.setscroll(true);


    $.InitNavigation();
    $.InitMenubutton();

    $('#fancymenu LI').each(function (i) {
        var id = this.id.split('_')[2];
        var e = $(this);
        e.click(function () { $.slide(id); });

    }
    );





    $.InitTaskbar();




    var ievent = setInterval(
        function () {
            //document.getElementById('evtex').value += '|' + list_btn.length;
            if (list_btn.length != 0) {

                $('#' + list_btn.getByTitle('百度').html_id).click()
                $('#' + list_btn.getByTitle('公文管理').html_id).click()
                $('#' + list_btn.getByTitle('信息管理').html_id).click()
                $('#' + list_btn.getByTitle('时钟').html_id).click() 
                $('#' + list_btn.getByTitle('督查通知 ').html_id).click()
                $('#' + list_btn.getByTitle('办公助手').html_id).click()
                $('#' + list_btn.getByTitle('日期').html_id).click()
                clearInterval(ievent);
                ievent = null;
            }
        }
    , '100');
    /*
    setTimeout(
    function () {
    alert(list_btn.length);
    if (list_btn.length != 0) {
    $('#' + list_btn.getByTitle('公告通知').html_id).click()
    $('#' + list_btn.getByTitle('公文管理').html_id).click()
    $('#' + list_btn.getByTitle('信息管理').html_id).click()
    $('#' + list_btn.getByTitle('时钟').html_id).click()
    $('#' + list_btn.getByTitle('账号信息').html_id).click()
    $('#' + list_btn.getByTitle('督查通知 ').html_id).click()
    $('#' + list_btn.getByTitle('办公助手').html_id).click()
    $('#' + list_btn.getByTitle('日期').html_id).click()

    }

    }, '600'
    );
    */


    $.ShowNavigation();








});

 