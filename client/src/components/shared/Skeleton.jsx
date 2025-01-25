import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const StyledSkeleton = styled.div`
  display: ${({ inline }) => inline ? 'inline-block' : 'block'};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '1rem'};
  border-radius: ${({ variant }) => {
    switch (variant) {
      case 'circular':
        return '50%';
      case 'rounded':
        return '8px';
      default:
        return '4px';
    }
  }};
  background: ${({ theme }) => theme.backgroundSecondary};
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.backgroundSecondary} 0%,
    ${({ theme }) => theme.borderColor} 50%,
    ${({ theme }) => theme.backgroundSecondary} 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  margin: ${({ margin }) => margin || '0'};

  ${({ variant }) => variant === 'text' && `
    margin-bottom: 0.5rem;
    
    &:last-child {
      width: 80%;
      margin-bottom: 0;
    }
  `}
`;

const SkeletonGroup = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ gap }) => gap || '1rem'};
  align-items: ${({ alignItems }) => alignItems || 'stretch'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  flex-wrap: ${({ wrap }) => wrap ? 'wrap' : 'nowrap'};
`;

const Skeleton = ({
  variant = 'text',
  width,
  height,
  count = 1,
  inline = false,
  margin,
  direction = 'column',
  gap,
  alignItems,
  justifyContent,
  wrap = false,
  className
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <StyledSkeleton
      key={index}
      variant={variant}
      width={width}
      height={height}
      inline={inline}
      margin={margin}
      className={className}
    />
  ));

  return count > 1 ? (
    <SkeletonGroup
      direction={direction}
      gap={gap}
      alignItems={alignItems}
      justifyContent={justifyContent}
      wrap={wrap}
    >
      {skeletons}
    </SkeletonGroup>
  ) : (
    skeletons[0]
  );
};

Skeleton.propTypes = {
  variant: PropTypes.oneOf(['text', 'rectangular', 'circular', 'rounded']),
  width: PropTypes.string,
  height: PropTypes.string,
  count: PropTypes.number,
  inline: PropTypes.bool,
  margin: PropTypes.string,
  direction: PropTypes.oneOf(['row', 'column']),
  gap: PropTypes.string,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  wrap: PropTypes.bool,
  className: PropTypes.string
};

export const SkeletonText = ({ lines = 3, lastLineWidth = '80%', ...props }) => (
  <>
    {Array.from({ length: lines - 1 }, (_, index) => (
      <Skeleton key={index} variant="text" {...props} />
    ))}
    <Skeleton variant="text" width={lastLineWidth} {...props} />
  </>
);

SkeletonText.propTypes = {
  lines: PropTypes.number,
  lastLineWidth: PropTypes.string
};

export const SkeletonAvatar = ({ size = '48px', ...props }) => (
  <Skeleton
    variant="circular"
    width={size}
    height={size}
    {...props}
  />
);

SkeletonAvatar.propTypes = {
  size: PropTypes.string
};

export const SkeletonButton = ({
  width = '120px',
  height = '40px',
  ...props
}) => (
  <Skeleton
    variant="rounded"
    width={width}
    height={height}
    {...props}
  />
);

SkeletonButton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
};

export const SkeletonCard = ({
  width = '300px',
  height = '200px',
  ...props
}) => (
  <Skeleton
    variant="rounded"
    width={width}
    height={height}
    {...props}
  />
);

SkeletonCard.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
};

export const SkeletonImage = ({
  width = '100%',
  height = '200px',
  ...props
}) => (
  <Skeleton
    variant="rectangular"
    width={width}
    height={height}
    {...props}
  />
);

SkeletonImage.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
};

export default Skeleton; 