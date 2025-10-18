import { NavLink, useNavigate, useRouteError } from "react-router"
import "./Error.css"

const Error = () => {
    const err = useRouteError();
    console.log(err.status);
    
 let navigate = useNavigate();

 const handlegoback = () => {
    navigate(-1);
 }

    if(err.status === 404){
        return (
            <section className="error-section">
                  <div className="error-text">
                    <figure>
                        <img src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif"  alt="404 page" />
                    </figure>
                    <div className="text-center">
                        <h3 className="p-a">
                            The page you were looking for could not be found <span style={{color:"orange"}}>!!</span>
                        </h3>
                        <NavLink to="/"  ><button>Back to Home Page !!</button></NavLink>  &nbsp;
                        <button onClick={handlegoback}>Go Back !!</button>
                    </div>
                  </div>
            </section>
        )
    }
}

export default Error ;