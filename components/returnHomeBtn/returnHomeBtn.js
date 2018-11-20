
Component({
    properties: {
      btnConfig: {
        type: String,
        value: '',
      },
    },
  
    data: {
      
    },
    methods: {
        clickBtn(){
            this.triggerEvent('clickBtn');
        }
    },
  })
  