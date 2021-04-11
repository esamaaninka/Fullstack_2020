  
import React, {useState} from 'react'

import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [editBday] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}, {query: ALL_BOOKS}]
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    //console.log('Author form trying to updade bdate ', author, born, typeof born)

    editBday({ variables: { author, bdate: born }})

    setAuthor('')
    setBorn('')
  }
  if (result.loading)  {
    return <div>loading...</div>
  }
 
  const authors = result.data.allAuthors
 
  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
            <div>
              author
              <input
                value={author}
                onChange={({target}) => setAuthor(target.value)}
                />
            </div>
            <div>
              born
              <input
                value={born}
                onChange={({ target }) => {
                  //console.log('parsing input to', target.value, parseInt(target.value))
                  setBorn(parseInt(target.value))
                  }
                }
              />
            </div>
            <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
