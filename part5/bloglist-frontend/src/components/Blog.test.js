import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import Blog from './Blog'

describe('Blog', () => {
  const blog = {
    title: 'Test blog post',
    author: 'John Doe',
  }
  let component
  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <Blog blog={blog} handleBlogLike={mockHandler} />
    )
  })

  test('should have title', () => {
    const title = component.container.querySelector('.blog-title')
    expect(title).toHaveTextContent('Test blog post')
  })

  test('should have author', () => {
    const author = component.container.querySelector('.blog-author')
    expect(author).toHaveTextContent('John Doe')
  })

  test('should not display togglable content by default', () => {
    const content = component.container.querySelector('.togglable-content')
    expect(content).toHaveStyle({ display: 'none' })
  })

  test('should display togglable content after show button is clicked', () => {
    const content = component.container.querySelector('.togglable-content')
    const show = component.container.querySelector('.togglable-show')
    fireEvent.click(show)
    expect(content).not.toHaveStyle({ display: 'none' })
  })

  test('should call like button handler as many time as button is clicked', () => {
    const like = component.container.querySelector('.blog-like')
    fireEvent.click(like)
    fireEvent.click(like)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
