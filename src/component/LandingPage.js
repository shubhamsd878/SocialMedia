import {useNavigate} from 'react-router-dom'
// import '../App.css'

function LandingPage() {

  const navigate = useNavigate();

  const loginPath = () => {
    let path = 'home'
    navigate(path)
  }
  return (
    <>
      {/* <div className="row row-cols-1 row-cols-md-2 mb-3 text-center "> */}

      {/* ********************* Upper ************************ */}

      <div className="pricing-header p-1 pb-md-4 mx-auto text-center" style={{marginTop:'2.5rem'}}>
          {/* <h1 className="montserrat display-4 fw-normal" >Track Your Document</h1> */}
          {/* <p className="fs-5 text-muted"> An integrated system for tracking Goverment Document of different department. </p> */}
          <h1 className="montserrat display-4 fw-normal" >Connect to Explore!</h1>
          <p className="fs-5 text-muted"> A system for conneting to the world at your fingertips connect To experience/ </p>
        </div>

      {/* ********************* Upper ************************ */}



        <div className="col">

          <div
            className="card mb-3 rounded-3 shadow-sm  card-blur-dark"
            style={{
              border: "10px solid transparent",
              backdropFilter: "blur(0.5rem)",
              boxShadow: "1.3rem 1.3rem 1.3rem rgba(255, 255, 255, 0.5)",
              backgroundColor: "rgba(225, 225, 225, 0.1)",
              position: "fixed",
              right: "8rem",
              top: "17rem",
              width:'40%'
            }}
          >

            <h3 className="card-heading bold-text display-8">
              Login
            </h3>

            <hr className="card-hr" noshade />

            <div className="card-body" >
              <form >
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="username or email"
                  style={{width:'auto'}}
                  
                />
                <br/>
                <input
                  className="form-control me-2"
                  type="password"
                  placeholder="password"
                  aria-label="password"
                  style={{width:'50%'}}
                />
                <br/>
                <button className="btn btn-outline-success" width='4rem' onClick={loginPath} >
                  Login In
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* **** Help **** */}
        {/* <div style={{}}>
          
          <br />
          
          <h4 className="montserrat">Help</h4>
          <div className="text-left" style={{textAlign: 'left', marginLeft:'2rem'}}>

          <p>To create/modify/delete or view data in departments goto Development section.</p>
          <p>Then sign in their with provided credentials.Then you can create modify departments.</p> 
          </div>

          <br></br>
          <h4 className='montserrat' style={{alignItem:'right'}}>Why ?</h4>
          <div className="text-left" style={{textAlign: 'left', marginLeft:'2rem'}}>
          <p>No requirement of persons/peons for movement of file.</p>
          <p>There is less chance of missing file with eTrack.</p>
          <p>Documents with eTrack are traceable.</p>
          </div>
        </div> */}
      {/* </div> */}
    </>
  );
}
export default LandingPage;
