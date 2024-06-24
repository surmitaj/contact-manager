import React from 'react'

function Contact({index, name, phone, handleDelete, handleEdit}) {
  return (
    <div className='contact-container' key={index}>
        <div>
            <div className='person-name'>{name}</div>
            <div className='person-phone'>{phone}</div>
        </div>
        <div className='btn-container'>
            <button className='btn btn-edit' onClick={() => handleEdit(index)}>Edit</button>
            <button className='btn btn-delete'onClick={() => handleDelete(index)}>Delete</button>
        </div>
    </div>
  )
}

export default Contact