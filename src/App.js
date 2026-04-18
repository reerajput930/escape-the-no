import React, { useState } from 'react';
import './App.css';
import InvitePage from './InvitePage';
import SuccessPage from './SuccessPage';

function App() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="app-root">
      {success ? <SuccessPage /> : <InvitePage onSuccess={() => setSuccess(true)} />}
    </div>
  );
}

export default App;
