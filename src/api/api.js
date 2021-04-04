import axios from 'axios'

// const host = 'http://localhost:8088/v'
const host='https://asoul.icu/v'
// 获取所有作文
const listArticles = (pageNum, pageSize) => {
    return axios.get(`${host}/articles`, {params: {pageNum: pageNum, pageSize: pageSize}})
}

// 根据id获取某个作文内容HTML
const fetchArticleHTML = id => {
    return axios.get(`${host}/articles/${id}/html`)
}

// 根据tags查找作文
const queryArticlesByTags = (tags, pageNum, pageSize) => {
    return axios.get(`${host}/articles/q`, {params: {tags: tags, pageNum: pageNum, pageSize: pageSize}})
}

export {
    listArticles, fetchArticleHTML, queryArticlesByTags
}
