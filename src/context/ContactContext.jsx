import React, { createContext, useState, useEffect, useContext } from 'react';

const CONTACTS_API_URL = 'https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json';

const ContactContext = createContext();

export const useContacts = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(CONTACTS_API_URL);
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const addContact = (contact) => {
    const newContact = { ...contact, id: Date.now() };
    setContacts((prev) => [...prev, newContact]);
  };

  const updateContact = (id, updatedData) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...updatedData, id } : contact
      )
    );
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  return (
    <ContactContext.Provider value={{ contacts, loading, addContact, updateContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};
