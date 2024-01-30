import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Button, Checkbox, Label, TextInput, Textarea, FileInput } from 'flowbite-react';
import {useNavigate} from 'react-router-dom';

const PostForm = () => {
  const[postUpload,setPostUpload]=useState(false);
  const [newPost, setNewPost] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {newPost&&
   axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/posts`,newPost).then(()=>{
    setPostUpload(true);
    navigate("/");

  }).catch(e=>console.log(e));
  }, [newPost])
  
  const postObject ={
    title:"",
    userName:"",
    likes:0,
    content:"",
    imageUrl:"",
    avatar:""
  }
  const handleTitle =(e)=>{
    postObject.title = e.target.value;
  }

  const handleUserName = (e)=>{
    postObject.userName = e.target.value;
  }

  const handleLikes = (e)=>{
    postObject.likes =parseInt(e.target.value);
    }

  const handleContent = (e)=>{
    postObject.description = e.target.value;
  }

  const handleImageUrl = (e)=>{
    postObject.poster=e.target.value;
  }

  const handleAvatar = (e)=>{
    
    const url = e.target.value;
    const urlArray = url.split("/");
    const id = urlArray[urlArray.length-1];
    console.log(id);
    postObject.avatar=id;
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(postObject);
    setNewPost(postObject);

  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="grid grid-cols-1 gap-4 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-4"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 mt-5 block">
            <Label htmlFor="title" value="Post title" />
          </div>
          <TextInput
            id="title"
            type="text"
            placeholder="name@flowbite.com"
            onChange={handleTitle}
            required
          />
        </div>
        <div>
          <div className="mb-2 mt-5 block">
            <Label htmlFor="userName" value="Post username" />
          </div>
          <TextInput
            id="username"
            type="text"
            required
            onChange={handleUsername}
          />
        </div>
        <div>
          <div className="mb-2 mt-5 block">
            <Label htmlFor="likes" value="likes" />
          </div>
          <TextInput id="likes" type="number" required onChange={handleLikes} />
        </div>
      
        <div className="max-w-md">
          <div className="mb-2 mt-5 block">
            <Label htmlFor="content" value="Post content" />
          </div>
          <Textarea
            id="content"
            placeholder="Add content to your post..."
            required
            rows={4}
            onChange={handlePost}
          />
        </div>
        <div id="imageUrlUpload" className="max-w-md">
          <div className="mb-2 mt-5 block">
            <Label htmlFor="imageUrl" value="Upload imageUrl" />
          </div>
          <TextInput
            id="imageUrl"
            type="text"
            placeholder="Add a imageUrl for the post"
            onChange={handleImageUrl}
            required
          />
        </div>
        <div>
          <div className="mb-2 mt-5 block">
            <Label htmlFor="avatar" value="Post avatar" />
          </div>
          <TextInput
            id="avatar"
            type="text"
            placeholder="Add user avatar here"
            onChange={handleAvatar}
            required
          />
        </div>
        <Button className="mt-5" type="submit">
          Add Post
        </Button>
      </form>
    </div>
  );
}

export default PostForm;



