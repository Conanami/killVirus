
cc.Class({
    extends: cc.Component,

    properties: {
      
    
    },
    ctor:function()
    {
        this.gLevelDesign=[
            {hp:300,virus:[0],minHp:3,maxHp:60,maketime:0.6},
            {hp:100,virus:[0],minHp:1,maxHp:20,maketime:1},
            {hp:150,virus:[0],minHp:3,maxHp:30,maketime:0.8},
            {hp:200,virus:[0],minHp:3,maxHp:40,maketime:0.8},
            {hp:250,virus:[0],minHp:3,maxHp:50,maketime:0.7},
            {hp:300,virus:[0],minHp:3,maxHp:60,maketime:0.6},
            {hp:400,virus:[0],minHp:1,maxHp:20,maketime:0.5},
            {hp:450,virus:[0],minHp:3,maxHp:30,maketime:0.4},
            {hp:500,virus:[0],minHp:3,maxHp:40,maketime:0.3},
            {hp:550,virus:[0],minHp:3,maxHp:50,maketime:0.25},
            {hp:600,virus:[0],minHp:3,maxHp:60,maketime:0.2}
        ]
        
    },
    save:function()
    {
        var str = JSON.stringify(gData)
        //cc.log("whatis"+obj)
        cc.sys.localStorage.setItem('userData', str);
    },
    load:function()
    {
        var str= cc.sys.localStorage.getItem('userData');
        gData=JSON.parse(str)
        if( gData==null )
        {
            gData={}
        }
        
        
    },

    clear:function()
    {
        cc.sys.localStorage.removeItem('userData');
    },

    //加金币
    addGold:function(num)
    {
        if ( gData.m_goldcnt==null )
        {
            gData.m_goldcnt=0
        }
        gData.m_goldcnt+=num
        this.save()
    },
    //减金币
    MinusGold:function(num)
    {
        if ( gData.m_goldcnt==null )
        {
            gData.m_goldcnt=0
        }
        gData.m_goldcnt-=num
        this.save()
    },
    //金币全部清空
    SetGold:function(num)
    {
        gData.m_goldcnt=num
        this.save()
    },

    //取金币值
    getGold:function()
    {
        if ( gData.m_goldcnt==null )
        {
            gData.m_goldcnt=0
        }
        return gData.m_goldcnt
    },
    //设置获取金币时间
    SetGoldAddTime:function(num)
    {
        if ( num<=0 )
        {
            gData.m_goldAddTime=3
        }
        else
        {
            gData.m_goldAddTime=num
        }
        this.save()
    },
    //得到获取金币时间
    GetGoldAddTime:function()
    {
        if ( gData.m_goldAddTime==null )
        {
            gData.m_goldAddTime=3
        }
        return gData.m_goldAddTime
    },

    //设置奖励数量
    SetGoldAward:function(num)
    {
        if ( num<=0 )
        {
            gData.m_goldaward=7
        }
        else
        {
            gData.m_goldaward=num
        }
        this.save()
    },
    //得到奖励数量
    GetGoldAward:function()
    {
        if ( gData.m_goldaward==null )
        {
            gData.m_goldaward=3
        }
        return gData.m_goldaward
    },
    
    //累增待领金币
    SetTaskGold:function(gold)
    {
        if ( gData.m_taskgold==null )
        {
            gData.m_taskgold=0
        }
        gData.m_taskgold=uncarryBit(gold)
        this.save()
    },

    //得到待领金币
    GetTaskGold:function()
    {
        if ( gData.m_taskgold==null )
        {
            gData.m_taskgold=0
        }
        return gData.m_taskgold
    },

    //增加关卡
    AddLevel:function()
    {
        if ( gData.m_levelnum==null )
        {
            gData.m_levelnum=0
        }
        gData.m_levelnum++
        this.save()
    },
    //设置关卡
    SetLevel:function(num)
    {
        gData.m_levelnum=num
        this.save()
    },
    //得到关卡，默认是1
    GetLevel:function()
    {
        if ( gData.m_levelnum==null )
        {
            gData.m_levelnum=1
        }
        return gData.m_levelnum
    },

    //0.增加武器射速
    AddWeaponSpeed:function()
    {
        if ( gData.m_weaponspeed==null )
        {
            gData.m_weaponspeed=1
        }
        gData.m_weaponspeed++
        this.save()
    },
    //0,设置武器射速
    SetWeaponSpeed:function(num)
    {
        gData.m_weaponspeed=num
        this.save()
    },
    //0,得到武器射速
    GetWeaponSpeed:function()
    {
        if ( gData.m_weaponspeed==null )
        {
            gData.m_weaponspeed=1
        }
        if(gData.m_weaponspeed>=gWeaponDesign.length)
        {
            gData.m_weaponspeed=gWeaponDesign.length-1
        }
        return gData.m_weaponspeed

    },

    //1,增加武器火力
    AddWeaponPower:function()
    {
        if ( gData.m_weaponpower==null )
        {
            gData.m_weaponpower=1
        }
        gData.m_weaponpower++
        this.save()
    },
    //1,设置武器火力
    SetWeaponPower:function(num)
    {
        gData.m_weaponpower=num
        this.save()
    },
    //1,得到武器火力
    GetWeaponPower:function()
    {
        if ( gData.m_weaponpower==null )
        {
            gData.m_weaponpower=1
        }
        if(gData.m_weaponpower>=gWeaponDesign.length)
        {
            gData.m_weaponpower=gWeaponDesign.length-1
        }
        return gData.m_weaponpower
    },

    //2，增加副武器强度
    AddSideStrength:function()
    {
        if ( gData.m_sidestrength==null )
        {
            gData.m_sidestrength=1
        }
        gData.m_sidestrength++
        this.save()
    },
    //2，设置副武器强度
    SetSideStrength:function(num)
    {
        gData.m_sidestrength=num
        this.save()
    },
    //2，得到副武器强度
    GetSideStrength:function()
    {
        if ( gData.m_sidestrength==null )
        {
            gData.m_sidestrength=1
        }
        return gData.m_sidestrength
    },

    //3，增加副武器火力
    AddSidePower:function()
    {
        if ( gData.m_sidepower==null )
        {
            gData.m_sidepower=1
        }
        gData.m_sidepower++
        this.save()
    },
    //3，设置副武器火力
    SetSidePower:function(num)
    {
        gData.m_sidepower=num
        this.save()
    },
    //3，得到副武器火力
    GetSidePower:function()
    {
        if ( gData.m_sidepower==null )
        {
            gData.m_sidepower=1
        }
        return gData.m_sidepower
    },

    //4，增加金币价值
    AddGoldValue:function()
    {
        if ( gData.m_goldvalue==null )
        {
            gData.m_goldvalue=1
        }
        gData.m_goldvalue++
        this.save()
    },
    //4，设置金币价值
    SetGoldValue:function(num)
    {
        gData.m_goldvalue=num
        this.save()
    },
    //4，得到金币价值
    GetGoldValue:function()
    {
        if ( gData.m_goldvalue==null )
        {
            gData.m_goldvalue=1
        }
        return gData.m_goldvalue
    },

    //5，增加日常收入
    AddGoldDaily:function()
    {
        if ( gData.m_golddaily==null )
        {
            gData.m_golddaily=1
        }
        gData.m_golddaily++
        this.save()
    },
    //5，设置日常收入
    SetGoldDaily:function(num)
    {
        gData.m_golddaily=num
        this.save()
    },
    //5，得到日常收入
    GetGoldDaily:function()
    {
        if ( gData.m_golddaily==null )
        {
            gData.m_golddaily=1
        }
        return gData.m_golddaily
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    //cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
    //JSON.parse()字符串转对象
    // update (dt) {},
});

