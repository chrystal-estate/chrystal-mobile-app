

// Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';



// Async Action Creator

import getEnvVars from '../../config/env';
import axios from 'axios'; // Assuming you're using axios
import AsyncStorage from '@react-native-async-storage/async-storage';



const { apiUrl } = getEnvVars();

class AuthActions  {

 loginUser = async (dispatch, email, password) => {
  dispatch({ type: 'LOGIN_REQUEST' });

  try {
    const response = await axios.post(`${apiUrl}/login`, {
      email: email,
      password: password,
    });

    const token = response.data.token; // Assuming the token is returned on successful login
    const user = response.data.user; // Assuming the user data is returned as well
    const permission = response.data.permissions; 
    console.log(user);
    // Store the token in AsyncStorage or where required
    await AsyncStorage.setItem('accessToken', token);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        user : user,
        token : token,
        permission : permission,
      },
    });

  } catch (error) {
    //console.error('Login error:', error.response?.data || error.message);

    dispatch({
      type: 'LOGIN_FAILURE',
      error: error.response?.data || 'Login failed',
    });
  }
};

  logoutUser = async (dispatch) => {
    dispatch({
      type: 'LOGOUT'
    });
  }

  userPermission = (permission = "" , auth) => {
    try {
      if ((auth?.rolePermission).includes(permission)) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    }
  };

  userRole =  (role_name = "" , auth) => {
    try {
      if (auth?.role === role_name) {
        return true;
      }

      return false;
    
      // });
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    }
  };
 
}

export default AuthActions;