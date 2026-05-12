const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({})
  .populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)

})

// Create a new blog
blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const savedBlog = await blog
      .save()
      await savedBlog.populate('user', {username: 1, name: 1, id: 1})

      // add blog to user's blogs array
      await User.findByIdAndUpdate(savedBlog.user, {
            $push: { blogs: savedBlog._id }
      })
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

// Delete a blog

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    console.log('DELETE id:', request.params.id)
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    console.error('DELETE error:', error)
    next(error)
  }
})

// Update a blog

blogsRouter.put('/:id', async (request, response, next) => {
  try {
   
  await Blog.findByIdAndUpdate(request.params.id, request.body)
    response.status(200).end()
     console.log('update body:', request.body)
    } catch (error) {
    console.error('UPDATE error:', error)
    next(error)
  }
})
 
module.exports = blogsRouter
