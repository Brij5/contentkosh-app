import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ rounded }) => rounded ? '16px' : '8px'};
  padding: ${({ padding }) => padding || '1.5rem'};
  box-shadow: ${({ elevation }) => {
    switch (elevation) {
      case 'low':
        return '0 2px 4px rgba(0, 0, 0, 0.05)';
      case 'high':
        return '0 8px 16px rgba(0, 0, 0, 0.1)';
      default:
        return '0 4px 8px rgba(0, 0, 0, 0.08)';
    }
  }};
  border: ${({ bordered, theme }) => bordered ? `1px solid ${theme.borderColor}` : 'none'};
  transition: all 0.3s ease;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  height: ${({ fullHeight }) => fullHeight ? '100%' : 'auto'};
  overflow: hidden;
  position: relative;

  ${({ hoverable, theme }) => hoverable && `
    cursor: pointer;
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
      border-color: ${theme.primaryColor};
    }
  `}

  ${({ clickable }) => clickable && `
    cursor: pointer;
    &:active {
      transform: scale(0.98);
    }
  `}
`;

const CardHeader = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.25rem;
  font-weight: 600;
`;

const CardContent = styled.div`
  color: ${({ theme }) => theme.textColor};
`;

const CardFooter = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

const Card = ({
  children,
  title,
  footer,
  elevation = 'medium',
  rounded = false,
  bordered = false,
  hoverable = false,
  clickable = false,
  fullWidth = false,
  fullHeight = false,
  padding,
  className,
  onClick,
  initial,
  animate,
  exit,
  transition,
  ...props
}) => {
  return (
    <StyledCard
      elevation={elevation}
      rounded={rounded}
      bordered={bordered}
      hoverable={hoverable}
      clickable={clickable}
      fullWidth={fullWidth}
      fullHeight={fullHeight}
      padding={padding}
      className={className}
      onClick={onClick}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      {...props}
    >
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </StyledCard>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  footer: PropTypes.node,
  elevation: PropTypes.oneOf(['low', 'medium', 'high']),
  rounded: PropTypes.bool,
  bordered: PropTypes.bool,
  hoverable: PropTypes.bool,
  clickable: PropTypes.bool,
  fullWidth: PropTypes.bool,
  fullHeight: PropTypes.bool,
  padding: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  initial: PropTypes.object,
  animate: PropTypes.object,
  exit: PropTypes.object,
  transition: PropTypes.object
};

export default Card; 