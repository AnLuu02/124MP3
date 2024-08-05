import PropTypes from "prop-types";
import { logout } from "../store/userReducer";


function SignOutwithGoogle({ children }) {


    return (
        <div onClick={logout()}>
            {children}
        </div>
    );
}

SignOutwithGoogle.propTypes = {
    children: PropTypes.node,
}
export default SignOutwithGoogle;