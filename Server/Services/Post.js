const PostModel = require('../Models/Post');

exports.getPosts = async() => {
    return await  PostModel.find();
};

exports.getPost =async (id) => {
    return await PostModel.findById(id);
};

exports.insertPost = async (Post) => {
    return await PostModel.create(Post);
}

exports.updatePost = async (id, Post) => {
    return await PostModel.findByIdAndUpdate(id, Post);
}

exports.deletePost = async (id) => {
    return await PostModel.findByIdAndDelete(id);
}



