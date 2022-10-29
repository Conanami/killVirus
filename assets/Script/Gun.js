/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-03-29 09:39:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-07 17:21:24
 */


cc.Class({
    extends: cc.Component,

    properties: {
        m_Light:cc.Node,
        m_fireAudio:{
            default:null,
            type:cc.AudioClip
        }
    
    },
    playSound: function () {
        // 调用声音引擎播放声音
        cc.audioEngine.stopAllEffects()
        cc.audioEngine.playEffect(this.m_fireAudio, false);
    },
    // LIFE-CYCLE CALLBACKS:
    ctor:function()
    {
        m_BulletCount=1
    },
    onLoad () {
        
        var seq = cc.sequence(
            cc.scaleTo(0.1,0,0),
            cc.scaleTo(0.1,1,1)
        );
        this.m_Light.runAction(cc.repeatForever(seq));
        
        this.m_Light.active =false;
        //控制射速和火力参数
        this.ResetSpeedPower()
    },
    //重新获得火力与射速
    ResetSpeedPower:function()
    {
        this.m_speedlevel=gDataCtl.GetWeaponSpeed()
        this.m_powerlevel=gDataCtl.GetWeaponPower()
        console.log("射速:"+this.m_speedlevel)
        console.log("火力:"+this.m_powerlevel)
        //控制发射多少子弹
        this.m_BulletCount=gWeaponDesign[this.m_powerlevel].power  
        this.m_speed=gWeaponDesign[this.m_speedlevel].speed 
    },
    start () {

    },
    createCallBack:function(){
        //cc.log('createCallBack');
        
        gameCtl.createBullet(this.m_BulletCount);
        this.playSound()
    },

    //开火，要重新读取武器参数
    BeginFire:function(){
        this.m_Light.active =true;
        this.ResetSpeedPower()
        this.createCallBack();
        //控制射速的地方
        this.schedule(this.createCallBack,1/this.m_speed);
    },
    EndFire:function(){
        this.m_Light.active =false;
        this.unschedule(this.createCallBack);
    },
    SetBulletCount:function(count)
    {
        this.m_BulletCount=count
    }
});
