/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-04-08 15:10:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-08 17:00:42
 */


cc.Class({
    extends: cc.Component,

    properties: {
        m_spritelist:[cc.SpriteFrame],
        m_sprite:cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init:function(idx)
    {
        //console.log('有没有执行初始化')
        this.m_idx=idx
        this.m_sprite.spriteFrame=this.m_spritelist[idx]
    },

    onClickChoose:function(target)
    {
        if(target.isChecked)
        {
            gameCtl.ChangePlane(this.m_idx)
        }
        else
        {
            gameCtl.ChangePlane(6)
        }
    }
    // update (dt) {},
});
