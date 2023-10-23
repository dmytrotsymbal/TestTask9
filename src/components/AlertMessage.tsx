import { Alert } from "react-bootstrap";

type Props = {
  error: string | null;
  setError: (error: string | null) => void;
};
const AlertMessage = ({ error, setError }: Props) => {
  return (
    <div className="alertMessageBackground">
      <Alert
        className="alertMessage"
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
