import { useState } from "react"


export default function Post({title,body,id}){
    const [postSelected,setPostSelected] = useState();
    const [comments,setComments] = useState();

    const handleComments = ({target}) => {
        if(target.value == postSelected){
            setPostSelected(null)
        }else{
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${target.value}`)
        .then(response=>response.json())
        .then(data=>{
            setComments(data)
            setPostSelected(target.value)
        })
        }

    }

    return(
        <div className="post">
            <p>{title}</p>
            <p>{body}</p>
            <button value={id} onClick={handleComments}>Comments</button>
            <div className="border-main">
            {postSelected == id && comments.map(comment=>{
                return <div className="post">
                    <p>{comment.name}</p>
                    <p>{comment.email}</p>
                    <p>{comment.body}</p>
                </div>
            })}
            </div>
        </div>
    )
}