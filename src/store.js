// store模式管理状态
export const QueryParams = {
    isDebug: true,
    state: {
        title: null,
        author: null,
        tags: null
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
    clear() {
        if (this.isDebug)
            console.log('clear')
        this.state.title=null
        this.state.author=null
        this.state.tags=null
    }
}