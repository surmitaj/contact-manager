import React, { useState } from 'react'

function Form({index, contacts, viewContacts, handleEdit, handleAdd}) {
    const [contactName, setContactName] = useState(index !== 'add' ? contacts[index-1].name : '')
    const [contactNum, setContactNum] = useState(index  !== 'add' ? contacts[index-1].phone : '')
    const [isError, setIsError] = useState(false)
    function handleSave() {
        if(!contactName || !contactNum){
            setIsError(true)
            return
        }
        setIsError(false)
        if(index != 'add') {
            handleEdit(index, contactName, contactNum)
        } else {
            handleAdd(contactName, contactNum)
        }
        viewContacts()
    }

  return (
    <div className='form-wrapper'>
        <div className='form-container'>
            <div className='input-wrapper'>
                <label htmlFor='contactname'>Name: </label>
                <input name='contactname' value={contactName} onChange={(e) => setContactName(e.target.value)}/>
            </div>
            <div className='input-wrapper'>
                <label htmlFor='contactnum'>Phone: </label>
                <input name='contactnum' value={contactNum} onChange={(e) => setContactNum(e.target.value)}/>
            </div>
            {isError && <span style={{color: "red"}}>Please enter name and contact number!!!!</span>}
            <button className='btn btn-save' onClick={handleSave}> Save </button>
        </div>
        <div style={{padding: '3px', margin: '5px'}}>OR</div>
        <button className='btn btn-view' onClick={viewContacts}>View Contacts</button>
    </div>
  )
}

export default Form