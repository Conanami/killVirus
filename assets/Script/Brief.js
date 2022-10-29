/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-04-04 14:34:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-05 14:09:08
 */


cc.Class({
    extends: cc.Component,

    properties: {
        m_lblGold:cc.Label,
        m_lblAd: cc.Label,
        m_lucky:cc.Node,
        m_btnGold:cc.Button,
        m_btnAd:cc.Button
    },

    // LIFE-CYCLE CALLBACKS:
    ShowBrief:function()
    {
        this.node.active=true
        gameCtl.m_touchcover.active=false
        gLevelHp=gLevelDesign[gDataCtl.GetLevel()%gLevelDesign.length].hp
        this.m_lblAd.string=10*gAdTimes+''
        this.goldcnt=gLevelHp
        this.showcnt=0
        if( random(0,10)>4)
        {
            this.m_lucky.active=true
            this.goldcnt=gLevelHp*10
            this.award=gLevelHp*10+10*gAdTimes
        }
        else
        {
            this.m_lucky.active=false
            this.goldcnt=gLevelHp
            this.award=gLevelHp+10*gAdTimes
        }
    },
    //Bind Button
    BindButton:function()
    {
        this.m_btnAd.node.on('click', this.OnClickGetAd, this);
        this.m_btnGold.node.on('click', this.OnClickGetGold, this)
    },
    //unbind Button
    UnBindButton:function()
    {
        this.m_btnAd.node.off('click', this.OnClickGetAd, this);
        this.m_btnGold.node.off('click', this.OnClickGetGold, this)
    },
    //Reset Label
    ResetLabel:function()
    {
        console.log("清零吧")

        this.m_lblAd.string='0'
        this.m_lblGold.string='0'
    },  
    // onLoad () {},
    OnClickGetGold:function()
    {
        this.ResetLabel()
        this.UnBindButton()
        gameCtl.createGoldAnim(cc.v2(-166,148),
            cc.v2(-240,600),
            100,
            (Math.ceil(this.award/20)>18?18:Math.ceil(this.award/20)),
            this.award,
            2,
            function(gold){
                gameCtl.onGoldCollected(this.award);
            }.bind(this))

        var seq=cc.sequence(
                cc.delayTime(2),
                cc.callFunc(function(){
                    gameCtl.NextLevel()
                }.bind(this))
        )
        this.node.runAction(seq)
        //this.node.active=false
    },
    OnClickGetAd:function()
    {
        this.ResetLabel()
        this.UnBindButton()
        gameCtl.createGoldAnim(cc.v2(-166,13),
            cc.v2(-240,600),
            100,
            (Math.ceil(this.award/20)>18?18:Math.ceil(this.award/20)),
            this.award,
            2,
            function(gold){
                gameCtl.onGoldCollected(this.award);
            }.bind(this))
        var seq=cc.sequence(
                cc.delayTime(2),
                cc.callFunc(function(){
                    gameCtl.NextLevel()
                }.bind(this))
        )
        this.node.runAction(seq)
        //this.node.active=false
    },
    start () {

    },

    update (dt) {
        this.showcnt+=this.goldcnt*dt
        if(this.showcnt<this.goldcnt)
        {
            this.m_lblGold.string=Math.ceil(this.showcnt)+""
        }
        else if(this.showcnt<=this.goldcnt*(1+2*dt))
        {
            this.m_lblGold.string=Math.ceil(this.goldcnt)
            this.BindButton()
        }
    },
});
