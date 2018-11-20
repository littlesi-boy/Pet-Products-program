Component({
    properties: {
        btnConfig: {
            type: String,
            value: '',
        },
        centerBtnText: {
            type: String,
            value: '',
        },
        widths: {
            type: Number,
            value: '300',
        },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    methods: {
        center_Btn() {
            this.triggerEvent('confirmpay');
        }
    }
})
