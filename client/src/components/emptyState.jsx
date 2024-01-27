import { Container } from 'react-bootstrap';

const EmptyState = () => {
  return (
    <Container className='d-flex justify-content-center align-items-center border p-4'>
      <p className='fw-bold'>No task added!!</p>
    </Container>
  );
};

export default EmptyState;
