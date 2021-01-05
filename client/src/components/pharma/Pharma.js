import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPharma, deletePharma } from '../../actions/pharma';
import { Table, Spinner, Button } from 'reactstrap';

const Pharma = ({
  getPharma,
  pharma: { pharma },
  auth: { loading, user },
  deletePharma,
}) => {
  useEffect(() => {
    getPharma(user._id);
  }, [getPharma]);
  return loading || user === null ? (
    <Spinner color='success' />
  ) : (
    <Fragment>
      <Table responsive hover size='sm' className='medication__table'>
        <thead className='medication__head-table'>
          <tr>
            <th>Name</th>
            <th>Dosage</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {pharma.map((pharma) => (
            <tr>
              <th scope='row'>{pharma.name}</th>
              <td>{pharma.dosage}</td>
              <td>{pharma.type}</td>
              <Button
                className='medication__btn'
                color='danger'
                onClick={() => deletePharma(pharma._id)}
              >
                Delete Pharma
              </Button>
            </tr>
          ))}
        </tbody>
      </Table>
      {pharma.length === 0 && (
        <p>You do not have any pharma dosages. Please add a Dosage.</p>
      )}
      <Link to='/pharma-form'>
        <Button color='secondary'>
          <Link to='/pharma-form'>Add Dosage</Link>
        </Button>
      </Link>
    </Fragment>
  );
};

Pharma.propTypes = {
  getPharma: PropTypes.func.isRequired,
  pharma: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePharma: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pharma: state.pharma,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPharma, deletePharma })(Pharma);
