var logger=console.log;
var loadedCount = 0;

var options = {
    nodeSize: {
        width: 130,
        height: 70
    },
    line: {
        vacancy: 60
    },
    a: {
        radius: 5,
        radius0: 1,
        radius1: 5
    },
    arrow: {
        width: 10,
        x: 1.25
    }
}


var the_P = {
    "account": "18553207660",
    "password": "ql",
    "flowFlag":"",
    "sysFlag":""
};

var selectObj = null;
var  utility={
    isNumber:function(o){
        return  Object.prototype.toString.call(o)=="[object Number]";
    },
    isString:function(o){
        return  Object.prototype.toString.call(o)=="[object String]";
    },
    isBoolean:function(o){
        return  Object.prototype.toString.call(o)=="[object Boolean]";
    },
    isObj:function(o){
        return  Object.prototype.toString.call(o)=="[object Object]";
    },
    isArray:function(o){
        return  Object.prototype.toString.call(o)=="[object Array]";
    },
    isNULL:function(o){
        return  Object.prototype.toString.call(o)=="[object Null]";
    },
    isWhat:function(o){
        return Object.prototype.toString.call(o);
    }
}

// var _ = [0, 0];
//编辑区域拖动 工作台workbench
// Vue.directive('node-drag',//自定义指令JS
//     {
//         bind: function (el, binding) {
//
//             var oDiv = el;   //当前元素
//             var self = this;  //上下文
//
//             oDiv.onmousedown = function (e) {
//
//                 var ra = cloth.getRatio();
//                 //鼠标按下，计算当前元素距离可视区的距离
//                 var cx = e.clientX;
//                 var cy = e.clientY;
//
//
//                 document.onmousemove = function (e) {
//                     //通过事件委托，计算移动的距离
//                     var l = e.clientX - cx;
//                     var t = e.clientY - cy;
//                     oDiv.style.left = parseFloat(oDiv.style.left) + l / ra + 'px';
//                     oDiv.style.top = parseFloat(oDiv.style.top) + t / ra + 'px';
//                     cx = e.clientX;
//                     cy = e.clientY;
//
//                     //移动当前元素
//                     // oDiv.style.left = l  + 'px';
//                     // oDiv.style.top = t  + 'px';
//                     //将此时的位置传出去
//                     // binding.value({x: e.pageX, y: e.pageY})
//                     e.stopPropagation();
//                 };
//                 document.onmouseup = function (e) {
//
//                     document.onmousemove = null;
//                     document.onmouseup = null;
//                     e.stopPropagation();
//                 };
//                 e.stopPropagation();
//             };
//         }
//     }
// );


Vue.component('flow-input', {
    props: {
        value: {
            default: null
        },
        readonly:{
            default:false
        }
    },
    data(){
        return {
            isLocked: false
        }
    },
    template: '#flow-input-template',
    watch: {
        'value'(){
            if (!this.isLocked ) {
                this.setValue();
            }
        }
    },
    methods: {
        setValue(){
            // this.innerText=this.value;
        },
        keyDown(ev){
            console.log(ev.keyCode);
            if(ev.keyCode==13){
                ev.preventDefault();
            }
            return false;
        }
    },
    mounted:function(){
        // this.setValue();
    }
});


Vue.component('flow-jsoneditor', {
    props: {
        value: {
            default: null
        },
        readonly:{
            default:false
        },
        default:{
        }
    },
    data(){
        return {
            editor:null
        }
    },
    template: '#flow-jsoneditor-template' ,
    watch: {
        'value'(){
            if(!document.hasFocus()){
                this.setValue();
            }else if(this.editor.hasOwnProperty('aceEditor')){
                if(!this.editor.aceEditor.$isFocused){
                    this.setValue();
                }
            }else{
                var allEditDiv=this.$el.querySelectorAll("[contenteditable='true']");
                for(var i=0;i<allEditDiv.length;i++){
                    if(allEditDiv[i]==document.activeElement){
                        return ;
                    }
                }
                this.setValue();
            }

        }
    },
    methods: {
        setValue(){
            var o=this.value;
            if(this.value!=null&&!utility.isObj(this.value)&&!utility.isArray(this.value)){
                o=JSON.parse(this.value);
            }
            if(o==null){
                o=JSON.parse(this.default);
            }
            this.editor.set(o);
        },
        change(newValue){
            this.$emit('input', JSON.stringify(newValue));
        }
    },
    mounted:function(){
        var that=this;

        var container=that.$el;

        var options=null;

        if(this.readonly==false){
            options = {
                mode:"tree",
                modes: ['code', 'tree'],
                onChange:function(){
                    if (that.editor) {
                        that.change(that.editor.get());
                    }
                },
                search:false
            };
        }else{
            options = {
                onEditable: function (node) {
                    return false;
                },
                search:false
            }
        }
        that.editor = new JSONEditor(container, options);
        that.setValue();
    }
});


//过滤器
Vue.filter('objToString', function(value) {

    return JSON.stringify(value);
})

//编辑区域拖动 工作台workbench
Vue.directive('workbench-drag',//自定义指令JS
    {
        bind: function (el, binding) {

            var oDiv = el.childNodes[0];   //当前元素

            el.onmousedown = function (e) {



                //鼠标按下，计算当前元素距离可视区的距离
                var disX = e.clientX - oDiv.offsetLeft;
                var disY = e.clientY - oDiv.offsetTop;

                document.onmousemove = function (e) {
                    //通过事件委托，计算移动的距离
                    var l = e.clientX - disX;
                    var t = e.clientY - disY;
                    //移动当前元素
                    oDiv.style.left = l + 'px';
                    oDiv.style.top = t + 'px';
                    //将此时的位置传出去
                    // binding.value({x: e.pageX, y: e.pageY})
                    e.stopPropagation();
                };
                document.onmouseup = function (e) {

                    document.onmousemove = null;
                    document.onmouseup = null;
                    e.stopPropagation();
                };

                e.stopPropagation();
            };
        }
    }
);


