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
            <p className="title">{title}</p>
            <p className="body">{body}</p>
            <button className="buttonGeneral" value={id} onClick={handleComments}>See comments</button>
            <div className="border-main">
            {postSelected == id && comments.map(comment=>{
                return <div className="post">
                    <p className="emailComment">{comment.email}</p>
                    <p className="title">{comment.name}</p>
                    <p className="body">{comment.body}</p>
                </div>
            })}
            </div>
        </div>
    )
}