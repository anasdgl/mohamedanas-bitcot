import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContacts } from '../context/ContactContext';
import ContactForm from './ContactForm';

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contacts, updateContact, loading } = useContacts();

  const contactToEdit = contacts.find(c => c.id.toString() === id);

  useEffect(() => {
    if (!loading && !contactToEdit) {
      navigate('/');
    }
  }, [loading, contactToEdit, navigate]);

  const handleSubmit = (formData) => {
    updateContact(Number(id), formData);
    navigate('/');
  };

  if (!contactToEdit) return null;

  const initialData = {
    name: contactToEdit.name,
    mobile: contactToEdit.mobile,
    email: contactToEdit.email || '',
    address: contactToEdit.address || ''
  };

  return (
    <ContactForm 
      initialData={initialData} 
      formTitle="Edit Contact" 
      onSubmit={handleSubmit} 
    />
  );
};

export default EditContact;
