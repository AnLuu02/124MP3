import PropTypes from "prop-types";
import { loginWithGoogle } from "../store/userReducer";

function SignInwithGoogle({ children }) {
    return (
        <div onClick={loginWithGoogle()}>
            {children}
        </div>
    );
}

SignInwithGoogle.propTypes = {
    children: PropTypes.node,
}
export default SignInwithGoogle;