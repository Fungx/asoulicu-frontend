// store模式管理状态
export const QueryParams = {
    isDebug: false,
    state: {
        title: null,
        author: null,
        tags: []
    },
    setTitle(s) {
        if (this.isDebug)
            console.log("set title=" + s)
        this.state.title = s
    },
    setAuthor(s) {
        if (this.isDebug)
            console.log("set author=" + s)
        this.state.author = s
    },
    setTags(arr) {
        if (this.isDebug)
            console.log(`set tags=${arr}`)
        this.state.tags = arr
    },
    addTag(t) {
        let exist=this.state.tags.indexOf(t) !== -1
        if (!exist)
            this.state.tags.push(t)
        if (this.isDebug)
            console.log(`add tag[${t}]`)
    },
    clear() {
        if (this.isDebug)
            console.log('clear')
        this.state.title = null
        this.state.author = null
        this.state.tags = []
    }
}