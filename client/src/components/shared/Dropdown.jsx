import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.textColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
    border-color: ${({ theme }) => theme.primaryColor};
  }

  svg {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s ease;
    transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const DropdownContent = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.5rem);
  ${({ align }) => align === 'right' ? 'right: 0' : 'left: 0'};
  min-width: 200px;
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.875rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
  }

  &:active {
    background: ${({ theme }) => theme.primaryColor + '20'};
  }

  svg {
    width: 1rem;
    height: 1rem;
    color: ${({ theme }) => theme.textColorLight};
  }

  ${({ disabled, theme }) => disabled && `
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: none;
    }
  `}

  ${({ selected, theme }) => selected && `
    background: ${theme.primaryColor + '20'};
    color: ${theme.primaryColor};
    font-weight: 500;

    svg {
      color: ${theme.primaryColor};
    }

    &:hover {
      background: ${theme.primaryColor + '30'};
    }
  `}
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.borderColor};
  margin: 0.5rem 0;
`;

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2
    }
  }
};

const Dropdown = ({
  trigger,
  items,
  align = 'left',
  className,
  onSelect,
  selectedValue
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    if (!item.disabled) {
      onSelect?.(item);
      setIsOpen(false);
    }
  };

  return (
    <DropdownContainer ref={dropdownRef} className={className}>
      {trigger ? (
        <div onClick={() => setIsOpen(!isOpen)}>
          {trigger}
        </div>
      ) : (
        <DropdownTrigger
          onClick={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
          type="button"
        >
          {selectedValue?.label || 'Select option'}
          <FiChevronDown />
        </DropdownTrigger>
      )}

      <AnimatePresence>
        {isOpen && (
          <DropdownContent
            align={align}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
          >
            {items.map((item, index) => (
              <React.Fragment key={item.value || index}>
                {item.divider ? (
                  <Divider />
                ) : (
                  <DropdownItem
                    onClick={() => handleSelect(item)}
                    disabled={item.disabled}
                    selected={selectedValue?.value === item.value}
                    type="button"
                  >
                    {item.icon}
                    {item.label}
                  </DropdownItem>
                )}
              </React.Fragment>
            ))}
          </DropdownContent>
        )}
      </AnimatePresence>
    </DropdownContainer>
  );
};

Dropdown.propTypes = {
  trigger: PropTypes.node,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.any,
    icon: PropTypes.node,
    disabled: PropTypes.bool,
    divider: PropTypes.bool
  })).isRequired,
  align: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
  onSelect: PropTypes.func,
  selectedValue: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.any
  })
};

export default Dropdown; 