// 控件拖动
Vue.directive('tool-drag',//自定义指令JS
    {
        bind: function (el, binding) {

            el.style.cursor = 'pointer';
            if (el.childNodes[0].childNodes[1].childNodes[0].getAttribute('type') == 'BaseLine') {
                return;
            }
            var oDiv = el;   //当前元素


            oDiv.onmousedown = function (e) {

                if (cloth.tabs.length == 0)return;


                var st = document.querySelector("#fourteen>.content").scrollTop;
                //
                // logger("e.clientX:" + e.clientX + ",   e.clientY:" + e.clientY + ",   oDiv.offsetLeft:" + oDiv.offsetLeft + ",     oDiv.offsetTop:" + oDiv.offsetTop + ",  st:" + st)

                //鼠标按下，计算当前元素距离可视区的距离
                var disX = e.clientX;
                var disY = e.clientY;

                var newX = document.createElement(el.tagName);
                newX.setAttribute("style", el.getAttribute('style'));
                newX.innerHTML = el.innerHTML;
                newX.id = 'X0000000000';
                newX.style.position = 'absolute';
                newX.style.left = oDiv.offsetLeft + 'px';
                newX.style.top = oDiv.offsetTop + 50 - 2 - st + 'px';
                newX.style.width = el.getBoundingClientRect().width;
                document.body.appendChild(newX);
                document.onmousemove = function (e) {
                    //通过事件委托，计算移动的距离
                    var l = e.clientX - disX;
                    var t = e.clientY - disY;
                    //移动当前元素
                    newX.style.left = parseFloat(newX.style.left) + l + 'px';
                    newX.style.top = parseFloat(newX.style.top) + t + 'px';
                    disX = e.clientX;
                    disY = e.clientY;
                    e.stopPropagation();
                };
                document.onmouseup = function (e) {

                    document.onmousemove = null;
                    document.onmouseup = null;
                    document.body.removeChild(newX);


                    var ra = cloth.getRatio();

                    var wb = cloth.getWorkbench();
                    var cc = cloth.getClothcontent();

                    var wb_ = wb.getBoundingClientRect();
                    var cc_ = cc.getBoundingClientRect();


                    // logger("e.x:" + e.x + '                         e.y:' + e.y);
                    // logger("c.left:" + cc_.left + ',c.right:' + cc_.right + ",c.top:" + cc_.top + ',c.bottom:' + cc_.bottom);


                    if (e.x < cc_.right &&
                        e.x > cc_.left &&
                        e.y < cc_.bottom &&
                        e.y > cc_.top) {
                        //在内容区域内
                        // logger("在内容区域内");

                        // logger("e.x:" + e.x + "-" + "(parseFloat( wb_.left:" + wb_.left + ")+parseFloat( wb_.width:" + wb_.width + "))");
                        // logger("e.y:" + e.y + "-" + "(parseFloat( wb_.top:" + wb_.top + ")+parseFloat( wb_.height:" + wb_.height + "))");
                        var _left = (e.x - (parseFloat(wb_.left) + parseFloat(wb_.width))) / ra;
                        var _top = (e.y - (parseFloat(wb_.top) + parseFloat(wb_.height))) / ra;

                        var tool = toolBtns.selectedTool;

                        var timestamp = new Date().getTime();
                        var newNode = {
                            MarkId: timestamp,
                            Text: tool.remark,
                            ElementName: tool.tool,
                            ElementType: tool.tool,
                            top: _top,
                            left: _left
                        }
                        cloth.addNode(newNode);

                    } else {
                        // logger("在内容区域外");
                    }


                    e.stopPropagation();
                };
                e.stopPropagation();
            };
        }
    }
);


// The raw data to observe
var stats = [
    {label: 'A', value: 100},
    {label: 'B', value: 100},
    {label: 'C', value: 100},
    {label: 'D', value: 100},
    {label: 'E', value: 100},
    {label: 'F', value: 100}
];

// A resusable polygon graph component
Vue.component('polygraph', {
    props: ['stats'],
    template: '#polygraph-template',
    computed: {
        // a computed property for the polygon's points
        points: function () {
            var total = this.stats.length
            return this.stats.map(function (stat, i) {
                var point = valueToPoint(stat.value, i, total)
                return point.x + ',' + point.y
            }).join(' ')
        }
    },
    components: {
        // a sub component for the labels
        'axis-label': {
            props: {
                stat: Object,
                index: Number,
                total: Number
            },
            template: '#axis-label-template',
            computed: {
                point: function () {
                    return valueToPoint(
                        +this.stat.value + 10,
                        this.index,
                        this.total
                    )
                }
            }
        }
    }
})

// math helper...
function valueToPoint(value, index, total) {
    var x = 0
    var y = -value * 0.8
    var angle = Math.PI * 2 / total * index
    var cos = Math.cos(angle)
    var sin = Math.sin(angle)
    var tx = x * cos - y * sin + 100
    var ty = x * sin + y * cos + 100
    return {
        x: tx,
        y: ty
    }
}


var toolBtns = new Vue({
    el: '#toolBtns',
    data: {
        cursor: {
            tool: "BaseLine",
            type: "LINE",
            remark: "节点连线"
        },
        tools: [],
        enum:[],
        selectedTool: null
    },
    methods: {
        getRemark: function (thetool) {
            // logger(thetool);
            var filterList = this.tools.filter(function (tool) {
                return tool.tool == thetool;
            });
            if (!filterList || filterList.length == 0) return "";
            return filterList[0].remark;
        },
        getAttrs: function (thetool) {
            var filterList = this.tools.filter(function (tool) {
                return tool.tool == thetool;
            });
            if (!filterList || filterList.length == 0) return "";
            return filterList[0].attrs;
        }
    },
    beforeCreate: function () {
        var url = "./date/getWebFlowInit?_=" + (new Date()).getTime();
        var xhr = new XMLHttpRequest()
        var self = this;

        xhr.open('GET', url);
        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            self.tools = res.data.toolBtns;
            self.enum = res.data.enum;
            // logger(res)
            loadedCount++;
        }
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();


        setTimeout(function(){

            loadedCount++;
        },2000);
    }
});

