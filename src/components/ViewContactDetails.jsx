import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContacts } from '../context/ContactContext';
import { X } from 'lucide-react';

const ViewContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contacts, loading } = useContacts();

  const contact = contacts.find(c => c.id.toString() === id);

  useEffect(() => {
    if (!loading && !contact) {
      navigate('/');
    }
  }, [loading, contact, navigate]);

  if (!contact) return null;

  const handleClose = () => navigate('/');

  const contactFields = [
    { label: 'Name', value: contact.name },
    { label: 'Email', value: contact.email || "Not Provided" },
    { label: 'Number', value: contact.mobile },
    { label: 'Address', value: contact.address || "Not Provided" }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-15 px-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-lg w-full sm:w-[450px] shadow-2xl flex flex-col text-gray-800 my-8">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-medium text-gray-400">Contact Details</h2>
          <button 
            type="button"
            onClick={handleClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
            aria-label="Close Overview"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 bg-[#EFF8FF] rounded-b-lg">
          <div className="border bg-white border-gray-100 rounded-md p-6 flex flex-col space-y-3 shadow-inner">
            
            {contactFields.map((field) => (
              <div key={field.label} className="flex items-start text-[14px]">
                <div className="w-24 text-right font-semibold text-gray-800 mr-3 shrink-0">{field.label} :</div>
                <div className="flex-1 font-medium text-black leading-snug break-all">{field.value}</div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewContactDetails;
