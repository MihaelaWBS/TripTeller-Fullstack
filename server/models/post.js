const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Post title is required!']
    },
    content: {
      type: String, 
      required: [true, 'Post content is required!']
    },
    likes: {
      type: Number,
      default: 0 
    },


    /*Here below I added username, imageUrl and avatar so that we use them in the cards rendered in Blogdashboard */

    firstName: {
      type: String,
      required: [true, 'First name is required!']
    }, 

    lastName: {
      type: String,
      required: [true, 'Last name is required!']
    },

    imageUrl: {
      type: String,
      required: [true, 'Image Url is required!']
    }, 

    avatar: {
      type: String,
      required: [true, 'Avatar is required!']
    }


  },
  { timestamps: true } 
);

module.exports = mongoose.model('Post', postSchema);
