import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import * as actions from "../../store/actions/index";
import {checkValidity} from "../../shared/utility";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";

class Auth extends Component {
    
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Email Address"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: false
    }
    
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }
    
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }
    
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        });
    }
    
    render () {
        
        const formElementsArray = [];
        
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        
        let form = formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    touched={formElement.config.touched}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                
                />
            ));
            
        if (this.props.loading) form = <Spinner/>;
        
        let errorMessage = null;
        
        if (this.props.error) errorMessage = <p><strong>Error: {this.props.error.message}</strong></p>;
        
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to="/"/>;
        }
        return (
            <div className="auth">
                {authRedirect}
                <h1>{this.state.isSignUp ? "SIGN UP" : "SIGN IN"}</h1>
                <form onSubmit={this.submitHandler}>
                    {form}
                    {errorMessage}
                    <button>SUBMIT</button>
                </form>
                    
                <button 
                    onClick={this.switchAuthModeHandler}
                >
                    SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}</button>
            </div>    
        );
        
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !==null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, method) => dispatch(actions.auth(email, password, method))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);