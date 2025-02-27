import React, { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import { useParams } from "react-router-dom";

const index = () => {
  const { postId } = useParams();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    axios
      .get(`/api/comments/post/${postId}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex >= 0) {
    } else {
      axios
        .post(`/api/comments`, {
          postId: postId,
          content: newComment,
        })
        .then((response) => {
          setComments([...comments, response.data]);
        })
        .catch((error) => console.error(error));
    }
    setNewComment("");
  };

  const handleSaveEdit = () => {
    const commentId = comments[editingIndex]._id;
    axios
      .put(`/api/comments/${commentId}`, {
        content: newComment,
      })
      .then((response) => {
        const updatedComments = comments.map((comment, index) =>
          index === editingIndex ? response.data : comment
        );
        setComments(updatedComments);
        setEditingIndex(-1);
        setNewComment("");
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (index) => {
    const commentId = comments[index]._id;
    axios
      .delete(`/api/comments/${commentId}`)
      .then(() => {
        const updatedComments = comments.filter((_, i) => i !== index);
        setComments(updatedComments);
      })
      .catch((error) => console.error(error));
  };

  const handleNewComment = (e) => {
    e.preventDefault();
    setNewComment(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-6 max-w-6xl  mb-4 w-full">
        <h2 className="px-4 pt-3 mx-auto pb-2 text-gray-800 md:text-4xl">
          Responses From Readers
        </h2>
        <form className="w-full bg-custom-gray rounded-xl px-4 pt-2 dark:bg-inherit">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea
                className="bg-custom-gray border-none  leading-normal dark:bg-custom-gray dark:placeholder:text-white resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:ring-0 focus:outline-none "
                name="body"
                placeholder="What is on your mind?"
                required
                onChange={handleNewComment}
                value={newComment}
              ></textarea>
            </div>
            <div className="flex items-center flex-grow ">
              <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto"></div>
              <div className="w-full md:w-full flex items-start px-3">
                <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto"></div>
                <div className="-mr-1">
                  <input
                    type="submit"
                    className="cursor-pointer text-black font-medium py-1 px-4 border bg-white   rounded-lg tracking-wide mr-1 hover:bg-gray-300 hover:text-black"
                    value="Post comment"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <section className="relative flex items-center justify-start mb-6  antialiased min-full  ">
        <div className="container  ">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="flex-col py-4 mx-auto mt-3 bg-white border-b-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:shadow-sm dark:bg-inherit"
            >
              <div className="flex flex-row">
                <div className="relative">
                  <img
                    className="object-cover w-12 h-12 rounded-3xl border-gray-300 dark:hidden"
                    alt="User avatar"
                    src={comment.userId.avatar}
                  />
                  {comment.userId.flag && (
                    <i
                      className={`fi-${comment.userId.flag} absolute -right-2 top-1/2 transform -translate-y-1/2 h-3 w-4  `}
                      style={{ top: "22%", transform: "translateY(-50%)" }}
                      title={`${comment.userId.flag.toUpperCase()} flag`}
                    ></i>
                  )}
                </div>
                <div className="flex-col mt-1">
                  <div className="flex flex-col gap-2 flex-1 px-4 font-bold leading-tight">
                    <h2>
                      {comment.userId &&
                        `${comment.userId.firstName} ${comment.userId.lastName}`}
                    </h2>
                    <span className="text-xs flex font-normal text-gray-500 dark:text-white">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex-1 mt-2 px-2 ml-2 text-sm font-medium leading-loose text-gray-600 dark:text-white">
                    {comment.content}
                  </div>
                  <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column">
                    {/* Reply button icon */}
                  </button>
                  <button className="inline-flex items-center px-1 -ml-1 flex-column">
                    {/* Delete button icon */}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default index;
