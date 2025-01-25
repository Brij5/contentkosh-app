import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ServiceCard = ({ service, theme }) => {
  return (
    <Card theme={theme}>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      {service.features && (
        <ul>
          {service.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      )}
    </Card>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  theme: PropTypes.object.isRequired
};

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
