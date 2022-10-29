/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-03-25 19:44:26
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-08 16:23:52
 */


cc.Class({
    extends: cc.Component,

    properties: {
        m_weapon:cc.Toggle,
        m_side:cc.Toggle,
        m_gold:cc.Toggle,
        m_container:cc.Node,
        m_subWeaponPrefab:cc.Prefab,
        
        m_bottomItemPrefab:cc.Prefab,
        m_bottomitem:[cc.Node]
    },

    Reset:function()
    {
        this.node.setPosition(cc.v2(0,-748))
    },
    MoveOut:function()
    {
        var _moveTo=cc.moveTo(0.5,cc.v2(0,-1548))
        this.node.runAction(_moveTo.easing(cc.easeBackIn()))
    },
    MoveIn:function()
    {
        if(this.m_gold.isChecked || this.m_weapon.isChecked || this.m_side.isChecked)
        {
            this.m_gold.isChecked=false
            this.m_weapon.isChecked=false
            this.m_side.isChecked=false
        }
        var _moveTo=cc.moveTo(0.5,cc.v2(0,-748))
        this.node.runAction(_moveTo.easing(cc.easeBounceIn()))
        gameCtl.UpdateMoney(0)
        //this.PlaneMove()
    },
    //点击了下面的升级按钮
    onClickLevelUp:function(target,data)
    {
        console.log(target.node.name)
        this.PlaneMove()
        gameCtl.UpdateMoney(0)
        var tname=target.node.name
        switch (tname) {
            case 'Weapon':
                if(target.isChecked)
                    console.log("升级武器")
                break;
            case 'Side':
                if(target.isChecked)
                    console.log("升级边")
                break;
            case 'Gold':
                if(target.isChecked)
                    console.log("升级金币")
                break;
            default:
                break;
        }
    },
    
    PlaneMove:function()
    {
        if(this.m_gold.isChecked || this.m_weapon.isChecked || this.m_side.isChecked)
        {
            //console.log("plane go up!")
            gameCtl.PlaneMoveUp()
        }
        else
        {
            //console.log("plane go down!")
            gameCtl.PlaneMoveDown()
        }
    },
  
    // 
    onLoad () {

        //把下面的升级item都装上
        for (var i = 0; i < this.m_bottomitem.length; i++) {
            var node=cc.instantiate(this.m_bottomItemPrefab)
            node.parent=this.m_bottomitem[i]
            var itemjs=node.getComponent('BottomItem')
            itemjs.init(i)
        }
        this.subweaponjs_list=new Array()
        for( var i=0;i<6;i++)
        {
            var node=cc.instantiate(this.m_subWeaponPrefab)
            node.parent=this.m_container
            var subweaponjs=node.getComponent('SubWeapon')
            this.subweaponjs_list.push(subweaponjs)
            subweaponjs.init(i)
        }
        
        

    },

    //更新所有item的金币数
    UpdateMoneyOfItem:function()
    {
        for (var i = 0; i < this.m_bottomitem.length; i++) {
            var node=this.m_bottomitem[i].children[0]
            //console.log(node)
            var itemjs=node.getComponent('BottomItem')
            itemjs.onUpdate()
        }
    },

    start () {

    },

    // update (dt) {},
});
