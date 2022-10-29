/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-03-26 08:17:14
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-08 17:57:19
 */

cc.Class({
    extends: cc.Component,

    properties: {
       m_Light:[cc.Node],
       m_tail:cc.Node,
       m_Gun:cc.Node,
       m_jitou:cc.Node,
       m_collision:cc.Collider,
       m_explodeanim:cc.Animation,
       m_body:cc.Node,
       m_bodysprite:cc.Sprite,
       m_leftsprite:cc.Sprite,
       m_rightsprite:cc.Sprite,
       m_planelist:[cc.SpriteFrame],
       m_subWeapon:[cc.Node]
    },

    Play:function()
    {
        this.node.setPosition(cc.v2(0,-1000))
        this.node.setScale(0.8)
        this.m_tail.setScale(1.2)
        var move=cc.moveTo(1,0,-385)
        var scaleto=cc.scaleTo(0.5,1)
        var seq=cc.sequence(move,scaleto)
        this.node.runAction(seq)

        var seq2=cc.sequence(
            cc.delayTime(1),
            cc.scaleTo(0.5,0.8)
        )
        this.m_tail.runAction(seq2)
    },
    Reset:function()
    {
        
    },
    MoveOut:function()
    {
        console.log("怎么突然变这么小？")
        var scaleto=cc.scaleTo(0.5,0.8)
        this.node.runAction(scaleto)
        this.m_tail.runAction(cc.scaleTo(0.5,1.2))
    },

    MoveIn:function()
    {
        console.log('重新飞进来')
        this.m_body.active=true
        this.m_body.opacity=255
        this.m_explodeanim.node.active=false
        var scaleto=cc.scaleTo(0.5,0.8)
        this.node.runAction(scaleto)
        this.m_tail.runAction(cc.scaleTo(0.5,1))
        //this.Play()
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_Gun=this.m_Gun.getComponent('Gun')
        for (let i = 0; i < this.m_Light.length; i++) {
            
            var seq=cc.sequence(
                cc.delayTime(i*0.2),
                cc.scaleTo(0.4,1),
                cc.callFunc(function(target)
                {
                    target.setScale(0,0)
                }.bind(this)),
                cc.delayTime(0.5)
                )
            this.m_Light[i].runAction(cc.repeatForever(seq))
            
        }
        for (var i = 0; i < this.m_subWeapon.length; i++) {
            if(i!=6)
            {
                this.m_subWeapon[i].active=false
            }
            else
            {
                this.m_subWeapon[i].active=true
            }
        }
    },
    //更换飞机
    ChangePlane:function(idx)
    {
        this.m_idx=idx
        this.m_bodysprite.spriteFrame=this.m_planelist[idx]
        //this.m_leftsprite.spriteFrame=this.m_leftwinglist[idx]
        //this.m_rightsprite.spriteFrame=this.m_rightwinglist[idx]
        for (var i = 0; i < this.m_subWeapon.length; i++) {
            if(i!=idx)
            {
                this.m_subWeapon[i].active=false
            }
            else
            {
                this.m_subWeapon[i].active=true
            }
        }
    },
    //发生碰撞
    onCollisionEnter:function(other,self)
    {
        //console.log("other"+other.tag)
        //console.log("self"+self.tag)
        //console.log("装上病毒了")  
        if(other.tag==COLLISION_VIRUS && self.tag==3)
        {
            this.die()
            
        }
    },
    die:function()
    {
        console.log("飞机死了！！")
        //鸡头闪三下红色
        this.JitouFlash()
        //波纹变成血色，好惨
        this.EndFire()
        this.SetLightColor(new cc.color(255,100,100))
        this.scheduleOnce(
            function()
            {
                this.SetLightColor(new cc.color(255,255,255))
                gameCtl.SetBlackBg(true)
            }.bind(this),1.5)
        gameCtl.gameOver()
    },

    //飞机爆炸
    explode:function()
    {   
        var seq=cc.spawn(
            cc.scaleTo(0.5,1),
            cc.fadeOut(0.5,0)
        )
        this.m_body.runAction(seq)
        this.m_explodeanim.node.active=true
        this.m_explodeanim.play()
    },
    
    //飞机复活
    Revive:function()
    {
        this.node.setPosition(cc.v2(0,-400))
        this.m_collision.tag=1
    },
    //飞机恢复会死的状态
    SetCollisionTag:function(num)
    {
        this.m_collision.tag=num
    },
    //鸡头闪
    JitouFlash:function()
    {
        var oneaction=cc.sequence(
            cc.tintTo(0.3,cc.color(255,0,0)),
            cc.tintTo(0.3,cc.color(255,255,255))
        )
        var seq=cc.repeat(oneaction,3)
        this.m_jitou.runAction(seq)
    },
    //前方的闪光颜色
    SetLightColor(color)
    {
        for (let i = 0; i < this.m_Light.length; i++) {
            this.m_Light[i].color= color
        }
    },
    start () {

    },

    BeginFire:function(){
        this.m_Gun.BeginFire();
    },
    EndFire:function(){
        this.m_Gun.EndFire();
    }
    // update (dt) {},
});
