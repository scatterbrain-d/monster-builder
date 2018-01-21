import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import * as actions from "../../store/actions/index";
import {checkValidity} from "../../shared/utility";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import Aux from "../../hoc/Aux/Aux";
import style from "./Auth.css";
import globalStyle from "../../global.css";

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
                <Aux key={formElement.id}>
                    <label>{formElement.id}:</label>
                    <Input
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        touched={formElement.config.touched}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    
                    />
                </Aux>
            ));
            
        if (this.props.loading) form = <Spinner/>;
        
        let errorMessage = null;
        
        if (this.props.error) errorMessage = <p><strong>Error: {this.props.error.message}</strong></p>;
        
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            if(this.props.name === "")
                authRedirect = <Redirect to="/"/>;
            else
                authRedirect = <Redirect to="/builder"/>;
        }
        return (
            <div className={style.auth}>
                
                {authRedirect}
                
                <h1>{this.state.isSignUp ? "SIGN UP" : "SIGN IN"}</h1>
                    <div className={globalStyle.mainBorder}>
                        <form 
                            className={style.authForm}
                            onSubmit={this.submitHandler}
                        >
                            {form}
                            {errorMessage}
                            <button>Submit</button>
                        </form>
                        <button 
                            onClick={this.switchAuthModeHandler}
                        >
                            Switch to {this.state.isSignUp ? "Sign In" : "Sign Up"}
                        </button>
                    </div>
            </div>    
        );
        
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !==null,
        name: state.monster.stat.name
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, method) => dispatch(actions.auth(email, password, method))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);