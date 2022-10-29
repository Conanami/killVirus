

cc.Class({
    extends: cc.Component,

    properties: {
        m_item:[cc.Node],
        m_level:1,
        m_left:cc.Node,
        m_right:cc.Node
    },
    //构造函数
    ctor:function()
    {
        this.m_basePos=new Array(),
        this.m_baseScale=new Array(),
        this.m_baseOpacity=new Array()
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //默认值为1
        this.m_level=gDataCtl.GetLevel()
        for (let i =0;i < this.m_item.length; i++){
            this.m_basePos[i]=this.m_item[i].getPosition()
            this.m_baseScale[i]=this.m_item[i].scale
            this.m_baseOpacity[i]=this.m_item[i].opacity
        }         
        this.Reset()
    },

    setCurrentLevel:function(num)
    {
        this.m_level=num
        this.Reset()
    },
    //重置所有关卡
    Reset:function()
    {
        this.node.position=cc.v2(0,0)
        this.node.scale=1
        for (let i = 0; i < this.m_item.length; i++) {
            this.m_item[i].setPosition(this.m_basePos[i])
            this.m_item[i].scale=this.m_baseScale[i]
            this.m_item[i].opacity=this.m_baseOpacity[i]
            this.m_item[i].active=true
            var js=this.m_item[i].getComponent('Levelitem')
            js.setLevel(this.m_level-2+i)
        }
        this.m_item[0].opacity=0
        this.m_item[4].opacity=0
    },
    //播放过关动画
    Play:function()
    {

    },
    NextLevel:function()
    {
        for (let i = 1; i < this.m_item.length; i++) {
            var moveTo=cc.moveTo(0.5,this.m_basePos[i-1])
            
            if(i==2)
            {
                //如果当中移到左边，就要缩小
                var scale=cc.scaleTo(0.5,0.6)
                var seq=cc.spawn(scale,moveTo)
                this.m_item[i].runAction(seq)
            }
            else if(i==3)
            {
                //如果是右边移到当中，就要放大
                var scale=cc.scaleTo(0.5,1)
                var seq=cc.spawn(scale,moveTo)
                this.m_item[i].runAction(seq)
            }
            else if(i==4)
            {
                //第四个就是淡入
                var fade=cc.fadeIn(0.5)
                var seq=cc.spawn(fade,moveTo)
                this.m_item[i].runAction(seq)
            }
            else if(i==1)
            {
                //第一个就是淡出
                var fade=cc.fadeOut(0.5)
                var seq=cc.spawn(fade,moveTo)
                this.m_item[i].runAction(seq)
            }
            

        }
        //做完后做个加关卡的reset
        var dly=cc.delayTime(0.5)
        var nodeseq=cc.sequence(dly,cc.callFunc(
            function(){
                cc.log('关卡加1')
                gDataCtl.AddLevel()
                this.m_level=gDataCtl.GetLevel()
                this.Reset()
            }.bind(this)
        ))
        this.node.runAction(nodeseq)
    },

    //移出
    MoveOut:function()
    {
        var moveTo=cc.moveTo(0.3,cc.v2(0,615))
        var scale=cc.scaleTo(0.3,0.4)
        var seq=cc.spawn(moveTo,scale)
        this.node.runAction(seq)
    },

    //移入
    MoveIn:function()
    {
        var moveTo=cc.moveTo(0.5,cc.v2(0,0))
        var scale=cc.scaleTo(0.5,1)
        var seq=cc.spawn(moveTo,scale)
        this.node.runAction(seq)
    },
    
    start () {

    },

    // update (dt) {},
});
