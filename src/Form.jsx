import { useEffect, useState } from 'react'
import '../App.css'
import { AddPost, EditPost } from '../src/api/PostApi'


export const Form = ({ posts, setPosts, updateApi, setUpdateApi }) => {

    // handling input data
    const [addData, setAddData] = useState({
        title: "",
        body: ""
    })

    const handlePostInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setAddData((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }

    // adding input data
    const AddedPost = async () => {

        try {
            const response = await AddPost(addData)
            // console.log(response);

            if (response.status === 201) {
                setPosts([...posts, response.data])
                setAddData({ title: "", body: "" })
            }

        } catch (error) {
            console.log(error);
        }
    }

    // get the data and add into input fields
    useEffect(()=>{
        updateApi && setAddData({
            title: updateApi.title || "",
            body: updateApi.body || "",
        })
    },[updateApi])

    // Edit and Add button toggling
    let isEmpty = Object.keys(updateApi).length === 0
    
    // Updating Api post data through Put method
    const UpdatePostData = async() => {
        const response = await EditPost(updateApi.id, addData)
        console.log(response);
        if(response.status === 200){
            setPosts((prev) => {
                return prev.map((curElem) => {
                    return curElem.id === updateApi.id ? response.data : curElem
                })
            })
            setAddData({ title: "", body: "" })
            setUpdateApi({}) 
        }
    }

    // Form submission
    const handlePostSubmit = (e) => {
        e.preventDefault()
        const action = e.nativeEvent.submitter.value;
        if(action === "Add"){
            AddedPost()
        } else if(action === "Edit"){
            UpdatePostData()
        }
    }
    return (
        <>
            <form onSubmit={handlePostSubmit}>
                <div>
                    <label htmlFor="title"></label>
                    <input type="text" name="title" id="title" autoComplete="off" placeholder="Add Title" value={addData.title} onChange={handlePostInput} />
                </div>
                <div>
                    <label htmlFor="body"></label>
                    <input type="text" name="body" id="body" autoComplete="off" placeholder="Add Post" value={addData.body} onChange={handlePostInput} />
                </div>
                <button type="submit" value={isEmpty ? "Add" : "Edit"}>{isEmpty ? "Add" : "Edit"}</button>
            </form>
        </>
    )
}