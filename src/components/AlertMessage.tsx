import { Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../styles/AlertMessage.scss";

type Props = {
  error: string | null;
  setError: (error: string | null) => void;
};

const AlertMessage = ({ error, setError }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={`alertMessageBackground ${isVisible ? "visible" : ""}`}>
      <Alert
        className={`alertMessage ${isVisible ? "visible" : ""}`}
        variant="danger"
        onClose={() => setError(null)}
        dismissible
      >
        {error}
      </Alert>
    </div>
  );
};

export default AlertMessage;
