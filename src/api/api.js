import axios from 'axios'

const host = 'http://localhost:8080/v'
// const host = 'https://asoul.icu/v'

// 根据id获取某个作文内容HTML
const fetchArticleHTML = id => {
    return axios.get(`${host}/articles/${id}/html`)
}

// 根据tags查找作文
const queryArticles = (params) => {
    return axios.get(`${host}/articles/q`, {params: params})
}

export {
    fetchArticleHTML, queryArticles
}
