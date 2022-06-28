import { useState } from "react";


import FormInput from "../form-input/form-input.component.jsx";
import Button from "../button/button.component.jsx";

import { 
    signInWithGooglePopup, 
    SignInAuthWithEmailAndPassword
} from "../../utils/firebase/firebase.utils.js";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        

        try{
            const {user} = await SignInAuthWithEmailAndPassword(email, password);
            resetFormFields(user);
        } catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break
                case 'auth/user-not-found':
                    alert('user not found');
                    break
                default: 
                    console.log(error); 
            }
            
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in here</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="E-mail" type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button buttonType="google" type="button" onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;