var cloth = new Vue({
    el: '#cloth',
    data: {
        tabid: '',
        theTab: null,
        tabs: [],
        tabIndex: 2,
        lineNow: false,
        enterNode: null
    },
    methods: {
        getExitLineLength: function (node) {//返回输出连线个数
            if (node.exitLine) {
                return node.exitLine.length;
            }
            return 0;
        },
        getEnterLineLength: function (node) {//返回输入连线个数
            if (node.enterLine) {
                return node.enterLine.length;
            }
            return 0;
        },
        getRemark: function (elementtype) {//获取节点类型中文描述
            return toolBtns.getRemark(elementtype);
        },
        getTab: function () {//获取当前标签页
            var this_ = this;
            return this.tabs.filter(function (tab) {
                return tab.tab_id == this_.tabid;
            })[0];
        },
        getWorkbench: function () {//获取当前工作台
            if (this.theTab) {
                return this.$refs[this.theTab.tab_id + '_w'][0];
            }
            this.theTab = this.getTab();
            return this.$refs[this.theTab.tab_id + '_w'][0];
        },
        getClothcontent: function () {//获取当前画布内容
            if (this.theTab) {
                return this.$refs[this.theTab.tab_id + '_c'][0];
            }
            this.theTab = this.getTab();
            return this.$refs[this.theTab.tab_id + '_c'][0];
        },
        getRatio: function () {//获取当前缩放比例值__transform_scale
            if (this.theTab) {
                return this.theTab.__transform_scale
            }
            this.theTab = this.getTab();
            return this.theTab.__transform_scale;
        },
        mousewheel: function (eve) {//鼠标缩放 调整 比例值transform_scale
            if (!this.theTab) {
                this.theTab = this.getTab();
            }
            if (this.theTab.__transform_scale <= 0.125 && eve.deltaY <= 0) {
                return;
            }
            this.theTab.__transform_scale = this.theTab.__transform_scale + eve.deltaY / Math.abs(eve.deltaY) * 0.125;
            /*
             var clothcontent=this.$refs[this.theTab.tab_id+'_c'][0];
             var workbench=this.$refs[this.theTab.tab_id+'_w'][0];
             var workbench_=workbench.getBoundingClientRect();
             //
             // logger("e.x:"+e.x+",e.y:"+e.y);
             // logger("workbench_.x:"+workbench_.x+",workbench_.y:"+workbench_.y);
             var x=eve.x-workbench_.x;
             var y=eve.y-workbench_.y;



             var d =  [_[0] / 100 * workbench.clientWidth * (1 - this.theTab.__transform_scale), _[1] / 100 * workbench.clientHeight * (1 - theTab.__transform_scale)],
             e =getOffset(workbench,clothcontent, !0),
             f = [parseInt(workbench.style.left, 10) || 0, parseInt(workbench.style.top, 10) || 0],
             g = workbench.clientWidth,
             h = workbench.clientHeight,
             i = [(eve.x - (e.left + f[0]) - d[0]) / this.theTab.__transform_scale, (eve.y - (e.top + f[1]) - d[1]) / this.theTab.__transform_scale];
             var s= {
             w: g,
             h: h,
             xy: i,
             xScale: i[0] / g,
             yScale: i[1] / h,
             o: [i[0] / g * 100, i[1] / h * 100]
             }

             this.theTab.__transform_origin=s.o[0]+'% '+s.o[1]+'% 0px';

             (function(a, b, c, d) {
             var e, f, g, h, i = _[0] / 100 * b,
             j = _[1] / 100 * c;
             e = -(i * (1 - this.theTab.__transform_scale)),
             f = -(j * (1 - this.theTab.__transform_scale)),
             _ = a,
             this.theTab.__transform_origin=_[0] + '% ' + _[1] + '% 0px';

             i = _[0] / 100 * b,
             j = _[1] / 100 * c,
             g = -(i * (1 - this.theTab.__transform_scale)),
             h = -(j * (1 - this.theTab.__transform_scale));
             // var k = Pa(q, g - e, h - f, d);
             // y && y(_, k)
             })(s.o, s.w, s.h, eve);
             */

        },
        clickTab: function (tab) {//点击标签页
            this.tabid = tab.$options.propsData.name;
            this.theTab = this.getTab();
            property.setFlow(this.theTab);
        },
        addTab: function (tabDate) {//添加新标签页
            var tab;
            if (!tabDate) {
                var newTabid = 'xxx_xxxx_' + (++this.tabIndex);
                var newTitle = '新流程' + this.tabIndex;
                tab = {
                    tab_id: newTabid,
                    id: null,
                    title: newTitle,
                    name: '',
                    sysFlag: '',
                    description: '',
                    createDate: '',
                    updateDate: '',
                    nodelist: [],
                    linelist: [],
                    __transform_scale: 1,
                    __transform_origin: 'center center 0px'
                };
            } else {
                tab = tabDate;
            }
            this.tabs.push(tab);
            this.tabid = tab.tab_id;
            this.theTab = tab;
            property.setFlow(this.theTab);
        },
        removeTab: function (targetName) {//删除标签页
            var tabs = this.tabs;
            var activeTabId = this.tabid;
            if (activeTabId === targetName) {
                tabs.forEach(function (tab, index) {
                    if (tab.tab_id === targetName) {
                        var nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeTabId = nextTab.tab_id;
                        }
                    }
                });
            }

            this.tabid = activeTabId;
            this.tabs = tabs.filter(function (tab) {
                return tab.tab_id !== targetName
            });
            this.theTab = this.getTab();
            property.setFlow(this.theTab);
        },
        getLineSvgStyle: function (line) {//获取线的svg 样式
            var perNodePostion = this.getNodePostionByLinetype(line.__PreNode, line.linetype);
            var nextNodePostion = this.getNodePostionByLinetype(line.__NextNode);

            var style = {};
            // style.direction='↑↓←→';
            style = {
                height: Math.abs(nextNodePostion.top - perNodePostion.top),
                width: Math.abs(nextNodePostion.left - perNodePostion.left),
                top: perNodePostion.top + 'px',
                left: perNodePostion.left + 'px',
                direction: '↓→'
            }

            if (nextNodePostion.top < perNodePostion.top) {
                style.top = nextNodePostion.top - options.line.vacancy / 2 + 'px';
                style.height = style.height + options.line.vacancy;
                style.direction = '↑→';
            }
            if (nextNodePostion.left < perNodePostion.left) {
                style.left = nextNodePostion.left + 'px';
                if (style.direction == '↑→') {
                    style.direction = '↑←';
                } else {
                    style.direction = '↓←';
                }
            }

            if (nextNodePostion.left == perNodePostion.left) {
                style.direction = '↓↓';
                if (nextNodePostion.top < perNodePostion.top) {
                    style.direction = '↑↑';
                }
            }
            if (style.direction != '↑↑' && Math.abs(nextNodePostion.left - perNodePostion.left) <= (options.a.radius1 + 1)) {
                options.a.radius = options.a.radius0;
            } else {
                options.a.radius = options.a.radius1;
            }

            if (style.width < 1) {
                style.width = 1;
            }


            line.__s = style;
            return style;
        },
        addNode: function (newNode) {//添加新节点
            if (!this.theTab) {
                this.theTab = this.getTab();
            }
            this.theTab.nodelist.push(newNode)
        },
        getArrowPathD: function (line) {//svg箭头 d属性
            var ps = [];
            var d = '';
            var p = {};
            if (line.__s.direction == '↓→' || line.__s.direction == '↓↓') {
                p = {
                    x: line.__s.width,
                    y: line.__s.height
                }
            } else if (line.__s.direction == '↑→') {
                p = {
                    x: line.__s.width,
                    y: options.line.vacancy / 2
                }
            } else if (line.__s.direction == '↑←' || line.__s.direction == '↑↑') {
                p = {
                    x: 0,
                    y: options.line.vacancy / 2
                }
            } else if (line.__s.direction == '↓←') {
                p = {
                    x: 0,
                    y: line.__s.height
                }
            }
            ps.push(p)
            ps.push({
                x: p.x + options.arrow.width / 2,
                y: p.y - options.arrow.width
            })
            ps.push({
                x: p.x,
                y: p.y - options.arrow.width / options.arrow.x
            })
            ps.push({
                x: p.x - options.arrow.width / 2,
                y: p.y - options.arrow.width
            })
            ps.push({
                x: p.x,
                y: p.y
            })

            for (var i = 0; i < ps.length; i++) {
                var p = ps[i];
                if (i == 0) {
                    d += 'M ' + p.x + ' ' + p.y + ' ';
                } else {
                    d += 'L ' + p.x + ' ' + p.y + ' ';
                }
            }
            return d;


        },
        getLinePathD: function (line) {//svg连线 d属性

            // '↑↓←→'
            var d = '';

            var plist = [];
            var pas = {//弧度方向
                '↓→': [0, 1],
                '↑→': [0, 0, 1, 1],
                '↓←': [1, 0],
                '↑←': [1, 1, 0, 0],
                '↑↑': [0, 0, 0, 0]
            }
            //通过连接方向 添加连接点
            if (line.__s.direction == '↓↓') {

                plist.push({
                    x: 0,
                    y: 0
                });
                plist.push({
                    x: line.__s.width,
                    y: line.__s.height
                });
            } else if (line.__s.direction == '↓→') {
                plist.push({
                    x: 0,
                    y: 0
                });
                plist.push({
                    x: 0,
                    y: line.__s.height / 2 - options.a.radius
                });
                plist.push({
                    x: options.a.radius,
                    y: line.__s.height / 2
                });
                plist.push({
                    x: line.__s.width - options.a.radius,
                    y: line.__s.height / 2
                });
                plist.push({
                    x: line.__s.width,
                    y: line.__s.height / 2 + options.a.radius
                });
                plist.push({
                    x: line.__s.width,
                    y: line.__s.height
                });
            } else if (line.__s.direction == '↑→') {
                plist.push({
                    x: 0,
                    y: line.__s.height - options.line.vacancy / 2
                });
                plist.push({
                    x: 0,
                    y: line.__s.height - options.a.radius
                });
                plist.push({
                    x: options.a.radius,
                    y: line.__s.height
                });
                plist.push({
                    x: line.__s.width / 2 - options.a.radius,
                    y: line.__s.height
                });
                plist.push({
                    x: line.__s.width / 2,
                    y: line.__s.height - options.a.radius
                });
                plist.push({
                    x: line.__s.width / 2,
                    y: options.a.radius
                });
                plist.push({
                    x: line.__s.width / 2 + options.a.radius,
                    y: 0
                });
                plist.push({
                    x: line.__s.width - options.a.radius,
                    y: 0
                });
                plist.push({
                    x: line.__s.width,
                    y: options.a.radius
                });
                plist.push({
                    x: line.__s.width,
                    y: options.line.vacancy / 2
                });
            } else if (line.__s.direction == '↑←') {
                plist.push({
                    x: line.__s.width,
                    y: line.__s.height - options.line.vacancy / 2
                });
                plist.push({
                    x: line.__s.width,
                    y: line.__s.height - options.a.radius
                });

                plist.push({
                    x: line.__s.width - options.a.radius,
                    y: line.__s.height
                });
                plist.push({
                    x: line.__s.width / 2 + options.a.radius,
                    y: line.__s.height
                });

                plist.push({
                    x: line.__s.width / 2,
                    y: line.__s.height - options.a.radius
                });
                plist.push({
                    x: line.__s.width / 2,
                    y: options.a.radius
                });
                plist.push({
                    x: line.__s.width / 2 - options.a.radius,
                    y: 0
                });
                plist.push({
                    x: options.a.radius,
                    y: 0
                });
                plist.push({
                    x: 0,
                    y: options.a.radius
                });
                plist.push({
                    x: 0,
                    y: options.line.vacancy / 2
                });
            } else if (line.__s.direction == '↓←') {
                plist.push({
                    x: line.__s.width,
                    y: 0
                });
                plist.push({
                    x: line.__s.width,
                    y: line.__s.height / 2 - options.a.radius
                });
                plist.push({
                    x: line.__s.width - options.a.radius,
                    y: line.__s.height / 2
                });
                plist.push({
                    x: options.a.radius,
                    y: line.__s.height / 2
                });
                plist.push({
                    x: 0,
                    y: line.__s.height / 2 + options.a.radius
                });
                plist.push({
                    x: 0,
                    y: line.__s.height
                });
            } else if (line.__s.direction == '↑↑') {
                plist.push({
                    x: 0,
                    y: line.__s.height - options.line.vacancy / 2
                });
                plist.push({
                    x: 0,
                    y: line.__s.height - options.a.radius
                });
                plist.push({
                    x: options.a.radius,
                    y: line.__s.height
                });
                plist.push({
                    x: options.nodeSize.width - options.a.radius,
                    y: line.__s.height
                });
                plist.push({
                    x: options.nodeSize.width,
                    y: line.__s.height - options.a.radius
                });
                plist.push({
                    x: options.nodeSize.width,
                    y: options.a.radius
                });
                plist.push({
                    x: options.nodeSize.width - options.a.radius,
                    y: 0
                });
                plist.push({
                    x: options.a.radius,
                    y: 0
                });
                plist.push({
                    x: 0,
                    y: options.a.radius
                });
                plist.push({
                    x: line.__s.width,
                    y: options.line.vacancy / 2
                });
            }


            //通过连接点生成d属性值
            var j = 0;
            for (var i = 0; i < plist.length; i++) {
                var p = plist[i];
                var np = plist[i + 1];
                if (i % 2 == 0) {
                    d += 'M ' + p.x + ' ' + p.y + ' ';
                } else {
                    d += 'L ' + p.x + ' ' + p.y + ' ';
                    if (np && line.__s.direction != '↓↓') {
                        d += 'M ' + p.x + ' ' + p.y + ' A ' + options.a.radius + ' ' + options.a.radius + ' 0 0,' + pas[line.__s.direction][j++] + ' ' + np.x + ' ' + np.y + ' ';
                    }
                }
            }
            return d;
        },
        getNodePostionByLinetype: function (node, linetype) {//获取节点对应连线类型的位置

            if (!linetype) {
                linetype = 'enterLine';
            }

            if (!this.theTab) {
                this.theTab = this.getTab();
            }

            var style = {
                top: 0,
                left: 0
            }
            switch (linetype) {
                case 'enterLine':
                    style.top = parseFloat(node.top);
                    style.left = parseFloat(node.left) + options.nodeSize.width / 2;
                    break;
                case 'exitLine':
                    style.top = parseFloat(node.top) + options.nodeSize.height;
                    style.left = parseFloat(node.left) + options.nodeSize.width / 2;
                    break;
                case '':
                    break;
            }

            return style;
        },
        olSpanMouseDown: function (node, eve, linetype) {//连接线处 鼠标按下时

            this.lineNow = true;
            var that = this;

            if (!this.theTab) {
                this.theTab = this.getTab();
            }
            var postion = this.getNodePostionByLinetype(node, linetype);


            var ra = cloth.getRatio();
            //鼠标按下，计算当前元素距离可视区的距离
            var cx = eve.clientX;
            var cy = eve.clientY;


            var virtualNextNode = {
                top: postion.top,
                left: postion.left - options.nodeSize.width / 2
            }


            var timestamp = new Date().getTime();
            var newLine = {
                MarkId: timestamp,
                ElementName: "",
                Text: '',
                ElementType: "BaseLine",
                PreNodeId: node.MarkId,
                NextNodeId: 0,
                linetype: 'exitLine',
                __PreNode: node,
                __NextNode: virtualNextNode
            };


            this.theTab.linelist.push(newLine);


            document.onmousemove = function (e) {


                var l = e.clientX - cx;
                var t = e.clientY - cy;
                virtualNextNode.left = virtualNextNode.left + l / ra;
                virtualNextNode.top = virtualNextNode.top + t / ra;
                cx = e.clientX;
                cy = e.clientY;
                e.stopPropagation();
            }
            document.onmouseup = function (e) {

                document.onmousemove = null;
                document.onmouseup = null;
                if (that.enterNode != null && that.enterNode.MarkId!=newLine.PreNodeId ) {
                    newLine.NextNodeId = that.enterNode.MarkId;
                    newLine.__NextNode = that.enterNode;

                    if (!that.enterNode.enterLine) {
                        that.enterNode.enterLine = [];
                    }
                    that.enterNode.enterLine.push(newLine.MarkId);

                    if (!newLine.__PreNode[linetype]) {
                        newLine.__PreNode[linetype] = [];
                    }

                    newLine.__PreNode[linetype].push(newLine.MarkId);


                } else {
                    that.theTab.linelist.pop()
                }
                this.lineNow = false;
                e.stopPropagation();
            }
        },
        nodeMouseEnter: function (node, eve) {
            this.enterNode = node;
            if (this.lineNow) {

            }
        },
        nodeMouseLeave: function (node, eve) {
            this.enterNode = null;
        },
        nodeDragMouseDown: function (node, eve) {

            // var oDiv = eve.target;   //当前元素

            var ra = cloth.getRatio();
            //鼠标按下，计算当前元素距离可视区的距离
            var cx = eve.clientX;
            var cy = eve.clientY;


            document.onmousemove = function (e) {
                //通过事件委托，计算移动的距离
                var l = e.clientX - cx;
                var t = e.clientY - cy;

                // logger('left:' + node.left);
                // logger('top:' + node.top);
                // logger('ra:' + ra);

                node.left = node.left + l / ra;
                node.top = node.top + t / ra;
                cx = e.clientX;
                cy = e.clientY;

                //移动当前元素
                // oDiv.style.left = l  + 'px';
                // oDiv.style.top = t  + 'px';
                //将此时的位置传出去
                // binding.value({x: e.pageX, y: e.pageY})
                e.stopPropagation();
            };
            document.onmouseup = function (e) {

                document.onmousemove = null;
                document.onmouseup = null;
                e.stopPropagation();
            };
        },
        linemouseenter: function (line, eve) {


            document.getElementById('line_' + line.MarkId).setAttribute('class', 'line linelight');

        },
        linemouseout: function (line, eve) {
            document.getElementById('line_' + line.MarkId).setAttribute('class', 'line');


        },
        lineclick: function (line, eve) {
            property.setLine(line);
            selectObj = line;
        },
        nodeClick: function (node, eve) {
            property.setNode(node);
            selectObj = node;
        },
        nodeRemove: function (node, eve) {

            if (!this.theTab) {
                this.theTab = this.getTab();
            }
            var lines = this.theTab.linelist.filter(function (line) {
                return line.PreNodeId == node.MarkId || line.NextNodeId == node.MarkId;
            });
            this.lineRemove(lines, null)
            this.theTab.nodelist = this.theTab.nodelist.filter(function (_node) {
                return _node.MarkId != node.MarkId;
            });
            property.setEleNull();
        },
        lineRemove: function (linev, eve) {

            var that = this;
            if (linev instanceof Array) {
                linev.forEach(function (line) {
                    that.lineRemove(line, null);
                });
                return;
            }

            if (!this.theTab) {
                this.theTab = this.getTab();
            }
            this.theTab.nodelist.forEach(function (node) {
                if (node.elementtype == 'IfNode') {

                } else {

                    if (node.enterLine) {
                        node.enterLine = node.enterLine.filter(function (item) {
                            return item != linev.MarkId;
                        })
                    }
                    if (node.exitLine) {
                        node.exitLine = node.exitLine.filter(function (item) {
                            return item != linev.MarkId;
                        })
                    }
                }
            });

            this.theTab.linelist = this.theTab.linelist.filter(function (line) {
                return line.MarkId != linev.MarkId;
            });

            property.setEleNull();
            // logger(this.theTab)
        }
    },
    created: function () {
        if (this.tabs.length > 0) {
            this.tabid = this.tabs[0].tab_id;
            this.theTab = this.getTab();
        }


    }
});


