import axios from 'axios'

// const host = 'http://localhost:8088/v'
const host = 'https://asoul.icu/v'



// 根据title获取某个作文详细信息
const fetchArticle = s => {
    return axios.get(`${host}/articles/${s}`)
}
// 查找作文
const queryArticles = (params) => {
    return axios.get(`${host}/articles`, {params: params})
}
// 获取所有tags
const fetchTags=()=>{
    return axios.get(`${host}/tags`)
}

export {
     queryArticles,fetchArticle,fetchTags
}
