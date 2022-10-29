var data=require("data")

cc.Class({
    extends: cc.Component,

    properties: {
        m_Logo:cc.Node,
        m_level:cc.Node,
        m_top:cc.Node,
        m_setting:cc.Node,
        m_click:cc.Node,
        m_bottom:cc.Node,
        m_tip:cc.Node,
        m_bg:cc.Node,
        m_plane:cc.Node,
        m_goldprefab:cc.Prefab,
        m_touchcover:cc.Node,
        m_bulletprefab:cc.Prefab,
        m_monsterhp:cc.Node,
        m_virusmaker:cc.Node,
        
        m_revive:cc.Node,
        m_bulletlayer:cc.Node,
        m_brief:cc.Node,

        
    },
    //构建函数
    ctor:function()
    {
        gDataCtl=new data()
        //gDataCtl.clear()
        gDataCtl.load()
        //gDataCtl.SetGold(0)
        gLevelDesign=gDataCtl.gLevelDesign
        
        this.m_classArray=new Array()
        this.goldpool=new cc.NodePool()
        this.bulletpool=new cc.NodePool()
        this.viruspool=new cc.NodePool()
        
        
        //console.log(gWeaponDesign)
    },
    //换飞机
    ChangePlane:function(idx)
    {
        this.planeautojs.ChangePlane(idx)
    },
    //更新所有需要显示钱数的地方
    //对外接口大写，本地用，或者系统默认的小写
    UpdateMoney:function(num)
    {
        //把上面的钱数升级
        if(num==null) num=0
        gDataCtl.MinusGold(num)
        this.topjs.ShowGold()
        //把下面的item钱数都升级
        this.bottomjs.UpdateMoneyOfItem()
    },
    //看到过关画面
    ShowBrief:function()
    {
        this.planeautojs.EndFire()
        this.m_touchcover.active=false
        this.m_brief.getComponent('Brief').ShowBrief()
    },
    //得到子弹
    createBullet:function(count)
    {
        for (let i = 0; i < count; i++) {
            
            var bullet=null
            if(this.bulletpool.size()>0)
            {
                bullet=this.bulletpool.get()
                //console.log("还剩:"+this.bulletpool.size()+"个")
            }else
            {
                bullet=cc.instantiate(this.m_bulletprefab)
                bullet.CollType=COLLISION_BULLET
            }
            bullet.parent=this.m_bulletlayer

            var pos=this.m_plane.getPosition()
            pos.y+=140
            var firewidth=this.m_plane.width>(bullet.width-20)*count?this.m_plane.width:(bullet.width-20)*count
            pos.x+=-firewidth/2+(i+0.5)*firewidth/count
            
            bullet.setPosition(pos)
        }
    },

    
    // LIFE-CYCLE CALLBACKS:

    //回收子弹资源到池子
    onBulletKilled:function(bullet)
    {
        this.bulletpool.put(bullet)
        //console.log("回收后子弹池还有"+this.bulletpool.size()+"个")
    },

    onLoad () {
        //开启碰撞
        cc.director.getCollisionManager().enabled=true
        //cc.director.getCollisionManager().enabledDebugDraw=true
        //cc.director.getCollisionManager().enabledDrawBoundingBox=true
        //全局的
        gameCtl=this
        

        this.logojs=this.m_Logo.getComponent('Logo')
        this.logojs.Play()
        this.m_classArray.push(this.logojs)
        this.leveljs=this.m_level.getComponent('LevelDesign')
        this.m_classArray.push(this.leveljs)
        this.topjs=this.m_top.getComponent('Top')
        this.m_classArray.push(this.topjs)
        //要改的地方要注意，4个地方
        this.setjs=this.m_setting.getComponent('Setting')
        this.m_classArray.push(this.setjs)
        //要改的地方要注意，4个地方
        this.clickjs=this.m_click.getComponent('Clickget')
        this.m_classArray.push(this.clickjs)
        //要改的地方要注意，4个地方
        this.bottomjs=this.m_bottom.getComponent('Bottom')
        this.m_classArray.push(this.bottomjs)
        //要改的地方要注意，4个地方
        this.tipjs=this.m_tip.getComponent('TipStart')
        this.m_classArray.push(this.tipjs)
        //要改的地方要注意，4个地方
        this.bgjs=this.m_bg.getComponent('BG')
        this.m_classArray.push(this.bgjs)
        
        //要改的地方要注意，4个地方
        this.planeautojs=this.m_plane.getComponent('AirAutoPlay')
        this.m_classArray.push(this.planeautojs)

        //要改的地方要注意，4个地方
        this.monsterhpjs=this.m_monsterhp.getComponent('MonsterHP')
        this.m_classArray.push(this.monsterhpjs)

        //要改的地方要注意，4个地方
        this.virusmakerjs=this.m_virusmaker.getComponent('VirusMaker')
        this.m_classArray.push(this.virusmakerjs)

        //要改的地方要注意，4个地方
        this.revivejs=this.m_revive.getComponent('Revive')
        this.m_classArray.push(this.revivejs)
        //载入金币数
        this.topjs.SetGold(gDataCtl.getGold())
        
        //开玩动画
        for (var i = 0; i < this.m_classArray.length; i++) {
            if(this.m_classArray[i].Play!=null)
            {
                this.m_classArray[i].Play()
            }
        }

       
        
        this.scheduleOnce(function(){
            this.m_touchcover.active=true
        }.bind(this),1.5)
        
        //this.createBullet(this.node)
        
    },
    //飞机开火
    StartFire:function()
    {
        this.ResumeBullet()
        this.planeautojs.BeginFire()
    },
    //飞机停火
    EndFire:function()
    {
        this.planeautojs.EndFire()
    },  

    //移动飞机
    moveAirplane:function(pos)
    {
        var curpos=this.m_plane.getPosition()
        var _x=0,_y=0
        //不走出边界
        if(curpos.x+pos.x>this.m_bg.width/2)
        {
            _x = this.m_bg.width/2-this.m_plane.width/2;
        }else if(curpos.x+pos.x<-this.m_bg.width/2)
        {
            _x = -this.m_bg.width/2+this.m_plane.width/2;
        }
        else
        {
            _x = curpos.x + pos.x
        }

        //不走出边界
        if(curpos.y+pos.y>this.m_bg.height/2)
        {
            _y = this.m_bg.height/2-this.m_plane.height/2
        }else if(curpos.y+pos.y<-this.m_bg.height/2)
        {
            _y = -this.m_bg.height/2+this.m_plane.height/2
        }
        else
        {
            _y = curpos.y + pos.y
        }
        this.m_plane.setPosition(_x,_y)
    },
    //为了避让升级图标的飞机上升
    PlaneMoveUp:function()
    {
        this.m_plane.runAction(cc.moveTo(0.1,0,-175))
    },
    //为了避让升级图标的飞机下降
    PlaneMoveDown:function()
    {
        this.m_plane.runAction(cc.moveTo(0.1,0,-438))
    },
    //得到金币的动画
    /**
     * @name: createGoldAnim
     * @test: test font
     * @msg: 得到金币的动画
     * @param {srcPos:金币起始位置,
     * dstPos:金币结束位置,
     * r：发散半径,cnt：生成个数,
     * addgold：增加的实际数量,type：调用方式,
     * callBack：回调函数} 
     * @return: 
     */    
    createGoldAnim:function(srcPos,dstPos,r,cnt,addgold,type,callBack)
    {
        var array=this.getPoint(r,srcPos.x,srcPos.y,cnt)
        var nodeArray = new Array();
        for (var i = 0; i < array.length; i++) {
            var goldnode=this.createGold(this.node)
            goldnode.setPosition(srcPos)
            goldnode.id=i
            var distance=cc.v2(array[i].x-dstPos.x,array[i].y-dstPos.y).mag()
            
            var targetGoldnode
            if(type==1)
            {
                targetGoldnode=this.topjs.getGoldnode()
            }
            else
            {
                targetGoldnode=this.monsterhpjs.getGoldnode()
            }
            //var baseScale=targetGoldnode.scale
            var seq=cc.sequence(
                cc.moveTo(0.5,array[i].x+random(-75,75),array[i].y+random(-75,75)),
                //cc.delayTime(0.01*(distance-500)/10),
                cc.moveTo(0.001*distance,dstPos),
                cc.callFunc(function(_goldnode){
                    //targetGoldnode.stopAllActions()
                    if(type==1)
                    {
                        var seq=cc.sequence(
                            cc.scaleTo(0.03,0.8),
                            cc.scaleTo(0.03,0.5)
                        )
                    }
                    else
                    {
                        var seq=cc.sequence(
                            cc.scaleTo(0.03,0.6),
                            cc.scaleTo(0.03,0.35)
                        )
                    }
                    targetGoldnode.runAction(seq)
                    if(_goldnode.id == array.length-1){
                        if( callBack != null )callBack(addgold);
                    }
                    this.onGoldKilled(_goldnode)
                }.bind(this))
            )
            goldnode.runAction(seq)
            
        }
        //飞到终点后，全部放入节点池
        
    },

   
    
    //从节点池获取，如果没有再生成
    createGold:function(parentNode)
    {
        var gold=null
        if(this.goldpool.size()>0)
        {
            gold=this.goldpool.get()
            //console.log("还剩:"+this.goldpool.size()+"个")
        }else
        {
            gold=cc.instantiate(this.m_goldprefab)
        }
        gold.parent=parentNode
        return gold
    },

    //先杀死金币，不急着更新
    onGoldKilled: function (gold) {
        this.goldpool.put(gold); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
        //console.log("回收后"+this.goldpool.size()+"个")
    },
    //回收金币资源到池子
    
    //计算当前的金币并显示
    onGoldCollected:function(addgold)
    {
        //this.goldpool.put(gold)
        
        //明天再写了
        //全部回收就更新数据
        //console.log("回收金币个数:"+addgold)
        
        var oldgold=gDataCtl.getGold()
        var newgold=oldgold+addgold
        //gDataCtl.SetTaskGold(0)
        gDataCtl.SetGold(newgold)
        this.UpdateTopGold()
        
        
        //console.log("回收后还有"+this.goldpool.size()+"个")
    },

    //更新金币数
    UpdateTopGold:function()
    {
        this.topjs.ShowGold()
        this.monsterhpjs.ShowGold()
    },
    /*
    * 求圆周上等分点的坐标
    * ox,oy为圆心坐标
    * r为半径
    * count为等分个数
    */
    getPoint:function(r, ox, oy, count){
        var point=[]
        var radians = (Math.PI / 180) * Math.round(360 / count), //弧度
        i = 0;
        for(; i < count; i++){
            var x = ox + r * Math.sin(radians * i),
                y = oy + r * Math.cos(radians * i);
 
            point.unshift({x:x,y:y}); //为保持数据顺时针
        }
        return point
    },
    //游戏结束
    gameOver:function()
    {
        this.StopBullet()
        //关闭碰撞
        //cc.director.getCollisionManager().enabled=false
        this.m_touchcover.active=false
        this.m_revive.active=true
        this.virusmakerjs.pauseAll()
    },

    //盖上黑色背景色
    SetBlackBg:function(isShow)
    {
        this.StopBullet()
        this.revivejs.SetBlackBg(isShow)
    },

    //重新复活
    Revive:function()
    {
        //开始控制
        this.m_touchcover.active=true
        this.m_touchcover.getComponent('TouchCover').TouchEnd()
        //1, 飞机
        this.planeautojs.Revive()
        //0, 子弹
        this.ResumeBullet()
        //2, 病毒
        //this.virusmakerjs.resumeAll()
        //3，碰撞，无敌三秒
        this.scheduleOnce(function()
        {
            //开启碰撞
            this.planeautojs.SetCollisionTag(3)
        },3)

    },
    //飞机爆炸而死
    ExplodePlane:function()
    {
        this.planeautojs.explode()
        var seq=cc.sequence(
            cc.delayTime(2),
            cc.callFunc(function()
            {
                this.SetState('STATE_MOVEIN')
            }.bind(this))
        )
        this.node.runAction(seq)
        this.m_touchcover.active=true
    },
    //开始玩下一关
    NextLevel:function()
    {
        this.m_touchcover.active=false
        this.m_brief.active=false
        this.planeautojs.EndFire()
        this.SetState('STATE_MOVEIN')
        var seq=cc.sequence(
            cc.delayTime(2),
            cc.callFunc(function()
            {
                this.leveljs.NextLevel()
                this.m_touchcover.active=true
            }.bind(this))
        )
        this.node.runAction(seq)
    },
    //停下所有子弹发射
    StopBullet:function()
    {
        var allnode=this.m_bulletlayer.children
        for (let i = 0; i < allnode.length; i++) {
            var bjs=allnode[i].getComponent('Bullet')
            if(bjs!=null)
            {
                bjs.pause()
            }
            
        }
    },
     //恢复所有子弹发射
    ResumeBullet:function()
    { 
         var allnode=this.m_bulletlayer.children
         for (let i = 0; i < allnode.length; i++) {
             var bjs=allnode[i].getComponent('Bullet')
             if(bjs!=null)
             {
                 bjs.resume()
             }
             
         }
    },
    
    start () {

    },

    ActiveReset:function()
    {
        gDataCtl.clear()
        this.topjs.SetGold(gDataCtl.getGold())
        this.clickjs.UpdateData()
        for (let i = 0; i < this.m_classArray.length; i++) {
            if(this.m_classArray[i].Reset!=null)
            {
                this.m_classArray[i].Reset()
            }
        }
    },
    ActivePlay:function()
    {
        for (let i = 0; i < this.m_classArray.length; i++) {
            if(this.m_classArray[i].Play!=null)
            {
                this.m_classArray[i].Play()
            }
        }
        this.leveljs.NextLevel()
    },
    ActiveMovein:function()
    {
        for (let i = 0; i < this.m_classArray.length; i++) {
            if(this.m_classArray[i].MoveIn!=null)
            {
                this.m_classArray[i].MoveIn()
            }
        }
        this.m_plane.setPosition(cc.v2(0,-400))
        
        //要重新设置是否在玩的状态
        this.m_touchcover.getComponent('TouchCover').MoveIn()
        this.ResumeBullet()
        this.revivejs.Reset()
    },
    ActiveMoveout:function()
    {
        for (let i = 0; i < this.m_classArray.length; i++) {
            if(this.m_classArray[i].MoveOut!=null)
            {
                this.m_classArray[i].MoveOut()
            }
        }
        this.ResumeBullet()
                
    },
    //不用维护的测试代码
    Test1:function(target,data)
    {
        switch (data) {
            case "重置":
                //gDataCtl.SetGold(0)
                //gDataCtl.addGold(999)
                gDataCtl.clear()
                this.topjs.SetGold(gDataCtl.getGold())
                this.clickjs.UpdateData()
                for (let i = 0; i < this.m_classArray.length; i++) {
                    if(this.m_classArray[i].Reset!=null)
                    {
                        this.m_classArray[i].Reset()
                    }
                }
                break;
            case "播放":
                for (let i = 0; i < this.m_classArray.length; i++) {
                    if(this.m_classArray[i].Play!=null)
                    {
                        this.m_classArray[i].Play()
                    }
                }
                this.leveljs.NextLevel()
                break;
            case "移出":
                for (let i = 0; i < this.m_classArray.length; i++) {
                    if(this.m_classArray[i].MoveOut!=null)
                    {
                        this.m_classArray[i].MoveOut()
                    }
                }
                break;
            case "移入":
                this.m_revive.active=false
                //this.m_touchcover.active=false
                for (let i = 0; i < this.m_classArray.length; i++) {
                    if(this.m_classArray[i].MoveIn!=null)
                    {
                        this.m_classArray[i].MoveIn()
                    }
                }
                break;
            default:
                break;
        }
    },
    //设置状态，并采取对应动作
    SetState:function(state)
    {
        switch (state) {
            case 'STATE_RESET':
                //gDataCtl.SetGold(0)
                //gDataCtl.addGold(999)
                this.ActiveReset()
                break;
            case 'STATE_PLAY':
                this.ActivePlay()
                break;
            case 'STATE_MOVEIN':
                this.ActiveMovein()
                break;
            case 'STATE_MOVEOUT':
                this.ActiveMoveout()
                break;
            default:
                break;
        }
    },
    //刷新一下关卡血条
    minusMonsterHP:function()
    {
        gLevelHp--
        var totalhp=gLevelDesign[gDataCtl.GetLevel()%gLevelDesign.length].hp
        var prog=gLevelHp/totalhp
        var vcnt=this.virusmakerjs.GetVirusCount()
        this.monsterhpjs.setMonsterHp(prog,vcnt)
    }

    // update (dt) {},
});
