import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipContent = styled(motion.div)`
  position: absolute;
  z-index: 1000;
  padding: 0.5rem 0.75rem;
  background: ${({ theme }) => theme.textColor};
  color: ${({ theme }) => theme.cardBackground};
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  pointer-events: none;

  ${({ position }) => {
    switch (position) {
      case 'top':
        return `
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 0.5rem;
        `;
      case 'bottom':
        return `
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 0.5rem;
        `;
      case 'left':
        return `
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 0.5rem;
        `;
      case 'right':
        return `
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 0.5rem;
        `;
      default:
        return '';
    }
  }}

  &::before {
    content: '';
    position: absolute;
    border: 0.25rem solid transparent;

    ${({ position, theme }) => {
      switch (position) {
        case 'top':
          return `
            border-top-color: ${theme.textColor};
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
          `;
        case 'bottom':
          return `
            border-bottom-color: ${theme.textColor};
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
          `;
        case 'left':
          return `
            border-left-color: ${theme.textColor};
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
          `;
        case 'right':
          return `
            border-right-color: ${theme.textColor};
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
          `;
        default:
          return '';
      }
    }}
  }
`;

const tooltipVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1
    }
  }
};

const Tooltip = ({
  children,
  content,
  position = 'top',
  delay = 0,
  className
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  return (
    <TooltipContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
      <AnimatePresence>
        {isVisible && content && (
          <TooltipContent
            position={position}
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {content}
          </TooltipContent>
        )}
      </AnimatePresence>
    </TooltipContainer>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  delay: PropTypes.number,
  className: PropTypes.string
};

export default Tooltip; 