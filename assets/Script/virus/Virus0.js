
cc.Class({
    extends: cc.Component,

    properties: {
        m_labHp:cc.Label,
        m_back:[cc.Node],
        m_body:cc.Node,
        m_dieanim:cc.Animation
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_back[0].runAction(cc.repeatForever(cc.rotateBy(8,360)))
        this.m_back[1].runAction(cc.repeatForever(cc.rotateBy(8,-360)))
       
        
        //专门记录是否在受伤中的boolean变量，如果受伤中，则不要再次播放受伤动画
        //this.init()
    },

    //这个函数是active=true的时候调用的
    onEnable()
    {
        //console.log("从池子回来会执行这个吗？")
        //this.init()
    },

    init:function(hp)
    {
        //console.log("i am back!!")
        //重新设置血量
        this.m_hp=hp
        this.oldhp=this.m_hp
        //大小也要恢复
        this.node.scale=cc.v2(1,1)
        this.setHp(this.m_hp)
        //随机一个颜色
        this.setColor(this.setRandomColor())
        //变回子弹后要重新变成病毒
        this.getComponent(cc.CircleCollider).tag=2
        this.m_bHurt=false
        //这句是动态绑定动画完成后的回调函数
        this.m_dieanim.on('finished',  this.onFinished,    this);
        this.m_body.active=true
        this.m_dieanim.node.active=false
        this.m_body.scale=cc.v2(1,1)
        this.setStartPoint()
        this.setInitSpeed()
    },
    //确定起始点
    setStartPoint:function()
    {
        var y=900
        var x=random(-300,300)
        this.node.setPosition(cc.v2(x,y))
    },
    //确定初始速度
    setInitSpeed:function()
    {
        this.m_speedX=random(-100,100)
        this.m_speedY=random(100,150)
    },
    //设置随机颜色
    setRandomColor:function()
    {
        var bignum=random(210,255)
        var smallnum=random(50,127)
        switch (bignum%6) {
            case 0:
                return cc.color(bignum,smallnum,smallnum)
                break;
            case 1:
                return cc.color(smallnum,bignum,smallnum)
                break;
            case 2:
                return cc.color(smallnum,smallnum,bignum)
                break;
            case 3:
                return cc.color(bignum,bignum,smallnum)
                break;
            case 4:
                return cc.color(smallnum,bignum,bignum)
                break;
            case 5:
                return cc.color(bignum,smallnum,bignum)
                break;
            default:
                break;
        }
        //如果出问题了，就默认返回白色
        return cc.color(255,255,255)
    },
    //动画播完就彻底结束
    onFinished:function()
    {
        gVirusMaker.onVirusKilled(this.node)
    },

    
    //被打中
    hit:function()
    {
        this.m_hp -=1
        gameCtl.minusMonsterHP()
        this.setHp(this.m_hp)
        if(this.m_hp<=0)
        {
            this.die()
        }
        this.hurt()
    },
    //死掉
    die:function()
    {
        this.m_body.active=false
        this.m_dieanim.node.active=true
        this.m_dieanim.play()
        gameCtl.createGoldAnim(this.node.position,
            cc.v2(-240,600),
            100,
            (Math.ceil(this.oldhp/2)>18?18:Math.ceil(this.oldhp/2)),
            this.oldhp,
            2,
            function(gold){
                gameCtl.onGoldCollected(gold);
            }.bind(this))
        //gameCtl.onVirusKilled(this.node)
    },
    //受伤
    hurt:function()
    {
        //如果不在受伤中，则播放受伤动画
        if(!this.m_bHurt)
        {
            this.m_bHurt=true
            var newsize=this.getShrinksize()
            var seq=cc.sequence(
                cc.scaleTo(0.05,1.35*newsize),
                cc.scaleTo(0.05,1*newsize),
                cc.callFunc(function(){
                    this.m_bHurt=false
                    this.setColor(this.setRandomColor())
                }.bind(this))
            )
            //this.setColor(this.setRandomColor())
            this.node.runAction(seq)
        }
    },
    //被打后变小
    getShrinksize:function()
    {
        var newsize=this.m_hp/this.oldhp*0.7+0.3
        return newsize
    },
    onCollisionEnter:function(other,self)
    {
        //console.log("other"+other.tag)
        //console.log("self"+self.tag)
        //被子弹打中，而且身体还在，如果身体要爆炸了，就不用碰撞了。
        if(this.m_body.active==false)
        {
            self.tag=4
        }
        if(other.tag==COLLISION_BULLET && this.m_body.active==true)
        {
            this.hit()
        }

    },
    //设置颜色
    setColor:function(color)
    {
        setVirusColor(this.node,color)
    },
    //变色动作
    runColorAction:function(time,node,color)
    {
        for (var i = 0; i < node.children.length; i++) {
            var js=node.children[i].getComponent('color')
            if(js!=null)
            {
                var colorAction=cc.tintTo(0.5,this.setRandomColor())
                node.children[i].runAction(colorAction)
            }
            runColorAction(time,node.children[i],color)
            
        }
    },
    //设置血量
    setHp:function(num)
    {
        this.m_hp=num
        this.m_labHp.string=num
    },
    //病毒暂停，速度清零
    pause:function()
    {
        this.oldspeedX=this.m_speedX
        this.m_speedX=0
        this.oldspeedY=this.m_speedY
        this.m_speedY=0
    },
    //病毒恢复
    resume:function()
    {
        this.m_speedX=this.oldspeedX==0?random(-200,200):this.oldspeedX
        this.m_speedY=this.oldspeedY==0?random(100,300):this.oldspeedY
    },

    update (dt) {
        var Ydis=dt*this.m_speedY
        var Xdis=dt*this.m_speedX
        this.node.y-=Ydis
        this.node.x+=Xdis
        //碰到两边就弹
        if(Math.abs(this.node.x)>gameCtl.node.width/2-this.node.width/2)
        {
            this.node.x=this.node.x/Math.abs(this.node.x)*(gameCtl.node.width/2-this.node.width/2)
            this.m_speedX=-this.m_speedX
        }
        //走到底了就重新出来，没完没了
        if(this.node.y<-gameCtl.node.height/2-this.node.height/2)
        {
            this.setStartPoint()
            this.setInitSpeed()
        }
    },
});
