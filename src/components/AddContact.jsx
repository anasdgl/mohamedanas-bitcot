import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContacts } from '../context/ContactContext';
import ContactForm from './ContactForm';

const AddContact = () => {
  const { addContact } = useContacts();
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    addContact({ ...formData });
    navigate('/');
  };

  return (
    <ContactForm 
      formTitle="Add Contact" 
      onSubmit={handleSubmit} 
    />
  );
}; 

export default AddContact;
