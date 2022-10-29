/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-03-30 09:21:54
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-05 14:18:11
 */

cc.Class({
    extends: cc.Component,

    properties: {
        m_gold:cc.Label,
        m_tiphp:cc.Label,
        m_proghp:cc.ProgressBar,
        m_goldnode:cc.Node
    },
    getGoldnode()
    {
        return this.m_goldnode
    },
    Reset:function()
    {
        this.node.setPosition(cc.v2(0,618))
        this.node.opacity=0
        this.m_gold.string='0'
        this.m_tiphp.string='100%'
        this.m_proghp.progress=1
        //this.UpdateData()
    },
    Play:function()
    {

    },
    MoveOut:function()
    {
        this.node.runAction(cc.fadeIn(0.5))
        this.ShowGold()
    },
    MoveIn:function()
    {
        this.node.runAction(cc.fadeOut(0.5))
    },
    //展示金币数量
    ShowGold:function()
    {
        this.m_gold.string=carryBit(gDataCtl.getGold())
    },

    //设置关卡血量，同时根据剩余的病毒数量与血量判断
    setMonsterHp:function(hpnum,vnum)
    {
        if(hpnum<0.01 && vnum>0)
        {
            hpnum=0.01
        }
        else if(vnum<=0 && hpnum<=0.01)
        {
            hpnum=0
            //如果到0了，则停几秒，通知gameCtl执行下一步
            //1，播放过关动画
            //2，回到过关页面
            //3，过一关
            var seq=cc.sequence(
                cc.delayTime(1),
                cc.callFunc(function(){
                    //过关要先看到自己赚钱
                    gameCtl.ShowBrief()
                    //gameCtl.NextLevel()
                }.bind(this))
            )
            this.node.runAction(seq)
        }
        this.m_tiphp.string=Math.ceil(hpnum*100)+'%'
        this.m_proghp.progress=hpnum
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
