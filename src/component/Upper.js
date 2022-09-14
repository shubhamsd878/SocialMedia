import {Container} from 'react-bootstrap';
function Upper(props){
    return(

        <Container>

        <div className="pricing-header p-1 pb-md-4 mx-auto text-center" style={{marginTop:'2.5rem'}}>
          <h1 className="montserrat display-4 fw-normal" >Track Your {props.name}</h1>
          <p className="fs-5 text-muted"> An integrated system for tracking Goverment {props.name} of different department. </p>
        </div>

        </Container>
    );
}
export default Upper;