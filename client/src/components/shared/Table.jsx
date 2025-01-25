import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const TableHead = styled.thead`
  background: ${({ theme }) => theme.backgroundSecondary};
  border-bottom: 2px solid ${({ theme }) => theme.borderColor};
`;

const TableBody = styled.tbody`
  tr {
    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.borderColor};
    }

    &:hover {
      background: ${({ theme }) => theme.backgroundSecondary};
    }
  }
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
  font-size: 0.875rem;
  white-space: nowrap;
  cursor: ${({ sortable }) => sortable ? 'pointer' : 'default'};
  user-select: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme, sortable }) => sortable ? theme.primaryColor : theme.textColor};
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.875rem;
  white-space: nowrap;
`;

const SortIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 0.25rem;
  color: ${({ theme, active }) => active ? theme.primaryColor : 'inherit'};

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  color: ${({ theme }) => theme.textColorLight};
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.backgroundSecondary};
`;

const PageInfo = styled.div`
  color: ${({ theme }) => theme.textColorLight};
  font-size: 0.875rem;
`;

const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: ${({ theme, active }) => active ? theme.primaryColor : 'transparent'};
  color: ${({ theme, active }) => active ? 'white' : theme.textColor};
  border: 1px solid ${({ theme, active }) => active ? theme.primaryColor : theme.borderColor};
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme, active }) => active ? theme.primaryColorDark : theme.backgroundSecondary};
    border-color: ${({ theme }) => theme.primaryColor};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const Table = ({
  columns,
  data,
  sortable = true,
  pagination = true,
  pageSize = 10,
  emptyMessage = 'No data available',
  className
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key) => {
    if (!sortable) return;

    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = pagination
    ? sortedData.slice(startIndex, startIndex + pageSize)
    : sortedData;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <TableContainer className={className}>
      <StyledTable>
        <TableHead>
          <tr>
            {columns.map((column) => (
              <TableHeader
                key={column.key}
                sortable={sortable && column.sortable !== false}
                onClick={() => handleSort(column.key)}
              >
                {column.title}
                {sortable && column.sortable !== false && (
                  <SortIcon active={sortConfig.key === column.key}>
                    {sortConfig.key === column.key ? (
                      sortConfig.direction === 'asc' ? (
                        <FiChevronUp />
                      ) : (
                        <FiChevronDown />
                      )
                    ) : (
                      <FiChevronDown />
                    )}
                  </SortIcon>
                )}
              </TableHeader>
            ))}
          </tr>
        </TableHead>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <motion.tr
                key={row.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render ? column.render(row) : row[column.key]}
                  </TableCell>
                ))}
              </motion.tr>
            ))
          ) : (
            <tr>
              <TableCell colSpan={columns.length}>
                <EmptyState>{emptyMessage}</EmptyState>
              </TableCell>
            </tr>
          )}
        </TableBody>
      </StyledTable>
      {pagination && totalPages > 1 && (
        <PaginationContainer>
          <PageInfo>
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, sortedData.length)} of {sortedData.length} entries
          </PageInfo>
          <PaginationButtons>
            <PageButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FiChevronLeft />
            </PageButton>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PageButton
                key={page}
                active={currentPage === page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PageButton>
            ))}
            <PageButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FiChevronRight />
            </PageButton>
          </PaginationButtons>
        </PaginationContainer>
      )}
    </TableContainer>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sortable: PropTypes.bool,
    render: PropTypes.func
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortable: PropTypes.bool,
  pagination: PropTypes.bool,
  pageSize: PropTypes.number,
  emptyMessage: PropTypes.string,
  className: PropTypes.string
};

export default Table; 