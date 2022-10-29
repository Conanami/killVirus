/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-03-26 15:21:10
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-04-08 14:08:18
 */
//一些全局的数据变量
window.ACTIVE_RESET=0
window.ACTIVE_PLAY=1
window.ACTIVE_MOVEIN=2
window.ACTIVE_MOVEOUT=3

window.COLLISION_WALL=0
window.COLLISION_BULLET=1
window.COLLISION_VIRUS=2

window.gameCtl=null
window.gData={}
window.gDataCtl=null
window.gVirusMaker=null
window.gLevelDesign=null
window.gLevelHp=0
window.gAdTimes=0
window.gWeaponDesign=[
    {speed:10,sprice:10,power:5,pprice:8},
    {speed:10,sprice:100,power:5,pprice:9},
    {speed:1,sprice:1000,power:1,pprice:10},
    {speed:1.5,sprice:100,power:1,pprice:11},
    {speed:2,sprice:1000,power:2,pprice:12},
    {speed:13,sprice:100,power:8,pprice:13},
    {speed:10,sprice:1000,power:9,pprice:14},
    {speed:2,sprice:100,power:2,pprice:15},
    {speed:3,sprice:1000,power:2,pprice:16},
    {speed:4,sprice:100,power:3,pprice:17},
    {speed:5,sprice:1000,power:3,pprice:18},
    {speed:5,sprice:10000,power:3,pprice:19},
    {speed:5.5,sprice:20000,power:4,pprice:20},
    {speed:6,sprice:300000,power:4,pprice:21},
    {speed:6.5,sprice:400000,power:4,pprice:22},
    {speed:7,sprice:500000,power:4,pprice:8},
    {speed:7.5,sprice:100000,power:4,pprice:9},
    {speed:10,sprice:1000,power:9,pprice:10},
    {speed:11,sprice:100,power:8,pprice:11},
    {speed:12,sprice:1000,power:9,pprice:12},
    {speed:13,sprice:100,power:8,pprice:13},
    {speed:10,sprice:1000,power:9,pprice:14},
    {speed:9,sprice:100,power:8,pprice:15},
    {speed:10,sprice:1000,power:9,pprice:16},
    {speed:9,sprice:100,power:8,pprice:17},
    {speed:10,sprice:1000,power:9,pprice:18},
    {speed:9,sprice:100,power:8,pprice:19},
    {speed:10,sprice:1000,power:9,pprice:20},
    {speed:9,sprice:100,power:8,pprice:21},
    {speed:10,sprice:1000,power:9,pprice:22}
]

//取lower,upper之间的随机整数
function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
}

//进位函数，比如4500，就显示成4.5K
function carryBit(num)
{
    if(num==null) return '0'
    if(num=='undefined') return '0'
    var array=[
        ['1000000','M'],
        ['1000','K']
    ]

    for (let i = 0; i < array.length; i++) {
        var value=num/array[i][0]
        if(value>=1)
        {
            //保留一位小数，后面是单位
            return ''+value.toFixed(1)+array[i][1]
        }
        
    }
    if(num<1000)
        return ''+num
}

//进位后的返回
function uncarryBit(mystr)
{
    if(mystr=='') return 0
    return parseInt(mystr)
}

//全局递归着色，带一个空脚本color的组件，都要着色
function setVirusColor(node,color){
    for (var i = 0; i < node.children.length; i++) {
        var js=node.children[i].getComponent('color')
        if(js!=null)
        {
            node.children[i].color=color
        }
        setVirusColor(node.children[i],color)
    }
}