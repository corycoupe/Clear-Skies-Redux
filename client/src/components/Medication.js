import React from 'react';

import {
 Table
} from 'reactstrap';



const Medication = ({medication}) => {
  if (medication === undefined) {
    return <p>loading medication list...</p>;
  }
  console.log(medication);
    return (
    <>
    <Table responsive hover size="sm" className="medication__table"> 
    <thead className="medication__head-table"> 
    <tr> 
          <th>Name</th>
          <th>Dosage</th>
          <th>Type</th>
    </tr>
    </thead>
    <tbody>
    {medication.map((med) => (
    <tr>
          <th scope="row">{med.name}</th>
          <td>{med.dosage}</td>
          <td>{med.type}</td>
        </tr>
    ))}
    </tbody>
    </Table>
    </>
    );

}
export default Medication;