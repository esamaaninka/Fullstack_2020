import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    //content: 'Component testing is done with react-testing-library',
    //important: true
    author: 'Jaska Jokunen',
    title: 'Jaskan bloggaukset',
    url: 'www.blog.fi'
  }

  const component = render(
    <Blog blog={blog} />
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'Jaskan bloggaukset'
  )
  expect(component.container).toHaveTextContent(
    'Jaska Jokunen'
  )

  expect(component.container).not.toHaveTextContent(
    'www.blog.fi'
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Jaska Jokunen'
  )

  // number of likes was optional excercise

/* tämä ei löydä 
  const element = component.getByText(
    'Jaska Jokunen'
  )
  expect(element).toBeDefined()

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Jaska Jokunen'
  )
  */
})