var property = new Vue({
    el: '#property',
    data: {
        activeNames: [],
        flow: {},
        node: {},
        line: {},
        isLine: false,
        isNode: false,
        nodeAttrs: [],
        sysFlags: null,
        sysFlagLoading: false
    },
    methods: {
        setEleNull: function () {
            this.node = {};
            this.line = {};
            this.node = {};
            this.line = {};
            this.isLine = false;
            this.isNode = false
            selectObj = null;
        },
        setFlow: function (flow) {
            this.setEleNull();
            if (!flow) {
                this.flow = {};
                this.activeNames = [];
                return;
            }
            this.flow = flow;
            if (this.activeNames.indexOf("flow") == -1) {
                this.activeNames.push("flow");
            }
            if (this.sysFlags == null) {
                this.initSys();
            }
        },
        setLine: function (line) {

            // logger(line);
            this.line = line;
            this.isLine = true;
            this.isNode = false;
            if (this.activeNames.indexOf("line") == -1) {
                this.activeNames.push("line");
            }
        },
        setNode: function (node) {

            // logger(node);
            // for (var attr in this.nodeAttrs) {
            //     // logger(this.nodeAttrs[attr].key);
            //     delete this.node[this.nodeAttrs[attr].key];
            // }

            this.nodeAttrs = [];

            this.node = node;
            var attrs = toolBtns.getAttrs(node.ElementType);
            for (var attrkey in attrs) {
                var attr = attrs[attrkey];


                // this.node[attrkey] = null;

                attr.key = attrkey;
                if (attr.defaultValue && attr.defaultValue != ''
                    &&
                    (this.node[attrkey] == null
                    || this.node[attrkey] == '')) {
                    this.node[attrkey] = attr.defaultValue;
                }

                // if(attr.type=='Boolean'&&typeof this.node[attrkey]!='boolean' ){
                //     this.node[attrkey]=this.node[attrkey]?(this.node[attrkey].toLowerCase()=='true'?true:false):false;
                // }
                //
                // if(attr.type=='Map'&&typeof this.node[attrkey]=='string' ){
                //     this.node[attrkey]=this.node[attrkey]?eval('('+this.node[attrkey].replace(/\r\n/ig,"")+')'):{};
                // }


                this.nodeAttrs.push(attr);


            }

            // logger(this.nodeAttrs);

            // logger(this.node);
            if (this.activeNames.indexOf("node") == -1) {
                this.activeNames.push("node");
            }
            this.isLine = false;
            this.isNode = true;
        },
        initSys: function () {
            this.sysFlagLoading = true;
            var that = this;
            axios({
                method: 'get',
                url: './date/getCrawlerSys'
            }).then(function (response) {
                // logger(response.data.data);
                that.sysFlags = response.data.data;
                that.sysFlagLoading = false;
            }).catch(function (error) {
                logger(error);
                that.sysFlags = [];
                that.sysFlagLoading = false;
            });
        },
        openAddSys: function () {

        },
        testlog:function () {
            logger(this.node);
        },
        getEnum:function (type) {
            var types=toolBtns.enum[type];
            return types;
        },
        xxx:function (xx) {
            return xx;
        }
    }
});


