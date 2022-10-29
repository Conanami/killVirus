
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    Play:function()
    {
        var _moveTo=cc.scaleTo(0.5,1.2,1.2)
        var _dly=cc.delayTime(1)
        var _seq=cc.sequence(_dly,_moveTo)
        this.node.runAction(_seq)
    },

    Reset:function()
    {
        //this.node.setPosition(cc.v2(0,0))
        this.node.scale=cc.v2(1,1)
    },
    MoveOut:function()
    {
        var _moveTo=cc.scaleTo(0.5,1,1)
        this.node.runAction(_moveTo)
    },
    MoveIn:function()
    {
        var _moveTo=cc.scaleTo(0.5,1.2,1.2)
        this.node.runAction(_moveTo)
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
