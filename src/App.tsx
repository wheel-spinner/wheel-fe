import React from 'react';
import { AppProvider, WheelProvider } from './contexts';
import { WheelApp } from './components/WheelApp';
import './index.css';

function App() {
  return (
    <AppProvider>
      <WheelProvider>
        <WheelApp />
      </WheelProvider>
    </AppProvider>
  );
}

export default App;
