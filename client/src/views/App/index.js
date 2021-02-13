import React from 'react';
import { AuthenticatedApp } from './AuthenticatedApp';
import { UnauthenticatedApp } from './UnauthenticatedApp';

export function App() {
  const user = false;
  
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}
