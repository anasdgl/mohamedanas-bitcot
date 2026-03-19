import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContactProvider } from './context/ContactContext';
import ContactsView from './components/ContactsView';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import ViewContactDetails from './components/ViewContactDetails';

class InnerBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("App Error Boundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="bg-red-900/20 border border-red-500 text-red-100 p-6 rounded-lg shadow-xl">
            <h1 className="text-xl font-bold mb-2">Something went wrong.</h1>
            <p>Please refresh the page or try again later.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const ErrorBoundary = ({ children }) => <InnerBoundary>{children}</InnerBoundary>;

function MainApp() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-8 flex flex-col  justify-start">
      <div className="w-full max-w-[450px] bg-black text-white relative flex flex-col h-[600px] overflow-hidden rounded-xl shadow-2xl transition-all duration-300">
        <ContactsView />
      </div>
      <Routes>
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit/:id" element={<EditContact />} />
        <Route path="/view/:id" element={<ViewContactDetails />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ContactProvider>
        <BrowserRouter>
          <MainApp />
        </BrowserRouter>
      </ContactProvider>
    </ErrorBoundary>
  );
}

export default App;
