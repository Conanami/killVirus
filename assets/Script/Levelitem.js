
cc.Class({
    extends: cc.Component,

    properties: {
        m_boss:cc.Node,
        m_number:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.b_boss=false
        this.m_boss.active=false
        //this.m_number.string=0
    },
    setLevel:function(num)
    {
        if(num<=0)
        {
            this.node.active=false
            return
        }
        this.m_number.string=num
    },
    setBoss:function(isShow)
    {
        this.m_boss.active=isShow
    },
    start () {

    },

    // update (dt) {},
});
