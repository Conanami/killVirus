

cc.Class({
    extends: cc.Component,

    properties: {
        m_circle:cc.Node, //圆圈
        m_virus:cc.Node, //病毒
        m_tail: cc.Node,
        range:0,
       
    },

    init:function(range){
        this.range=range
        this.startx=this.node.x
        this.starty=this.node.y
        
    },

    reset:function()
    {
        this.m_tail.opacity=255
    },
    

    // LIFE-CYCLE CALLBACKS:
    Begin:function()
    {
        this.m_tail.runAction(cc.fadeOut(0.3))
        var seq=cc.sequence(cc.fadeOut(0.2),cc.delayTime(0.2),cc.fadeIn(0.2),cc.delayTime(0.2))
        
        this.m_circle.runAction(seq.repeatForever())
        
        //在随机区域内移动
        this.virusAction(cc.v2(this.startx,this.starty),this.range)
    },  
    
    //随机区域游荡
    virusAction:function(pos,range)
    {

        _x=random(pos.x-range,pos.x+range)
        _y=random(pos.y-range,pos.y+range)
        //console.log(pos+"范围:"+range)
        var seq=cc.sequence(cc.moveTo(0.6,cc.v2(_x,_y)),
        cc.callFunc(
            function(){
                this.virusAction(pos,range)
            }.bind(this)))
        this.node.runAction(seq)
    },
    // onLoad () {},


    start () {

    },

    // update (dt) {},
});
