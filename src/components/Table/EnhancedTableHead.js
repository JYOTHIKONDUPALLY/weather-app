import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const ArrowIcon = ({ direction }) => {
  return direction === 'asc' ? <IoIosArrowUp /> : <IoIosArrowDown />;
};

const EnhancedTableHead = ({ headCells, order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => () => {
    onRequestSort(property);
  };

  return (
    <thead>
      <tr>
        {headCells.map((headCell) => (
          <th
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            onClick={createSortHandler(headCell.id)}
          >
            {headCell.label}
            {orderBy === headCell.id && (
              <ArrowIcon direction={order === 'asc' ? 'asc' : 'desc'} />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

ArrowIcon.propTypes = {
  direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
};

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default EnhancedTableHead;
