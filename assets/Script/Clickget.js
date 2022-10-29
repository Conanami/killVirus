/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-03-25 19:27:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-07 16:52:46
 */
var data=require("data")

cc.Class({
    extends: cc.Component,

    properties: {
        m_progress:cc.ProgressBar,
        m_labelgold:cc.Label,
        datactl:{
            default:null,
            type:data
        }
    },

    //构建函数
    ctor:function()
    {
        
    },
    // LIFE-CYCLE CALLBACKS:
    UpdateData:function()
    {
        this.m_labelgold.string=carryBit(this.datactl.GetTaskGold())
    },
    // onLoad () {},
    Reset:function()
    {
        this.node.setPosition(cc.v2(368,32))
        this.UpdateData()
    },
    MoveOut:function()
    {
        var _moveTo=cc.moveTo(0.5,cc.v2(568,32))
        this.node.runAction(_moveTo.easing(cc.easeBackIn()))
    },
    MoveIn:function()
    {
        var _moveTo=cc.moveTo(0.5,cc.v2(368,32))
        this.node.runAction(_moveTo.easing(cc.easeBounceIn()))
    },
    onClickGet:function()
    {
        if(this.datactl.GetTaskGold()>0)
        {
            this.m_labelgold.string=0
            //测试进位用
            //this.datactl.SetGoldAward(5)
            
            gameCtl.createGoldAnim(
                cc.v2(350,-50),
                cc.v2(-370,736),
                300,
                12,
                gDataCtl.GetTaskGold(),
                1,
                function(gold){
                    gDataCtl.SetTaskGold(0)
                    gameCtl.onGoldCollected(gold);
                }.bind(this)
            )
            this.m_progress.progress=0
        }
        
    },

    start () {

    },

    update (dt) {
        var time=this.datactl.GetGoldAddTime()
        var prog=1/time
        this.m_progress.progress+=dt*prog
        if(this.m_progress.progress>=1)
        {
            this.m_progress.progress=0
            var gold=this.datactl.GetGoldAward()
            this.datactl.SetTaskGold(this.datactl.GetTaskGold()+gold)
            //显示数字，用进位方式
            this.UpdateData()
        }
    },
});
