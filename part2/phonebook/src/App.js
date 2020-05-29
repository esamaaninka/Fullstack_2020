import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import NameForm from './components/NameForm'
import personService from './services/Persons'
import Notification from './services/Notification'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ errorMessage, setErrorMessage] = useState(null)
  const [ errorFlag, setErrorFlag] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersonList => {
        setPersons(initialPersonList)
      })
  }, [])

  const addName = (event) => { 
    event.preventDefault()
    
    // check person if already included, if yes either ok to update number or cancel
    if(persons.map(person => person.name).includes(newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`))
       {
        var changedPerson = persons.filter(p => p.name === newName)
        
        const nameObject = {
          name: changedPerson[0].name,
          number: newNumber
         }
        
        changedPerson[0].number = newNumber    
        
        personService
          .update(changedPerson[0].id, nameObject)
          .then(updatedPerson => {
            //console.log('Update the person number in memory:', updatedPerson)
            setPersons(persons.map(p => p.id !== changedPerson.id ? p : updatedPerson ))
            setErrorMessage(`Updated ${newName} number with: ${newNumber}`)
            setTimeout(() => {
              setErrorMessage(null)
            },5000)
          })
          .catch(error => {
            setErrorFlag(true)
            setErrorMessage(`Note! ${newName} has been already removed from server.`)
            setPersons(persons.filter(p => p.name !== newName))
            //console.log('Persons after error: ', persons)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000) 
          })
          setNewName('')
          setNewNumber('')
          setErrorFlag(false)
      }
    }
    //
    // person not included yet, create new record
    else {
      const nameObject = {
          name: newName,
          number: newNumber,
          //id: will be set by PersonService
      }
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage(`Added ${newName} with number ${newNumber}`)
          console.log('add new name, set error flag false')
          setErrorFlag(false) 
          setTimeout(() => {
            setErrorMessage(null)
          },5000)
          setNewName('')
          setNewNumber('')
        })        
      }
  }

  const deletePerson = (id) => {
      personService
        .deletePerson(id)
        .then(returnedPerson => {
          //remove the id person
          setPersons(persons.filter(f => f.id !== id))
        })
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const filterNames = (event) => setNameFilter(event.target.value)
  

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={errorMessage} errorFlag={errorFlag} />
        <Filter nameFilter={nameFilter} filterNames={filterNames}/>
      <h3>Add a new</h3>
        <NameForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
        <Persons personlist={persons} namefilter={nameFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App

