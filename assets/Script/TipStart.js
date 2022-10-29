

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    Play:function()
    {
        var rot=cc.rotateTo(0.3,15)
        var rot2=cc.rotateTo(0.5,-15)
        var rot3=cc.rotateTo(0.5,15)
        var rot4=cc.rotateTo(0.3,0)
        var seq=cc.sequence(rot,rot2,rot3,rot4)
        var dly=cc.delayTime(1)
        var seq2=cc.sequence(seq,seq,dly)
        this.node.runAction(cc.repeatForever(seq2))
    },
    Reset:function()
    {
        this.node.setPosition(cc.v2(0,0))
        this.node.runAction(cc.fadeIn(0.5))
        this.node.angle=0
    },
    MoveOut:function()
    {
        var _moveTo=cc.fadeOut(0.5)
        this.node.runAction(_moveTo.easing(cc.easeBackIn()))
    },
    MoveIn:function()
    {
        var _moveTo=cc.fadeIn(0.5)
        this.node.runAction(_moveTo.easing(cc.easeBounceIn()))
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
