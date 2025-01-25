import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaSort, FaSortUp, FaSortDown, FaSearch } from 'react-icons/fa';

const TableContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const TableTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.textColor};
  font-size: 18px;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px 10px 35px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.textColorLight};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 15px 20px;
  text-align: left;
  color: ${({ theme }) => theme.textColorLight};
  font-weight: 500;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  cursor: ${({ sortable }) => (sortable ? 'pointer' : 'default')};
  white-space: nowrap;
  background: ${({ theme }) => theme.backgroundSecondary};

  &:hover {
    ${({ sortable, theme }) => sortable && `background: ${theme.backgroundHover};`}
  }
`;

const Td = styled.td`
  padding: 15px 20px;
  color: ${({ theme }) => theme.textColor};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const Tr = styled.tr`
  &:hover {
    background: ${({ theme }) => theme.backgroundHover};
  }
`;

const SortIcon = styled.span`
  display: inline-block;
  margin-left: 5px;
  vertical-align: middle;
`;

const Pagination = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const PageInfo = styled.div`
  color: ${({ theme }) => theme.textColorLight};
  font-size: 14px;
`;

const PageButtons = styled.div`
  display: flex;
  gap: 5px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ active, theme }) => (active ? theme.primaryColor : theme.cardBackground)};
  color: ${({ active, theme }) => (active ? 'white' : theme.textColor)};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.primaryColorHover : theme.backgroundHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: ${({ theme }) => theme.textColorLight};
`;

const DataTable = ({
  title,
  columns,
  data,
  onSort,
  onFilter,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  loading,
  emptyMessage = 'No data available'
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    onSort(key, direction);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilter(value);
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <TableContainer>
      <TableHeader>
        <TableTitle>{title}</TableTitle>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </SearchContainer>
      </TableHeader>

      <Table>
        <thead>
          <tr>
            {columns.map((column) => (
              <Th
                key={column.key}
                sortable={column.sortable}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                {column.label}
                {column.sortable && <SortIcon>{renderSortIcon(column.key)}</SortIcon>}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <Td colSpan={columns.length}>Loading...</Td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <Td colSpan={columns.length}>
                <EmptyState>{emptyMessage}</EmptyState>
              </Td>
            </tr>
          ) : (
            data.map((item, index) => (
              <Tr key={item.id || index}>
                {columns.map((column) => (
                  <Td key={column.key}>
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </Td>
                ))}
              </Tr>
            ))
          )}
        </tbody>
      </Table>

      <Pagination>
        <PageInfo>
          Showing {startItem} to {endItem} of {totalItems} entries
        </PageInfo>
        <PageButtons>
          <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </PageButton>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PageButton key={page} active={currentPage === page} onClick={() => onPageChange(page)}>
              {page}
            </PageButton>
          ))}
          <PageButton
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </PageButtons>
      </Pagination>
    </TableContainer>
  );
};

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      render: PropTypes.func
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string
};

export default DataTable;
