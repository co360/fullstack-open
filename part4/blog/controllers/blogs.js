const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");

blogsRouter.get("/", async (request, response) => {
  try {
  const blogs = await Blog.find({});
  response.json(blogs);
  } catch (exception) {
    next(exception)
  }
  })

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);


  const savedBlog = await blog.save()
    response.status(201).json(savedBlog);
  });

module.exports = blogsRouter;