import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Button, Checkbox, Label, TextInput, Textarea, FileInput } from 'flowbite-react';
import {useNavigate} from 'react-router-dom';

const BlogForm = () => {
  const[blogUpload,setBlogUpload]=useState(false);
  const [newBlog, setNewBlog] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {newBlog&&
   axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/posts`,newBlog).then(()=>{
    setMovieUpload(true);
    navigate("/");

  }).catch(e=>console.log(e));
  }, [newBlog])
  
  const blogObject ={
    title:"",
    userName:"",
    likes:0,
    content:"",
    imageUrl:"",
    avatar:""
  }
  const handleTitle =(e)=>{
    blogObject.title = e.target.value;
  }

  const handleUserName = (e)=>{
    blogObject.userName = e.target.value;
  }

  const handleLikes = (e)=>{
    movieObject.likes =parseInt(e.target.value);
    }

  const handleContent = (e)=>{
    movieObject.description = e.target.value;
  }

  const handleImageUrl = (e)=>{
    movieObject.poster=e.target.value;
  }

  const handleAvatar = (e)=>{
    
    const url = e.target.value;
    const urlArray = url.split("/");
    const id = urlArray[urlArray.length-1];
    console.log(id);
    blogObject.avatar=id;
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(blogObject);
    setNewBlog(blogObject);

  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="grid grid-cols-1 gap-4 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-4"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 mt-5 block">
            <Label htmlFor="title" value="Blog title" />
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
            <Label htmlFor="userName" value="Blog username" />
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
            <Label htmlFor="content" value="Blog content" />
          </div>
          <Textarea
            id="content"
            placeholder="Add content to your blog..."
            required
            rows={4}
            onChange={handleBlog}
          />
        </div>
        <div id="imageUrlUpload" className="max-w-md">
          <div className="mb-2 mt-5 block">
            <Label htmlFor="imageUrl" value="Upload imageUrl" />
          </div>
          <TextInput
            id="imageUrl"
            type="text"
            placeholder="Add a imageUrl for the blog"
            onChange={handleImageUrl}
            required
          />
        </div>
        <div>
          <div className="mb-2 mt-5 block">
            <Label htmlFor="avatar" value="Blog avatar" />
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
          Add Blog
        </Button>
      </form>
    </div>
  );
}

export default BlogForm;



