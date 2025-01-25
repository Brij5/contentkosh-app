import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const BreadcrumbsContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: ${({ theme, active }) => active ? theme.textColor : theme.textColorLight};
  white-space: nowrap;

  &:last-child {
    .separator {
      display: none;
    }
  }
`;

const BreadcrumbLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
    background: ${({ theme }) => theme.backgroundSecondary};
  }

  svg {
    width: 1rem;
    height: 1rem;
    margin-right: ${({ hasLabel }) => hasLabel ? '0.25rem' : '0'};
  }
`;

const BreadcrumbText = styled.span`
  padding: 0.25rem 0.5rem;
  font-weight: 500;
`;

const Separator = styled.span`
  display: flex;
  align-items: center;
  margin: 0 0.25rem;
  color: ${({ theme }) => theme.textColorLight};

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0
  }
};

const Breadcrumbs = ({
  items,
  homeLink = '/',
  showHomeIcon = true,
  separator = <FiChevronRight />,
  className
}) => {
  return (
    <BreadcrumbsContainer
      aria-label="Breadcrumb"
      className={className}
    >
      <BreadcrumbList>
        {showHomeIcon && (
          <BreadcrumbItem
            as={motion.li}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.2 }}
          >
            <BreadcrumbLink
              to={homeLink}
              aria-label="Home"
              hasLabel={false}
            >
              <FiHome />
            </BreadcrumbLink>
            <Separator className="separator" aria-hidden="true">
              {separator}
            </Separator>
          </BreadcrumbItem>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <BreadcrumbItem
              key={item.path || index}
              as={motion.li}
              active={isLast}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              {item.path ? (
                <BreadcrumbLink
                  to={item.path}
                  hasLabel={true}
                >
                  {item.icon && item.icon}
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbText>
                  {item.icon && item.icon}
                  {item.label}
                </BreadcrumbText>
              )}
              <Separator className="separator" aria-hidden="true">
                {separator}
              </Separator>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbsContainer>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    path: PropTypes.string,
    icon: PropTypes.node
  })).isRequired,
  homeLink: PropTypes.string,
  showHomeIcon: PropTypes.bool,
  separator: PropTypes.node,
  className: PropTypes.string
};

export default Breadcrumbs; 