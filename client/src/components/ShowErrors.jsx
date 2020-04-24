import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaWindowClose } from 'react-icons/fa';
import { removeError } from '../actions/errors';

const ShowErrors = ({ errors, removeError }) => {
  return (
    <div className="errors-container">
      <div className="flex w-1/6 flex-wrap">
        {errors.map(error => (
          <div key={error.alert} className={`${error.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-teal-100 p-3 w-full flex justify-between items-center`}>
            {error.alert}
            <FaWindowClose className="text-xl hover:text-gray-300" onClick={() => removeError(error)} />
          </div>
        ))}
      </div>
    </div>
  );
};

ShowErrors.propType = {
  errors: PropTypes.array,
  removeError: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors.errors
});

export default connect(mapStateToProps, { removeError })(ShowErrors);
