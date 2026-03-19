import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Trash2, Pencil, CircleUser } from 'lucide-react';
import { useContacts } from '../context/ContactContext';

const ACTION_BUTTON_CLASS = 'text-black hover:opacity-70 transition-opacity cursor-pointer';

const ActionButton = ({ onClick, title, icon }) => (
  <button
    onClick={onClick}
    className={ACTION_BUTTON_CLASS}
    title={title}
  >
    {icon}
  </button>
);

const ContactCard = ({ contact, index }) => {
  const { deleteContact } = useContacts();
  const navigate = useNavigate();

  const handleView = () => navigate(`/view/${contact.id}`);
  const handleDelete = () => deleteContact(contact.id);
  const handleEdit = () => navigate(`/edit/${contact.id}`);

  return (
    <div className="bg-white text-black p-3 rounded-lg flex items-center justify-between mb-3 shadow-md border-b-2 border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-3 flex-1">
        <span className="text-gray-600 font-semibold w-4 text-center">{index + 1}</span>
        <CircleUser className="w-7 h-7 text-black" strokeWidth={1.5} />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800 text-sm">{contact.name}</span>
          <span className="text-gray-500 text-xs">{contact.mobile}</span>
        </div>
      </div>

      <div className="flex items-center space-x-3 mx-10">
        <ActionButton onClick={handleView}   title="View Contact"   icon={<Eye size={20} strokeWidth={2} />} />
        <ActionButton onClick={handleDelete} title="Delete Contact" icon={<Trash2 size={20} strokeWidth={2} />} />
        <ActionButton onClick={handleEdit}   title="Edit Contact"   icon={<Pencil size={20} strokeWidth={2} />} />
      </div>
    </div>
  );
};

export default ContactCard;
