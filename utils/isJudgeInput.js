function isJudgeInput(data, message) {
    if (!data) {
        wx.showToast({
            title: message,
            icon: 'none',
            duration: 2000,
            mask: true
        })
        return 500
    } else {

        return 200
    }
}
module.exports = {
    isJudgeInput: isJudgeInput
}