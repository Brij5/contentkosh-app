import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContainer = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  width: 100%;
  max-width: ${({ size }) => {
    switch (size) {
      case 'small':
        return '400px';
      case 'large':
        return '800px';
      case 'full':
        return '95%';
      default:
        return '600px';
    }
  }};
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  outline: none;
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.25rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColorLight};
  cursor: pointer;
  padding: 0.5rem;
  margin: -0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
    color: ${({ theme }) => theme.textColor};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primaryColor};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const ModalContent = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  color: ${({ theme }) => theme.textColor};
  flex: 1;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.backgroundSecondary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.borderColor};
    border-radius: 4px;
    
    &:hover {
      background: ${({ theme }) => theme.textColorLight};
    }
  }
`;

const ModalFooter = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const overlayVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2
    }
  }
};

const modalVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2
    }
  }
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOverlayClick = true,
  showCloseButton = true,
  className,
  initialFocus,
  onAnimationComplete
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      // Focus management
      if (initialFocus && initialFocus.current) {
        initialFocus.current.focus();
      } else if (modalRef.current) {
        modalRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';

      // Restore focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose, initialFocus]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const getFocusableElements = () => {
    if (!modalRef.current) return [];
    return modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  };

  const handleTabKey = (event) => {
    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!event.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      event.preventDefault();
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      event.preventDefault();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      handleTabKey(event);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          onClick={handleOverlayClick}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <ModalContainer
            ref={modalRef}
            size={size}
            className={className}
            variants={modalVariants}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            onAnimationComplete={onAnimationComplete}
          >
            <ModalHeader>
              <Title id="modal-title">{title}</Title>
              {showCloseButton && (
                <CloseButton
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <FiX />
                </CloseButton>
              )}
            </ModalHeader>
            <ModalContent role="document">{children}</ModalContent>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
  closeOnOverlayClick: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  className: PropTypes.string,
  initialFocus: PropTypes.shape({ current: PropTypes.any }),
  onAnimationComplete: PropTypes.func
};

export default Modal; 