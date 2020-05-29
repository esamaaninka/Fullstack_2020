import React from 'react'

const Persons =({personlist, namefilter, deletePerson}) => {
    // check persons list against filter case insensitive, and display only matching ones
    return (
      <div>
        {personlist.filter(p => p.name.toLowerCase()
                  .includes(namefilter.toLowerCase()) )
                  .map(p => <p key={p.name}> 
                  {p.name + ' ' + p.number + ' '}
                  <button onClick={() => {
                    //console.log('Button delete: ', p.id)
                    if(window.confirm(`Want to delete ${p.name}`))
                      deletePerson(p.id)
                  }}>delete</button>                  
                  </p>)
      }
      </div>
    )
  }

  export default Persons
