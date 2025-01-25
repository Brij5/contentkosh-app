import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const StyledAvatar = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ size }) => {
    switch (size) {
      case 'small':
        return '32px';
      case 'large':
        return '64px';
      default:
        return '48px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small':
        return '32px';
      case 'large':
        return '64px';
      default:
        return '48px';
    }
  }};
  border-radius: ${({ square }) => square ? '8px' : '50%'};
  background: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return theme.primaryColor + '20';
      case 'secondary':
        return theme.secondaryColor + '20';
      default:
        return theme.backgroundSecondary;
    }
  }};
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return theme.primaryColor;
      case 'secondary':
        return theme.secondaryColor;
      default:
        return theme.textColor;
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.875rem';
      case 'large':
        return '1.5rem';
      default:
        return '1.125rem';
    }
  }};
  font-weight: 600;
  border: ${({ bordered, theme }) => bordered ? `2px solid ${theme.borderColor}` : 'none'};
  overflow: hidden;
  cursor: ${({ clickable }) => clickable ? 'pointer' : 'default'};
  transition: all 0.2s ease;

  ${({ clickable }) => clickable && `
    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StatusDot = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${({ size }) => {
    switch (size) {
      case 'small':
        return '8px';
      case 'large':
        return '16px';
      default:
        return '12px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small':
        return '8px';
      case 'large':
        return '16px';
      default:
        return '12px';
    }
  }};
  border-radius: 50%;
  background: ${({ status, theme }) => {
    switch (status) {
      case 'online':
        return theme.successColor;
      case 'away':
        return theme.warningColor;
      case 'busy':
        return theme.errorColor;
      default:
        return theme.textColorLight;
    }
  }};
  border: 2px solid ${({ theme }) => theme.cardBackground};
`;

const Avatar = ({
  src,
  name,
  size = 'medium',
  variant = 'default',
  square = false,
  bordered = false,
  clickable = false,
  status,
  className,
  onClick,
  initial,
  animate,
  exit,
  transition,
  ...props
}) => {
  return (
    <StyledAvatar
      size={size}
      variant={variant}
      square={square}
      bordered={bordered}
      clickable={clickable}
      className={className}
      onClick={clickable ? onClick : undefined}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      {...props}
    >
      {src ? (
        <img src={src} alt={name || 'avatar'} />
      ) : (
        getInitials(name)
      )}
      {status && <StatusDot size={size} status={status} />}
    </StyledAvatar>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  square: PropTypes.bool,
  bordered: PropTypes.bool,
  clickable: PropTypes.bool,
  status: PropTypes.oneOf(['online', 'away', 'busy', 'offline']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  initial: PropTypes.object,
  animate: PropTypes.object,
  exit: PropTypes.object,
  transition: PropTypes.object
};

export default Avatar; 