

cc.Class({
    extends: cc.Component,

    properties: {
        m_goldnode:cc.Node,
        m_lblgold:cc.Label
    },
    Reset:function()
    {
        this.node.setPosition(cc.v2(-258,736))
    },
    MoveOut:function()
    {
        var _moveTo=cc.moveTo(0.5,cc.v2(-258,1036))
        this.node.runAction(_moveTo.easing(cc.easeBackIn()))
    },
    MoveIn:function()
    {
        var _moveTo=cc.moveTo(0.5,cc.v2(-258,736))
        this.node.runAction(_moveTo.easing(cc.easeBounceIn()))
    },
    ShowGold:function()
    {
        this.m_lblgold.string=carryBit(gDataCtl.getGold())
    },
    SetGold:function(num)
    {
        this.m_lblgold.string=carryBit(num)
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    getGoldnode()
    {
        return this.m_goldnode
    }
    // update (dt) {},
});
