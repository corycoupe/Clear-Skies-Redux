import React from "react";
import { Media, Button } from 'reactstrap';
import { Link} from "react-router-dom";
const Therapist = ({therapistList}) => {
    if (therapistList === undefined) {
        return <p>loading therapist list...</p>;
      }
      console.log(therapistList);
    return therapistList.map((therapist) => {
      return (
    
  <>
  
    <Media className="therapist">
      <Media left className="therapist__media" >
        <Media object data-src="holder.js/64x64" src={therapist.image} className="therapist__media--image"/>
      </Media>
      <Media body className="therapist__body">
        <Media heading className="therapist__name">
          {therapist.name}
        </Media>
       {therapist.profession}
       <Link to={`/therapist/${therapist.therapistId}`}>
       <Button className="therapist__button" outline color="secondary">Contact</Button>
       </Link>
      </Media>
    </Media>
  </>
      );
    });
}
export default Therapist;