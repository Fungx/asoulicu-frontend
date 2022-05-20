// store模式管理状态
export const QueryParams = {
    isDebug: false,
    state: {
        kw: null,
        tags: []
    },
    setKw(s) {
        if (this.isDebug)
            console.log(`set kw=${s}`)
        this.state.kw = s
    },
    setTags(arr) {
        if (this.isDebug)
            console.log(`set tags=${arr}`)
        this.state.tags = arr
    },
    addTag(t) {
        let exist = this.state.tags.indexOf(t) !== -1
        if (!exist)
            this.state.tags.push(t)
        if (this.isDebug)
            console.log(`add tag[${t}]`)
    },
    clear() {
        if (this.isDebug)
            console.log('clear')
        this.state.kw = null
        this.state.tags = []
    }
}