import React  from 'react';
import { GoogleLogin } from 'react-google-login'
import { clientId } from '../constants/data'
import { addUser } from '../../service/Api';
import {useDispatch} from 'react-redux'
import { authUser } from '../../actions/ActionIndex';

const Auth = () => {

    const dispatch = useDispatch();
    const onLoginSuccess = async (res) => {
        dispatch(authUser(res.profileObj))
        await addUser(res.profileObj);
    }
    const onLoginFailure = () =>{
        
        console.log("login failed")
    }
    return (
        <div style={{minHeight:'90vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <GoogleLogin
                clientId={clientId} buttonText="Continue With Google" isSignedIn={true} onSuccess={onLoginSuccess} onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'} />

        </div>
    )
};

export default Auth;
