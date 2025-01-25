import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const AccordionContainer = styled.div`
  width: 100%;
  border-radius: 12px;
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};

  &:last-child {
    border-bottom: none;
  }
`;

const AccordionHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
  }

  &:focus {
    outline: none;
    background: ${({ theme }) => theme.backgroundSecondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const IconWrapper = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
  color: ${({ theme }) => theme.textColorLight};

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const AccordionContent = styled(motion.div)`
  overflow: hidden;
`;

const ContentInner = styled.div`
  padding: 0 1.5rem 1.5rem;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.875rem;
  line-height: 1.6;
`;

const accordionVariants = {
  open: {
    height: 'auto',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  closed: {
    height: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }
};

const iconVariants = {
  open: {
    rotate: 180,
    transition: {
      duration: 0.2
    }
  },
  closed: {
    rotate: 0,
    transition: {
      duration: 0.2
    }
  }
};

const Accordion = ({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  onChange,
  className
}) => {
  const [expandedItems, setExpandedItems] = useState(defaultExpanded);

  const handleItemClick = (itemId) => {
    setExpandedItems((prevExpanded) => {
      let newExpanded;

      if (allowMultiple) {
        newExpanded = prevExpanded.includes(itemId)
          ? prevExpanded.filter(id => id !== itemId)
          : [...prevExpanded, itemId];
      } else {
        newExpanded = prevExpanded.includes(itemId) ? [] : [itemId];
      }

      onChange?.(newExpanded);
      return newExpanded;
    });
  };

  return (
    <AccordionContainer className={className}>
      {items.map((item) => {
        const isExpanded = expandedItems.includes(item.id);

        return (
          <AccordionItem key={item.id}>
            <AccordionHeader
              onClick={() => handleItemClick(item.id)}
              aria-expanded={isExpanded}
              aria-controls={`accordion-content-${item.id}`}
              disabled={item.disabled}
            >
              {item.title}
              <IconWrapper
                variants={iconVariants}
                initial="closed"
                animate={isExpanded ? 'open' : 'closed'}
              >
                <FiChevronDown />
              </IconWrapper>
            </AccordionHeader>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <AccordionContent
                  key={`content-${item.id}`}
                  variants={accordionVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <ContentInner id={`accordion-content-${item.id}`}>
                    {item.content}
                  </ContentInner>
                </AccordionContent>
              )}
            </AnimatePresence>
          </AccordionItem>
        );
      })}
    </AccordionContainer>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    disabled: PropTypes.bool
  })).isRequired,
  allowMultiple: PropTypes.bool,
  defaultExpanded: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  className: PropTypes.string
};

export default Accordion; 