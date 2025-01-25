import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProgressContainer = styled.div`
  width: 100%;
`;

const ProgressLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.875rem;
`;

const ProgressTitle = styled.span`
  font-weight: 500;
`;

const ProgressValue = styled.span`
  color: ${({ theme }) => theme.textColorLight};
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.5rem';
      case 'large':
        return '1rem';
      default:
        return '0.75rem';
    }
  }};
  background: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: ${({ theme, variant }) => {
    switch (variant) {
      case 'success':
        return theme.successColor;
      case 'error':
        return theme.errorColor;
      case 'warning':
        return theme.warningColor;
      case 'info':
        return theme.infoColor;
      default:
        return theme.primaryColor;
    }
  }};
  border-radius: 999px;
  transition: width 0.3s ease;

  ${({ striped }) => striped && `
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1rem 1rem;
  `}

  ${({ animated }) => animated && `
    animation: progress-bar-stripes 1s linear infinite;

    @keyframes progress-bar-stripes {
      from {
        background-position: 1rem 0;
      }
      to {
        background-position: 0 0;
      }
    }
  `}
`;

const Steps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme, active, completed }) =>
    completed ? theme.primaryColor : active ? theme.textColor : theme.textColorLight};
  font-size: 0.75rem;
  font-weight: ${({ active, completed }) => (active || completed) ? '500' : '400'};
`;

const StepDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${({ theme, active, completed }) =>
    completed ? theme.primaryColor : active ? theme.textColor : theme.borderColor};
`;

const Progress = ({
  value = 0,
  min = 0,
  max = 100,
  variant = 'primary',
  size = 'medium',
  label,
  showValue = true,
  striped = false,
  animated = false,
  steps,
  className
}) => {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const currentStep = steps ? Math.floor((steps.length - 1) * (percentage / 100)) : null;

  return (
    <ProgressContainer className={className}>
      {(label || showValue) && (
        <ProgressLabel>
          {label && <ProgressTitle>{label}</ProgressTitle>}
          {showValue && (
            <ProgressValue>
              {value.toLocaleString()}{max > 100 && `/${max.toLocaleString()}`}
            </ProgressValue>
          )}
        </ProgressLabel>
      )}
      <ProgressTrack size={size}>
        <ProgressBar
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          variant={variant}
          striped={striped}
          animated={animated && striped}
        />
      </ProgressTrack>
      {steps && (
        <Steps>
          {steps.map((step, index) => (
            <Step
              key={index}
              active={index === currentStep}
              completed={index < currentStep}
            >
              <StepDot
                active={index === currentStep}
                completed={index < currentStep}
              />
              {step}
            </Step>
          ))}
        </Steps>
      )}
    </ProgressContainer>
  );
};

Progress.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  variant: PropTypes.oneOf(['primary', 'success', 'error', 'warning', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string,
  showValue: PropTypes.bool,
  striped: PropTypes.bool,
  animated: PropTypes.bool,
  steps: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string
};

export default Progress; 