
Component({
    properties: {
      btnConfig: {
        type: String,
        value: '',
      },
      centerBtnText:{
        type: String,
        value: '',
      },
      leftBtnFont:{
        type: String,
        value: '', 
      },
      rightBtnFont:{
        type: String,
        value: '', 
      },
      leftBtnFontColor:{
        type: String,
        value: '', 
      },
      rightBtnFontColor:{
        type: String,
        value: '', 
      },
      leftBtnBg:{
        type: String,
        value: '', 
      },
      paddingLeft:{
        type: String,
        value: '',
      },
      paddingRight:{
        type: String,
        value: '',
      },
      leftBtnClass:{
        type: String,
        value: '',
      }
    },
  
    /**
     * 组件的初始数据
     */
    data: {
      
    },
    methods: {
        leftBtn(){
            this.triggerEvent('leftBtn');
        },
        rightBtn(){
            this.triggerEvent('rightBtn');
        }
    },
  })
  