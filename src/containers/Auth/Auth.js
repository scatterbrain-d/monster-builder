/* Log in/Sign up page reached through <Navbar/> or from "Log in to Save" in <Builder/>.
   Handles user authentication through Firebase and redirects based on where user
   is in the monster building process. */

import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import * as actions from "../../store/actions/index";
import {checkValidity} from "../../utility/Utility";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import style from "./Auth.css";
import globalStyle from "../../global.css";

class Auth extends Component {
    
    state = {
        controls: {
            email: {
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
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    touched={formElement.config.touched}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    required="true"
                />
            ));
            
        if (this.props.loading) form = <Spinner/>;
        
        let errorMessage = null;
        
        if (this.props.error) errorMessage = <p><strong>Error: {this.props.error.message}</strong></p>;
        
        let authRedirect = null;
        if (this.props.token) {
            this.props.onFetchMonsters(this.props.token, this.props.userId);
            if(this.props.name === "")
                authRedirect = <Redirect to="/"/>;
            else
                authRedirect = <Redirect to="/builder"/>;
        }
        
        return (
            <div className={style.auth}>
                
                {authRedirect}
                
                <h1 className={globalStyle.title}>
                    {this.state.isSignUp ? "SIGN UP" : "SIGN IN"}
                </h1>
                    
                    <div className={globalStyle.mainBorder + " " + style.authBox}>
                        
                        <form 
                            className={style.authForm}
                            onSubmit={this.submitHandler}
                        >
                            {form}
                            {errorMessage}
                            <button>Submit</button>
                        </form>
                        
                        <button onClick={this.switchAuthModeHandler}>
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
        token: state.auth.token,
        userId: state.auth.userId,
        name: state.monster.stat.name
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, method) => dispatch(actions.auth(email, password, method)),
        onFetchMonsters: (token, userId) => dispatch(actions.fetchMonsters(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);