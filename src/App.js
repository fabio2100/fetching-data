import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Post from './Post';

function App() {
  //const [users,setUsers] = useState();
  const [users,setUsers] = useState();
  const [cargado,setCargado] = useState(false);
  const [posts,setPosts] = useState();
  const [userSelected,setUserSelected] = useState();

  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/users`)
    .then(response=>response.json())
    .then(data=>{
      console.log(data)
      setUsers(data)    
      setCargado(true);   
    })
  },[])

  const handlePosts = ({target}) => {
    if(target.value == userSelected){
      setUserSelected(null)
    }else{
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${target.value}`)
    .then(response=>response.json())
    .then(data=>{
      setUserSelected(target.value)
      setPosts(data);
    })
    }
  }



  return (
    <>
    {cargado && users.map(user=>
        {return <div key={user.id} className='post'>
          <p className='userNameAndName'><span className='username'>{user.username}</span><span className='name'>{user.name}</span></p> 
          <div className='email'><img className='img' src="/img/email.png" alt='Email:'/><span>{user.email}</span></div>
          <button value={user.id} onClick={handlePosts}>Posts</button>
          <button>Albums</button>
          <button>To dos</button>
          <div className='border-main'>
          {userSelected == user.id && posts.map(post=>{
            return <Post key={post.id} title={post.title} body={post.body} id={post.id}/>
          })}
          </div>
        </div>})}
    </>
  );
}

export default App;
