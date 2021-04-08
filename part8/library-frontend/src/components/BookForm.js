import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import { useQuery } from '@apollo/client'
import { CREATE_BOOK } from '../queries'

const BookForm = () => {
    const [title, setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genres, setGenres] = useState([])

    const [ createBook ] = useMutation(CREATE_BOOK)

    const submit = (event) => {
        event.preventDefault()
  
        createBook({variables: {title, author, published,genres}})
        setTitle('')
        setAuthor('')
        setPublished('')
        setGenres('')
    }
    return(
        null
    )
}

export default BookForm