import axios from 'axios'

const host = 'http://localhost:8080/v'
// const host = 'https://asoul.icu/v'

// 根据id获取某个作文内容HTML
const fetchArticleHTML = id => {
    return axios.get(`${host}/articles/${id}/html`)
}

// 根据id或title获取某个作文详细信息
const fetchArticle = s => {
    return axios.get(`${host}/articles/${s}`)
}
// 查找作文
const queryArticles = (params) => {
    return axios.get(`${host}/articles/q`, {params: params})
}
// 获取所有tags
// const fetchTags=()=>{
//     return axios.get(`${host}/tags`)
// }

export {
    fetchArticleHTML, queryArticles,fetchArticle
}
