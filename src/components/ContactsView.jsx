import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useContacts } from '../context/ContactContext';
import ContactCard from './ContactCard';

const ContactsView = () => {
  const { contacts, loading } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredContacts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return contacts.filter(contact => 
      contact.name?.toLowerCase().includes(term) || 
      contact.mobile?.includes(term)
    );
  }, [contacts, searchTerm]);

  const handleAddContact = () => navigate('/add'); 

  return (
    <div className="flex flex-col h-full bg-black relative p-4 rounded-lg">
      <div 
        onClick={handleAddContact}
        className="bg-[#83c6dd] cursor-pointer hover:bg-[#72b0c6] transition-colors py-4 px-4 flex items-center justify-center gap-2 rounded-sm mx-1 mt-1 shrink-0"
        title="Click to Add New Contact"
      >
        <h1 className="text-2xl font-normal text-white">All Contacts</h1>
        <div className="text-white flex items-center justify-center ml-1 mt-1">
          <PlusCircle strokeWidth={2} size={22} />
        </div>
      </div>

      <div className="flex justify-center shrink-0 z-10 mx-auto w-[55%] mt-5 mb-4 px-2">
        <input 
          type="text" 
          placeholder="Search Contact" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-md font-sans text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 shadow-sm border border-transparent"
        />
      </div>

      <div className="flex-1 overflow-y-auto w-full px-1 scrollbar-thin scrollbar-thumb-gray-800">
        {loading ? (
          <div className="text-center text-gray-400 py-10 animate-pulse">
            Loading contacts...
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            {searchTerm ? 'No contacts found for your search.' : 'No contacts available.'}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact, index) => (
              <ContactCard key={contact.id} contact={contact} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsView;
