/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-04-03 10:59:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-03 19:26:05
 */


cc.Class({
    extends: cc.Component,

    properties: {
        m_blackbg:cc.Node,
        m_btnAction:cc.Button,
        m_timer1:cc.Label,
        m_timer2:cc.Label,
        m_adver:cc.Node ,
        m_btnClose:cc.Button 
    },

    // LIFE-CYCLE CALLBACKS:
    //盖上黑色背景色
    SetBlackBg:function(isShow)
    {
        if(isShow)
        {
            //盖上黑色
            this.m_blackbg.runAction(cc.fadeTo(0.5,127))
            //开始显示播放广告的按钮
            //this.m_timer1.string='3'
            this.countdown1=180
            this.m_btnAction.active=true
           
        }
        else
        {
            this.m_blackbg.runAction(cc.fadeTo(0.5,0))
        }
    },
    MoveOut:function()
    {
        this.node.active=false
        this.init()
    },
    OnBtnActionClick:function()
    {
        gAdTimes++
        this.m_adver.active=true
        this.m_adver.x=0
        this.countdown2=60*3
    },
    OnBtnCloseClick:function()
    {
        this.node.active=false
        this.init()
        gameCtl.Revive()
    },
    Reset:function()
    {
        this.node.active=false
        this.init()
    },
    onLoad () {
        //this.btnAction.active=true
        this.init()
    },
    init:function()
    {
        
        this.countdown1=180
        this.countdown2=60*3
        this.m_btnClose.node.active=false
        this.m_adver.active=false
    },

    start () {

    },

    update (dt) {
        //第一个倒计时
        if(this.m_adver.active==false)
        {
            this.countdown1--
            if(this.countdown1%60==1 && this.m_btnAction.active==true)
            {
                this.m_timer1.string=Math.floor(this.countdown1/60)+''
            }
        }
        //第二个倒计时
        else if(this.m_adver.active=true)
        {
            if(this.countdown2>=-30)
            {
                this.countdown2--
                if(this.countdown2%60==1)
                {
                    this.m_timer2.string=Math.floor(this.countdown2/60)+''
                }
                if(this.countdown2<=0 && this.m_btnClose.node.active==false)
                {
                    this.m_btnClose.node.active=true
                }
            }
        }
        //第一个倒计时放弃了
        if(this.m_adver.active==false && this.countdown1<-30)
        {
            console.log("不看广告")
            this.node.active=false
            gameCtl.ExplodePlane()
            //gameCtl.SetState('STATE_MOVEIN')
        }
    },
});
