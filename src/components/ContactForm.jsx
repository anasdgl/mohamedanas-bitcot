import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const ContactForm = ({ initialData, onSubmit, formTitle }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState(
    initialData || { name: '', email: '', mobile: '', address: '' }
  );
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Required';
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'Must be exactly 10 digits';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleReset = () => {
    setFormData(initialData || { name: '', email: '', mobile: '', address: '' });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleClose = () => navigate('/');

  const fields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter Your Name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Your Email' },
    { name: 'mobile', label: 'PhoneNumber', type: 'tel', placeholder: 'Enter Your Phone Number' },
    { name: 'address', label: 'Address', type: 'text', placeholder: 'Enter your Address' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-15 px-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-lg w-full sm:w-[400px] shadow-2xl flex flex-col text-gray-800 my-8">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-medium text-gray-400">{formTitle}</h2>
          <button 
            type="button"
            onClick={handleClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
            aria-label="Close Modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="py-8 flex justify-center w-full">
          <form onSubmit={handleSubmit} className="space-y-5 w-[85%]">
            
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col">
                <label htmlFor={`form-${field.name}`} className="text-[14px] font-normal text-gray-600 mb-1">
                  {field.label}:
                </label>
                <input 
                  id={`form-${field.name}`}
                  name={field.name} 
                  type={field.type}
                  value={formData[field.name]} 
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md transition-all ${
                    errors[field.name] ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-400'
                  } text-black font-medium text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400`}
                  placeholder={field.placeholder}
                />
                {errors[field.name] && (
                  <span className="text-red-500 text-xs mt-1 font-medium">{errors[field.name]}</span>
                )}
              </div>
            ))}

            <div className="pt-4 flex gap-4">
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow-md active:scale-95 transition-all text-sm font-semibold cursor-pointer"
              >
                Submit
              </button>
              <button 
                type="button" 
                onClick={handleReset}
                className="bg-gray-800 hover:bg-black text-white px-6 py-2 rounded shadow-md active:scale-95 transition-all text-sm font-semibold cursor-pointer"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;