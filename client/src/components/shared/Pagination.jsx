import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

const PaginationContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
`;

const PageButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  height: 2.5rem;
  padding: 0 0.75rem;
  background: ${({ theme, active }) => active ? theme.primaryColor : 'transparent'};
  color: ${({ theme, active }) => active ? 'white' : theme.textColor};
  border: 1px solid ${({ theme, active }) => active ? theme.primaryColor : theme.borderColor};
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: ${({ active }) => active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  &:hover:not(:disabled) {
    background: ${({ theme, active }) => active ? theme.primaryColorDark : theme.backgroundSecondary};
    border-color: ${({ theme }) => theme.primaryColor};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const PageInfo = styled.div`
  color: ${({ theme }) => theme.textColorLight};
  font-size: 0.875rem;
  margin: 0 1rem;
  white-space: nowrap;
`;

const Ellipsis = styled.span`
  color: ${({ theme }) => theme.textColorLight};
  padding: 0 0.5rem;
`;

const buttonVariants = {
  hover: {
    scale: 1.05
  },
  tap: {
    scale: 0.95
  }
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showInfo = true,
  maxVisiblePages = 5,
  className
}) => {
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let start = currentPage - halfVisible;
    let end = currentPage + halfVisible;

    if (start < 1) {
      start = 1;
      end = maxVisiblePages;
    }

    if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxVisiblePages + 1;
    }

    const pages = [];
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const visiblePages = getVisiblePages();

  return (
    <PaginationContainer
      aria-label="Pagination"
      className={className}
    >
      {showFirstLast && (
        <PageButton
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          aria-label="Go to first page"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FiChevronsLeft />
        </PageButton>
      )}

      <PageButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <FiChevronLeft />
      </PageButton>

      {visiblePages.map((page, index) => (
        page === '...' ? (
          <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>
        ) : (
          <PageButton
            key={page}
            onClick={() => handlePageChange(page)}
            active={currentPage === page}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {page}
          </PageButton>
        )
      ))}

      <PageButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <FiChevronRight />
      </PageButton>

      {showFirstLast && (
        <PageButton
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Go to last page"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FiChevronsRight />
        </PageButton>
      )}

      {showInfo && (
        <PageInfo>
          Page {currentPage} of {totalPages}
        </PageInfo>
      )}
    </PaginationContainer>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  showFirstLast: PropTypes.bool,
  showInfo: PropTypes.bool,
  maxVisiblePages: PropTypes.number,
  className: PropTypes.string
};

export default Pagination; 