import { useEffect, useState } from 'react';
import './App.css';
import Contact from './Contact';
import Form from './Form';

function App() {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [contacts, setContacts] = useState([])
  const [edit, setEdit] = useState('')

  useEffect(()=>{
    fetchData()
  },[])


  function handleDelete(index) {
    //DELETE call
    fetch(`https://jsonplaceholder.typicode.com/users/${index}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error)); 
    const updatedContacts = contacts.filter(i=> i.id !== index)
    setContacts(updatedContacts)
  }

  function handleAdd(name, phone) {
    //POST call
    fetch(`https://jsonplaceholder.typicode.com/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name, phone}) 
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error)); 
    const updatedContacts = [...contacts, {id: contacts.length+1, name, phone}]
    setContacts(updatedContacts)
    console.log(updatedContacts)
  }

  async function handleEdit(index, name, phone) {
    //PUT call
    fetch(`https://jsonplaceholder.typicode.com/users/${index}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name, phone}) 
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error)); 
    const updatedContacts = contacts.map((contact, i) => 
      i === index-1 ? { ...contact, name, phone } : contact
    );
    setContacts(updatedContacts)
  }

  const fetchData = async() => {
    try {
      //GET call
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const contactDetails = await response.json()
      setContacts(contactDetails)
      setLoading(false)
    } catch(error) {
      setError(error)
    }
  }

  return (
    <div className="contact-app-wrapper">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!isLoading && !error && !edit && <button className='btn btn-add' onClick={() => setEdit('add')}>+ Add new contact</button>}

      { edit ? <Form index={edit} contacts={contacts} viewContacts={()=>setEdit('')} handleEdit={handleEdit} handleAdd={handleAdd}/> : contacts &&
        contacts.map((contact) => {
        return (<Contact index={contact.id} name={contact.name} phone={contact.phone} handleDelete={handleDelete} handleEdit={(index) => setEdit(index)}/>)
      })
      }
    </div>
  );
}

export default App;