var buttons = new Vue({
    el: '#buttons',
    data: {
        openDialogVisible: false,
        form: {
            sysFlag: null,
            flow: null
        },
        sysFlags: [""],
        flows: [{}]
    },
    methods: {
        changeSysFlag: function () {


            if(this.form.sysFlag==null){
                return;
            }


            this.flows = [{}];
            this.form.flow = null;
            var loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

            var that = this;
            axios({
                method: 'get',
                url: './date/getCrawlerFlowsBySysFlag',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                params: {
                    'sysFlag': this.form.sysFlag
                }
            }).then(function (response) {
                // logger(response.data.data);
                that.flows = response.data.data;
                that.form.flow = null;
                loading.close();
                that.openDialogVisible = true;
            }).catch(function (error) {
                logger(error);
                that.form.flow = null;
                loading.close();
            });

            // logger(this.form.sysFlag)
        },
        add: function () {
            cloth.addTab();
        },
        openDialog: function () {

            this.sysFlags = [];
            this.flows = [{}];
            this.form.flow = null;
            this.form.sys = null;
            var loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            var that = this;
            axios({
                method: 'get',
                url: './date/getCrawlerSys'
            }).then(function (response) {
                // logger(response.data.data);
                that.sysFlags = response.data.data;
                loading.close();
                that.openDialogVisible = true;
                if (!this.flows) {
                    that.changeSysFlag();
                }
            }).catch(function (error) {
                logger(error);
                that.sysFlags = [];
                loading.close();
            });


        },
        open: function () {
            if (!this.form.flow) {
                this.$message('请选择!');
                return;
            }
            var id = this.form.flow.id;

            var loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

            var newDate = {};
            var that = this;
            axios({
                method: 'get',
                url: './date/getFlowById',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                params: {
                    'id': id
                }
            }).then(function (response) {
                // logger(response.data.data);
                if (response.data.status == 4) {
                    newDate = response.data.data;
                    newDate.tab_id = newDate.name + '_' + newDate.sysFlag + '_' + newDate.id;

                    newDate.__transform_scale = 1;
                    newDate.__transform_origin = 'center center 0px';
                    for (var i = 0; i < newDate.linelist.length; i++) {
                        var x = newDate.linelist[i];


                        if (x.PreNodeId && x.PreNodeId != '') {

                            var nodelist_f = newDate.nodelist.filter(function (node) {
                                return node.MarkId == x.PreNodeId;
                            });

                            if (nodelist_f && nodelist_f.length > 0) {
                                x.__PreNode = nodelist_f[0];
                            }

                        }
                        if (x.NextNodeId && x.NextNodeId != '') {
                            var nodelist_f = newDate.nodelist.filter(function (node) {
                                return node.MarkId == x.NextNodeId;
                            });

                            if (nodelist_f && nodelist_f.length > 0) {
                                x.__NextNode = nodelist_f[0];
                            }
                        }

                    }

                    cloth.addTab(newDate);


                } else {
                    that.$message('打开失败:' + response.data.message);
                }
                loading.close();
                that.openDialogVisible = false;
            }).catch(function (error) {
                logger(error);
                that.$message('打开失败');
                loading.close();
            });

            // var newDate = {
            //     id: '2',
            //     title: '贷上钱',
            //     name: 'dsq',
            //     sysFlag: 'zdgj',
            //     description: '贷上钱描述',
            //     createDate: '2017-10-30 10:14:00',
            //     updateDate: '2017-11-02 16:35:03',
            //     nodelist: [
            //         {
            //             MarkId: 3961,
            //             Text: '开始',
            //             Elementname: 'beginNode',
            //             elementtype: 'BeginNode',
            //             top: -123,
            //             left: -10,
            //             enterLine: [123],
            //             exitLine: [123]
            //         },
            //         {
            //             MarkId: 3962,
            //             Text: '开始2',
            //             ElementName: 'beginNode',
            //             ElementType: 'BeginNode',
            //             top: 123,
            //             left: 321,
            //             enterLine: [],
            //             exitLine: [123,321,123]
            //         }
            //     ],
            //     linelist: [
            //         {
            //             MarkId: 1234324,
            //             ElementName: "linenene",
            //             Text: '哈哈哈',
            //             ElementType: "BaseLine",
            //             PreNodeId: 3961,
            //             NextNodeId: 3962,
            //             linetype: 'exitLine'
            //         }
            //     ],
            //     __transform_scale: 1,
            //     __transform_origin: 'center center 0px'
            // }


        },
        save: function () {
            if (cloth.tabs.length == 0) {
                this.$message('无流程');
                return;
            }

            if (property.flow.name == '' || property.flow.title == '' || property.flow.sysFlag == '') {
                var msg = '流程信息不完整!';
                if (property.flow.name == '') {
                    msg += ' 流程标识'
                }
                if (property.flow.title == '') {
                    msg += ' 流程名称'
                }
                if (property.flow.sysFlag == '') {
                    msg += ' 流程系统标识'
                }
                this.$message(msg);
                return false;
            }

            var tab = cloth.getTab();


            tab.nodelist.forEach(function (node) {
                for (attr in node) {
                    if (node[attr] == null || attr == undefined) {
                        delete node[attr];
                    }
                }
            })


            var data = JSON.stringify(tab);



            var loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            var that = this;

            var loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            axios({
                method: 'post',
                url: '/devflow/saveFlow',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                params: {
                    'o': data
                }
            }).then(function (response) {
                // logger(response);
                if (response.data.status == 4) {
                    that.$message('保存成功');
                } else {
                    that.$message('保存失败:' + response.data.message);
                }
                loading.close();
            }).catch(function (error) {
                logger(error);
                that.$message('保存失败');
                loading.close();
            });

            //
            //
            // var url = "/devflow/saveFlow";
            // var xhr = new XMLHttpRequest()
            // var self = this;
            //
            // xhr.open('POST', url);
            // xhr.onload = function () {
            //     var res = JSON.parse(xhr.responseText);
            //     // logger(res)
            // }
            // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            // xhr.setRequestHeader('contentType', 'application/x-www-form-urlencoded');
            //
            // xhr.send(param);


        },
        eledelete: function () {
            if (cloth.tabs.length == 0) {
                this.$message('无流程');
                return;
            }

            if (selectObj == null) {
                this.$message('无元素');
                return;
            }

            if (selectObj.PreNodeId) {
                this.$confirm('确认删除 连线[' + selectObj.Text + ']？').then(function () {
                    cloth.lineRemove(selectObj, null);
                    property.setEleNull();
                }).catch(function () {
                });
            } else {
                this.$confirm('确认删除 节点[' + selectObj.Text + ']？').then(function () {
                    cloth.nodeRemove(selectObj, null);
                    property.setEleNull();
                }).catch(function () {
                });
            }


        },
        flowdelete: function () {
            if (cloth.tabs.length == 0) {
                this.$message('无流程');
                return;
            }


            var tab = cloth.getTab();
            var that = this;
            if (tab.id == null) {
                this.$confirm(' 该流程[' + tab.title + ']未保存,确认删除? ').then(function () {
                    cloth.removeTab(tab.tab_id);
                    this.$message('删除成功');
                }).catch(function () {
                });
            } else {
                this.$confirm(' 该操作无法恢复，确认删除 流程 [' + tab.title + ']? ').then(function () {


                    var loading = that.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    axios({
                        method: 'post',
                        url: '/devflow/delFlow',
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        params: {
                            'id': tab.id
                        }
                    }).then(function (response) {
                        // logger(response);
                        if (response.data.status == 4) {
                            that.$message('删除成功');
                            cloth.removeTab(tab.tab_id);

                        } else {
                            that.$message('删除失败:' + response.data.message);
                        }
                        loading.close();
                    }).catch(function (error) {
                        logger(error);
                        that.$message('删除失败');
                        loading.close();
                    });


                }).catch(function () {
                });
            }
        },
        flowrun:function(){
            if (cloth.tabs.length == 0) {
                this.$message('无流程');
                return;
            }
            var tab = cloth.getTab();
            var that = this;
            var bns=tab.nodelist.filter(function(node){
                return node.ElementType=="BeginNode";
            });
            if(!bns||bns.length==0){
                this.$message('无开始节点');
                return;
            }
            var bn=bns[0];

            tab.nodelist.forEach(function(node){

                if(node.MarkId==bn.MarkId){
                    return;
                }
                var re = /node:\/\/[^\s]*\.requestParam[^\s^,]*\/\/:node/g;

                for(var attr in node){

                    var attrval=node[attr];
                    var arr;
                    while((arr = re.exec(JSON.stringify(attrval))) !=null){

                        // console.log(arr[0].replace("//:node","").replace("node://","").split(".")[2]);

                    }
                    //
                    //
                    //     if(JSON.stringify(node[attr]).indexOf(bn.MarkId+'.requestParam')!=-1){
                    //
                    // }
                }



                //执行
                if (tab.name != "") {
                    the_P.flowFlag =tab.name;
                    the_P.sysFlag=tab.sysFlag;
                }
                var x = prompt("参数", JSON.stringify(the_P));
                if (x == null) return;
                the_P = JSON.parse(x);
                if (the_P.flowFlag == null || the_P.flowFlag == undefined || the_P.flowFlag == ""||
                    the_P.sysFlag == null || the_P.sysFlag == undefined || the_P.sysFlag == "") {
                    alert("flowFlag或者sysFlag不能为空");
                    return;
                }

                var loading = that.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                axios({
                    method: 'post',
                    url: "/flow/run",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    data: JSON.stringify(the_P)
                    // params:
                }).then(function (v) {

                    if (v.status == 4) {
                        alert('成功');
                    } else {
                        alert('失败')
                    }
                    alert(JSON.stringify(v));
                    // logger(v);
                    // if (response.data.status == 4) {
                    //     that.$message('删除成功');
                    //     cloth.removeTab(tab.tab_id);
                    //
                    // } else {
                    //     that.$message('删除失败:' + response.data.message);
                    // }
                    loading.close();
                }).catch(function (error) {
                    logger(error);
                    that.$message('运行失败');
                    loading.close();
                });


                // $.ajax({
                //     'type': 'POST',
                //     'url': "/flow/run",
                //     'contentType': 'application/json',
                //     'data': JSON.stringify(the_P),
                //     'dataType': 'json',
                //     'success': function (v) {
                //         if (v.status == 4) {
                //             alert('成功');
                //         } else {
                //             alert('失败')
                //         }
                //         alert(JSON.stringify(v));
                //     }
                // })
            });
        },
        flowdebug:function(){

        }
    }
});




String.prototype.toPascal = function () {
    return this.substring(0, 1).toUpperCase() + this.substring(1);
}


var init = function () {

    var splitOpts = {
        gutterSize: 8,
        cursor: 'col-resize',
        onDragEnd: function () {
            localStorage.setItem('split-sizes', JSON.stringify(split.getSizes()));
        }
    };
    if (localStorage.getItem('split-sizes')) {
        splitOpts.sizes = JSON.parse(localStorage.getItem('split-sizes'));
    }

    var split = Split(['#fourteen', '#fifteen', '#sixteen'], splitOpts);


};


// //获取元素的纵坐标（相对于窗口）
// function getTop(e){
//     var offset=e.offsetTop;
//     if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
//     return offset;
// }
// //获取元素的横坐标（相对于窗口）
// function getLeft(e){
//     var offset=e.offsetLeft;
//     if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
//     return offset;
// }


var loadFinish = function () {
    if (loadedCount == 1) {
        document.querySelector("#dark").style.display = "none";
    } else {
        setTimeout(loadFinish, 200)
    }
}
init();
loadFinish();