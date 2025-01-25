import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledBadge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.25rem 0.5rem';
      case 'large':
        return '0.5rem 1rem';
      default:
        return '0.375rem 0.75rem';
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.75rem';
      case 'large':
        return '1rem';
      default:
        return '0.875rem';
    }
  }};
  font-weight: 500;
  border-radius: ${({ pill }) => pill ? '999px' : '6px'};
  background: ${({ variant, theme }) => {
    switch (variant) {
      case 'success':
        return theme.successColor + '20';
      case 'warning':
        return theme.warningColor + '20';
      case 'error':
        return theme.errorColor + '20';
      case 'info':
        return theme.infoColor + '20';
      default:
        return theme.primaryColor + '20';
    }
  }};
  color: ${({ variant, theme }) => {
    switch (variant) {
      case 'success':
        return theme.successColor;
      case 'warning':
        return theme.warningColor;
      case 'error':
        return theme.errorColor;
      case 'info':
        return theme.infoColor;
      default:
        return theme.primaryColor;
    }
  }};
  border: ${({ outlined, variant, theme }) => {
    if (!outlined) return 'none';
    const color = (() => {
      switch (variant) {
        case 'success':
          return theme.successColor;
        case 'warning':
          return theme.warningColor;
        case 'error':
          return theme.errorColor;
        case 'info':
          return theme.infoColor;
        default:
          return theme.primaryColor;
      }
    })();
    return `1px solid ${color}`;
  }};
  cursor: ${({ clickable }) => clickable ? 'pointer' : 'default'};
  transition: all 0.2s ease;
  white-space: nowrap;

  ${({ clickable, variant, theme }) => clickable && `
    &:hover {
      transform: translateY(-1px);
      background: ${(() => {
        switch (variant) {
          case 'success':
            return theme.successColor + '30';
          case 'warning':
            return theme.warningColor + '30';
          case 'error':
            return theme.errorColor + '30';
          case 'info':
            return theme.infoColor + '30';
          default:
            return theme.primaryColor + '30';
        }
      })()};
    }

    &:active {
      transform: translateY(0);
    }
  `}

  svg {
    width: ${({ size }) => {
      switch (size) {
        case 'small':
          return '0.875rem';
        case 'large':
          return '1.125rem';
        default:
          return '1rem';
      }
    }};
    height: ${({ size }) => {
      switch (size) {
        case 'small':
          return '0.875rem';
        case 'large':
          return '1.125rem';
        default:
          return '1rem';
      }
    }};
  }
`;

const Badge = ({
  children,
  variant = 'primary',
  size = 'medium',
  pill = false,
  outlined = false,
  clickable = false,
  className,
  onClick,
  initial,
  animate,
  exit,
  transition,
  ...props
}) => {
  return (
    <StyledBadge
      variant={variant}
      size={size}
      pill={pill}
      outlined={outlined}
      clickable={clickable}
      className={className}
      onClick={clickable ? onClick : undefined}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      {...props}
    >
      {children}
    </StyledBadge>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  pill: PropTypes.bool,
  outlined: PropTypes.bool,
  clickable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  initial: PropTypes.object,
  animate: PropTypes.object,
  exit: PropTypes.object,
  transition: PropTypes.object
};

export default Badge; 