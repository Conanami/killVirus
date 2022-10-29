
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    Reset:function()
    {
        this.node.setPosition(cc.v2(-420,400))
    },
    MoveOut:function()
    {
        var _moveTo=cc.moveTo(0.5,cc.v2(-520,400))
        this.node.runAction(_moveTo.easing(cc.easeBackIn()))
    },
    MoveIn:function()
    {
        var _moveTo=cc.moveTo(0.5,cc.v2(-420,400))
        this.node.runAction(_moveTo.easing(cc.easeBounceIn()))
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
