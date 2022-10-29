

cc.Class({
    extends: cc.Component,

    properties: {
      m_bg:cc.Node 
    },
    ctor:function()
    {
        this.m_isCanTouchMove;
        
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.TouchStart.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.TouchMove.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.TouchEnd.bind(this), this);
        //鼠标移出屏幕，也要触发暂停
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.TouchEnd.bind(this), this);
        this.m_isCanTouchMove=false
        
        //this.m_bg.active=false
    },
    
    MoveIn:function()
    {
        this.m_isCanTouchMove=false
        this.node.height=900
    },

    TouchStart:function(event)
    {
        cc.log("touchstart")
        this.node.height=1600
        this.m_bg.runAction(cc.fadeOut(0.5))
        if(gameCtl.m_level.scale==0.4){
            //如果已经在玩的状态了，就直接开火
            gameCtl.StartFire()
            gVirusMaker.resumeAll()
            return 
        }
        //this.m_isCanTouchMove=true
        this.m_pos=event.getLocation()
        gameCtl.SetState('STATE_MOVEOUT')
        this.scheduleOnce(function(){
            this.m_isCanTouchMove=true
            
            gameCtl.StartFire()
        }.bind(this),1.5)
    },
    TouchMove:function(event)
    {
        //cc.log("touchmove")
        if(this.m_isCanTouchMove===false)
        {
            cc.log("no move")
            return
        }
        else
        {
            //console.log(event)
            var pos=event.getDelta()
            gameCtl.moveAirplane(pos)
            
        }
    },
    TouchEnd:function(event)
    {
        cc.log("touchend")
        this.m_bg.runAction(cc.fadeIn(0.5))
        gameCtl.EndFire()
        gVirusMaker.pauseAll()
        //如果一不小心开始时候停太快了，就纠正一下
        if(this.m_isCanTouchMove==false)
        {
            this.m_isCanTouchMove=true
           
        }
        // if(this.m_isCanTouchMove==true)
        // {
        //     gameCtl.SetState('STATE_MOVEIN')
        //     if(this.m_isPlay)
        //     {
        //         this.m_isPlay=false
                
        //     }
        //     this.m_isCanTouchMove=false
        // }
    },
    

    start () {

    },
    /*
    cc.Node.EventType.TOUCH_START	touchstart	当手指触点落在目标节点区域内时
    cc.Node.EventType.TOUCH_MOVE	touchmove	当手指在屏幕上移动时
    cc.Node.EventType.TOUCH_END	touchend	当手指在目标节点区域内离开屏幕时
    cc.Node.EventType.TOUCH_CANCEL	touchcancel	当手指在目标节点区域外离开屏幕时
    node.on(cc.Node.EventType.TOUCH_START, callback, this);
    node.on(cc.Node.EventType.TOUCH_MOVE, callback, this);
    node.on(cc.Node.EventType.TOUCH_END, callback, this);
    */
    
});
