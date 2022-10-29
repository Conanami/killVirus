/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-04-06 09:22:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-07 17:26:39
 */


cc.Class({
    extends: cc.Component,

    properties: {
        m_title:cc.Label,
        m_price:cc.Label,
        m_money:cc.Label,
        m_btnUp:cc.Button
    },

    ctor:function()
    {
        this.m_title_data=[
            "射速",
            "火力",
            "强度",
            "火力",
            "金币价值",
            "日常收益"
        ]
        this.m_pricevalue=1
        this.m_level=1
        this.next_level=this.m_level+1
        this.m_moneyvalue=gDataCtl.getGold()
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    //初始化，取得保存的级别
    init:function(idx)
    {   
        this.m_idx=idx
        switch (this.m_idx) {
            case 0:
                //gDataCtl.AddWeaponSpeed()
                this.m_level=gDataCtl.GetWeaponSpeed()
                this.m_pricevalue=gWeaponDesign[this.GetNexeLevel(this.m_level)].sprice
                break;
            case 1:
                //gDataCtl.AddWeaponPower()
                this.m_level=gDataCtl.GetWeaponPower()
                this.m_pricevalue=gWeaponDesign[this.GetNexeLevel(this.m_level)].pprice
                break;
            case 2:
                this.m_level=gDataCtl.GetSideStrength()
                break;
            case 3:
                this.m_level=gDataCtl.GetSidePower()
                break;
            case 4:
                this.m_level=gDataCtl.GetGoldValue()               
                break;
            case 5:
                this.m_level=gDataCtl.GetGoldDaily()                  
                break;
            default:
                this.m_level=1
                break;
        }
        //this.m_level=gDataCtl.GetWeaponSpeed()
        this.onUpdate()
    },
    //更新显示
    onUpdate:function()
    {
        this.m_title.string=this.m_title_data[this.m_idx]+' Lv['+this.m_level+']'
        this.m_price.string=''+carryBit(this.m_pricevalue)
        this.m_moneyvalue=gDataCtl.getGold()
        this.m_money.string=''+carryBit(this.m_moneyvalue)
        if(this.m_moneyvalue>=this.m_pricevalue)
        {
            this.m_btnUp.enabled=true
            this.m_money.node.color=cc.color(255,255,255)
            this.m_price.node.color=cc.color(255,255,255)
        }else
        {
            this.m_btnUp.enabled=false
            this.m_money.node.color=cc.color(127,127,127)
            this.m_price.node.color=cc.color(255,0,0)
        }
    },
    //获取下一级的数据
    GetNexeLevel(num)
    {
        var nextlevel
        switch (this.m_idx) {
            case 0:
            case 1:
                if(num>=gWeaponDesign.length-1)
                {
                    nextlevel=gWeaponDesign.length-1
                }
                else
                {
                    nextlevel=num+1
                }
                return nextlevel
                break;
        
            default:
                break;
        }
    },
    //点击升级
    onBtnUp:function()
    {
        //this.m_pricevalue+=2
        switch (this.m_idx) {
            case 0:
                gDataCtl.AddWeaponSpeed()
                this.m_level=gDataCtl.GetWeaponSpeed()
                this.m_pricevalue=gWeaponDesign[this.GetNexeLevel(this.m_level)].sprice
                break;
            case 1:
                gDataCtl.AddWeaponPower()
                this.m_level=gDataCtl.GetWeaponPower()
                this.m_pricevalue=gWeaponDesign[this.GetNexeLevel(this.m_level)].pprice
                break;
            case 2:
                gDataCtl.AddSideStrength()
                this.m_level=gDataCtl.GetSideStrength()
                break;
            case 3:
                gDataCtl.AddSidePower()
                this.m_level=gDataCtl.GetSidePower()
                break;
            case 4:
                gDataCtl.AddGoldValue()
                this.m_level=gDataCtl.GetGoldValue()               
                break;
            case 5:
                gDataCtl.AddGoldDaily()
                this.m_level=gDataCtl.GetGoldDaily()                  
                break;
            default:
                break;
        }
        this.onUpdate()
        //更新所有的级别
        gameCtl.UpdateMoney(this.m_pricevalue)
    },
    start () {

    },

    // update (dt) {},
});
