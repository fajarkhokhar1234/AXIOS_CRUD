import axios from "axios"

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
})

// get method
export const GetPost = () => {
    return api.get("/posts")
}

// delete method
export const DeletePost = (id) => {
    return api.delete(`/posts/${id}`)
}

// add/post method
export const AddPost = (post) => {
    return api.post("/posts", post)
}

// put/patch updating post data
export const EditPost = (id, post) => {
    return api.put(`/posts/${id}`,post)
}