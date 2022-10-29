

cc.Class({
    extends: cc.Component,

    properties: {
      m_anim:[cc.Node]
    },
    //激光发射
    callback0:function()
    {
      //cc.log("0播放完毕")
      var scale=cc.scaleTo(0.5,1)
      var callF=cc.callFunc(this.callback1.bind(this))
      var allseq=cc.sequence(scale,callF)
      this.m_anim[1].runAction(allseq)

      // var seq=cc.sequence(cc.fadeOut(0.2),cc.fadeIn(0.2))
      // this.m_anim[1].runAction(seq.repeatForever)
      this.flashLong(this.m_anim[0])
    },
    //一直闪
    flashLong:function(node)
    {
      var _out=cc.fadeOut(0.2)
      var _in =cc.fadeIn(0.2)
      var _seq=cc.sequence(_out,_in)
      node.runAction(_seq.repeatForever())
    },

    //两个病毒飞出去
    callback1:function(){
      //cc.log("1播放完毕")
      var moveTo2=cc.moveTo(0.3,cc.v2(433,183))
      var scale2=cc.scaleTo(0.3,1)
      var spawn2=cc.spawn(moveTo2,scale2)
      this.m_anim[2].runAction(spawn2)

      var moveTo3=cc.moveTo(0.3,cc.v2(451,-30))
      var scale3=cc.scaleTo(0.3,1)
      var spawn3=cc.spawn(moveTo3,scale3)
      var callF=cc.callFunc(this.callback2.bind(this))
      var seq=cc.sequence(spawn3,callF)
      this.m_anim[3].runAction(seq)

      this.flashLong(this.m_anim[1])
    },

    callback2:function()
    {
      var js=this.m_anim[2].getComponent('LogoVirus')
      js.init(60)
      js.Begin()
      var js2=this.m_anim[3].getComponent('LogoVirus')
      js2.init(40)
      js2.Begin()
    },

    //重置所有节点并停止动画
    Reset:function()
    {
      this.node.setPosition(0,0)
      this.m_anim.forEach(function(v){
        v.stopAllActions()
        v.opacity=255
      })

      this.m_anim[2].setScale(cc.v2(0.2,0.2))
      this.m_anim[2].setPosition(cc.v2(273,40))
      this.m_anim[2].getComponent('LogoVirus').reset()
      this.m_anim[3].setScale(cc.v2(0.2,0.2))
      this.m_anim[3].setPosition(cc.v2(263,34))
      this.m_anim[3].getComponent('LogoVirus').reset()
      this.m_anim[1].setScale(cc.v2(0,1))
   
    },
    //开始页面动画
    Play:function()
    {
        this.Reset()
        this.node.setPosition(cc.v2(0,0))
        var seq=cc.sequence(cc.fadeOut(0.2),cc.fadeIn(0.2))
        var callF=cc.callFunc(this.callback0.bind(this))
        var allseq=cc.sequence(seq.repeat(3),callF)
        this.m_anim[0].runAction(allseq)
    },

    //移出
    MoveOut:function()
    {
      //this.node.setPosition(cc.v2(0,0))
      this.node.runAction(cc.moveTo(0.5,cc.v2(0,960)).easing(cc.easeBackIn()))
    },

    //移入
    MoveIn:function()
    {
      this.node.runAction(cc.moveTo(0.5,cc.v2(0,0)).easing(cc.easeCubicActionInOut()))
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    //start () {},

    // update (dt) {},
});
