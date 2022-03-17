import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/authService";


const Reset = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const password = useRef();
    const location = useLocation();
    const [username, setUsername] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enteredConfirmedPassword, setEnteredConfirmedPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        let name = location.search.slice(1);
        setUsername(name);

    }, [location]);

    const required = value => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };

    const vpassword = value => {
        if (value.length < 6 || value.length > 40) {
            return (
                <div className="alert alert-danger" role="alert">
                    The password must be between 6 and 40 characters.
                </div>
            );
        }
    };

    const vPasswordConfirmation = value => {
        if (value !== password.current) {
            return (
                <div className="alert alert-danger" role="alert">
                    Password don't match!
                </div>
            );
        }
    };

    const onChangePassword = (e) => {
        setEnteredPassword(e.target.value);
        password.current = e.target.value;
    }

    const onChangePasswordConfirm = (e) => {
        setEnteredConfirmedPassword(
            e.target.value);
    }
    const handleResetPassword = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.resetPassword(username, enteredPassword).then(
                response => {
                    // props.history.push("/");
                    setSuccessful(true);
                    setMessage(response.data.message)
                    // window.location.reload()

                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setLoading(false);
                }
            );
        } setLoading(false);

    }


    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form
                    onSubmit={handleResetPassword.bind(this)}
                    ref={form}
                >
                    <div className="form-group">
                        <label htmlFor="username">Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={enteredPassword}
                            onChange={onChangePassword.bind(this)}
                            validations={[required, vpassword]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">enter password again</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={enteredConfirmedPassword}
                            onChange={onChangePasswordConfirm.bind(this)}
                            validations={[required, vPasswordConfirmation]}
                        />
                    </div>

                    <div className="form-group">
                        <button
                            className="btn btn-primary btn-block"
                            disabled={loading}
                        >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>update new password</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className={successful
                                ? "alert alert-success"
                                : "alert alert-danger"} role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton
                        style={{ display: "none" }}
                        ref={checkBtn}
                    />
                </Form>
            </div>
        </div>
    )
}

export default Reset