import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-4">404</h1>
          <p className="lead">Page Not Found</p>
          <p>Oops! The page you are looking for does not exist.</p>

          <Link to="/" className="btn btn-primary">
            Go to homepage
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
