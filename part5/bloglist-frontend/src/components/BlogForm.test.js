import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
  test('should receive correct form data on submit', () => {
    const data = {
      title: 'Test blog post',
      author: 'John doe',
      url: 'www.google.fi',
    }

    const mockHandler = jest.fn()
    const component = render(
      <BlogForm createNewBlog={mockHandler} />
    )

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, { target: { value: data.title } })
    fireEvent.change(author, { target: { value: data.author } })
    fireEvent.change(url, { target: { value: data.url } })
    fireEvent.submit(form)

    expect(mockHandler.mock.calls[0][0]).toEqual(data)
  })
})
