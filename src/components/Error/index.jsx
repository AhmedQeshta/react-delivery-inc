import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorComponent({ error }) {
  return <div className="error">Error : {error}</div>;
}

// define prop types, and validate props,
// if not valid, return error
ErrorComponent.propTypes = {
  error: PropTypes.string.isRequired,
};
