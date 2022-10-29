

cc.Class({
    extends: cc.Component,

    properties: {
       m_virusPrefab: [cc.Prefab]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        gVirusMaker=this
        this.viruspool=new Array()
        for (var i = 0; i < this.m_virusPrefab.length; i++) {
            this.viruspool[i]=new cc.NodePool()
            
        }
        //var node=cc.instantiate(this.m_virusPrefab[0])
        //node.parent=gameCtl.node
        
        //node.setPosition(cc.v2(0,700))
    },

    //回收病毒资源
    onVirusKilled:function(virus)
    {
        //回收病毒资源到池子
        var _id=virus.id
        //virus.removeFromParent()
        
        this.viruspool[_id].put(virus)
        //onsole.log("回收病毒"+this.viruspool[_id].size())
        gameCtl.minusMonsterHP()
        
    },
    //创建病毒
    createVirus:function(id,hp)
    {
        var virus=null
        if(this.viruspool[id].size()>0)
        {
            virus=this.viruspool[id].get()
            //console.log("还剩:"+this.viruspool[id].size()+"个")
        }else
        {
            virus=cc.instantiate(this.m_virusPrefab[id])
            //bullet.CollType=COLLISION_BULLET
        }
        virus.parent=this.node
        virus.id=id
        var vjs=virus.getComponent('Virus'+id)
        vjs.init(hp)
        return virus
        //virus.setPosition(cc.v2(0,700))
    },

    //所有病毒减速
    pauseAll:function()
    {
        for (var i = 0; i < this.node.children.length; i++) 
        {
            var virus=this.node.children[i]
            for( var j = 0;j < this.m_virusPrefab.length;j++)
            {
                var vjs=virus.getComponent('Virus'+j)
                if(vjs!=null)
                {
                    vjs.pause()
                }
            }
        }
        this.is_pause=true
    },
    //所有病毒恢复速度
    resumeAll:function()
    {
        for (var i = 0; i < this.node.children.length; i++) 
        {
            var virus=this.node.children[i]
            for( var j=0;j<this.m_virusPrefab.length;j++)
            {
                var vjs=virus.getComponent('Virus'+j)
                if(vjs!=null)
                {
                    vjs.resume()
                }
            }
        }
        this.is_pause=false
        
    },
    //开始玩才启动
    MoveOut:function()
    {
        this.node.active=true
        this.begin()
        this.resumeAll()
    },
    MoveIn:function()
    {
        this.node.active=false
    },
    //开始新的一关游戏
    begin:function()
    {
        //本关看广告次数清零
        gAdTimes=0
        //得到当前关卡
        this.level=gDataCtl.GetLevel()%gLevelDesign.length
        //得到本关总血量
        
        // if(this.level>=gLevelDesign.length)
        // {
        //     gDataCtl.SetLevel(1)
        //     this.level=gDataCtl.GetLevel()
        // }
        console.log("现在到底第几关"+this.level)
        this.levelhp=gLevelDesign[this.level].hp
        
        gLevelHp=this.levelhp
        //本关可玩病毒
        this.virustype=gLevelDesign[this.level].virus
        //出怪计数器，用来控制出怪速度
        this.count=0
        //是否被暂停了
        this.is_pause=false
    },
    //得到活着的病毒数量
    GetVirusCount:function()
    {
        var cnt=0
        for (var i = 0; i < this.node.children.length; i++) 
        {
            var virus=this.node.children[i]
            for( var j=0;j<this.m_virusPrefab.length;j++)
            {
                var vjs=virus.getComponent('Virus'+j)
                if(vjs!=null)
                {
                    cnt++
                }
            }
        }
        return cnt
    },

    update (dt) {
        if(!this.is_pause)
        {
            this.count++
            //出怪速度调节
            var maketime=gLevelDesign[this.level].maketime
            
            if(this.count%(60*maketime)==0 && this.levelhp>0)
            {
                //随机取一种病毒
                var id = this.virustype[random(0,gLevelDesign[this.level].virus.length-1)]
                var hp = random(gLevelDesign[this.level].minHp,gLevelDesign[this.level].maxHp)
                this.createVirus(id,hp)
                this.levelhp-=hp
            }
        }
    },
});
