const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass('ShaderProperty')
export class ShaderProperty {
    constructor(key: string, value: number) {
        this.key = key;
        this.value = value;
    }
    @property({readonly: true})
    key = '';

    @property(cc.Float)
    value = 0.0;
   
};

let ShaderEnum = cc.Enum({});

@ccclass
@executeInEditMode
export default class ShaderHelper extends cc.Component {
    
    _effectName: string = '';
    //枚举Shader程序
    @property
    _program = 0;
    @property({type:ShaderEnum})
    get program() {
        return this._program;
    }
    set program(value) {
        if (this._program === value) {
            return;
        }
        this._program = value;
        console.log(ShaderEnum[this._program]);
        this.applyEffect();
    }

    @property({type:[ShaderProperty]})
    _maxValues: Array<ShaderProperty> = [];

    @property({type: cc.Float, range:[0, 65535, 0.1]})
    get max(): number {
        let effectName = ShaderEnum[this._program];
        let item = this._maxValues.find(item => item.key === effectName);
        if (!item) {
            item = new ShaderProperty(effectName, 65535);  
        }
        return item.value;
    }

    set max(value) {
        let effectName = ShaderEnum[this._program];
        let item = this._maxValues.find(item => item.key === effectName);
        if (!item) {
            item = new ShaderProperty(effectName, 65535);  
            this._maxValues.push(item);
        }
        item.value = value;
    
        if (!CC_EDITOR) {
            return;
        }

        if (this.material) {
             //@ts-ignore
            this.material.effect.setProperty('time', value);
        }
    }

    //shader参数
    @property({type: [ShaderProperty]})
    _props: ShaderProperty[] = [];
    
    @property({type: [ShaderProperty]})
    get props() : ShaderProperty[] {
        return this._props;
    }

    set props(value) {
        this._props = value;    
        this.applyEffect();
    }

    //材质对象
    material: cc.Material = null;

       
    //effect的数组
    static effectAssets: any[] = null;

    start () {
        if (CC_EDITOR) {
            setTimeout(() => {
                this.applyEffect();
            }, 1000);
            
        } else {
            this.applyEffect();
        }
    }

    applyEffect() {
  
        //获取精灵组件
        let sprite = this.node.getComponent(cc.Sprite);
        //this.mycolor=this.node.color;
        if (!sprite) {
            return;    
        }
        let effectName = ShaderEnum[this.program];
        let effectAsset = ShaderHelper.effectAssets.find((item) => {
            return item._name === effectName;
        });

        if (!effectAsset) {
            return;
        }

        //实例化一个材质对象
        let material = new cc.Material();
        
        //为材质设置effect，也是就绑定Shader了
        material.effectAsset = effectAsset
        material.name = effectAsset.name;
        //在材质对象上开启USE_TEXTURE定义
        let defineUserTexture = !!effectAsset.shaders.find(shader => shader.defines.find(def => def.name === 'USE_TEXTURE'));
        if (defineUserTexture) {
            material.define('USE_TEXTURE', true); 
        }

        //将材质绑定到精灵组件上，精灵可以绑定多个材质
        //这里我们替换0号默认材质
        sprite.setMaterial(0, material);

        //从精灵组件上获取材质，这步很重要，不然没效果
        this.material = sprite.getMaterial(0);
        this.setProperty(effectAsset);
        this.node.emit('effect-changed', this, this.material);
    }

    setProperty(effectAsset) {
        if (CC_EDITOR) {
            let oldProps = this._props;
            this._props = [];

            let properties = effectAsset._effect._properties || effectAsset._effect.passes[0]._properties;
            
            let keys = Object.keys(properties);
            //@ts-ignore
            let values = Object.values(properties);
            
            for (let i = 0; i < values.length; i++) {
                let value: number = values[i].value;
                let key = keys[i];
                let type = values[i].type;
                if (value !== null && (type === 4 || type === 13)) {
                    let oldItem = oldProps.find(item => item.key === key);
                    if (oldItem) {
                        value = oldItem.value;
                    }
                    let sp = new ShaderProperty()
                    sp.key = key;
                    sp.value = typeof(value) === 'object'  ? value[0] : value;
                    this._props.push(sp);    
                }
            }
            
            let isShowMax = keys.indexOf('time') !== -1;
             // @ts-ignore
            cc.Class.Attr.setClassAttr(ShaderHelper, 'max', 'visible', isShowMax);    
        }

        if (this._props.length) {
            this._props.forEach(item => item.key && this.material.setProperty(item.key, item.value || 0));
        }
        // @ts-ignore
        cc.Class.Attr.setClassAttr(ShaderHelper, 'props', 'visible', !!this._props.length); 
    }

    next() {
        this.program = (this.program + 1) % ShaderHelper.effectAssets.length;
    }

    prev() {
        if (this.program === 0) {
            this.program = ShaderHelper.effectAssets.length - 1;    
            return;
        }
        this.program = (this.program - 1) % ShaderHelper.effectAssets.length;
    }

}

cc.game.on(cc.game.EVENT_ENGINE_INITED, () => {
    cc.loader.loadResDir('effect', cc.EffectAsset ,(error, res) => {
        ShaderHelper.effectAssets = res;
        let obj = {};
        let array = ShaderHelper.effectAssets.map((item, i)  => {
            obj[item._name] = -1;
            return {name:item._name, value: i}; 
        });
       
        ShaderEnum = cc.Enum(obj);
         //@ts-ignore
        cc.Class.Attr.setClassAttr(ShaderHelper, 'program', 'enumList', array);
    });
})