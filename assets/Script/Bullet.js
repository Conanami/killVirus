/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-03-29 09:33:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-02 15:20:28
 */
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       m_speed:1000
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    //发生碰撞
    onCollisionEnter:function(other,self)
    {
        //console.log("other"+other.tag)
        //console.log("self"+self.tag)
        
        if(other.tag==COLLISION_WALL)
        {
            gameCtl.onBulletKilled(this.node)
        }
        if(other.tag==COLLISION_VIRUS)
        {
            gameCtl.onBulletKilled(this.node)
        }
    },
    pause()
    {
        this.m_speed=0
    },
    resume()
    {
        this.m_speed=1000
    },
    update (dt) {
        var y = this.node.y;
        y += this.m_speed*dt;
        this.node.y = y;

        if( y > 920 ){
            gameCtl.onBulletKilled(this.node);
        }
    },
    
});
