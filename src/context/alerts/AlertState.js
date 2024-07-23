import React, { useState } from 'react';
import AlertContext from './AlertContext';

const AlertState = (props) => {
  const [alert, setAlert] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const showAlert = (msg, type) => {
    setAlert({
      massege: msg,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ alert, loadingProgress, setLoadingProgress, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState;