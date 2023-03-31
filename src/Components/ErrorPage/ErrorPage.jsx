import React from "react";
import Pic from "../../Shared/images/Error2.svg";
// import Loader from 'react-loader-spinner'
import { HideUntilLoaded } from "react-animation";

//Standard error component

function Error({ error }) {
  return (
    <>
      {/* <div className="container">
                <div className="row justify-content-center" style={{height: "100vh"}}>
                    <div className="col-12 col-sm-5 align-self-center">
                        <div className="card text-center border">
                            <HideUntilLoaded
                                animationIn="popIn"
                                imageToLoad={Pic}
                                Spinner={() => <Loader type="Rings" color="#88C0D0" height={100} width={100} />}
                                >
                                <img className="card-img-top" src={Pic} alt="Error"/>
                            </HideUntilLoaded>
                            <div className="card-body">
                                <h5 className="card-title">Error</h5>
                                <p className="card-text">{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
    </>
  );
}

export default Error;
