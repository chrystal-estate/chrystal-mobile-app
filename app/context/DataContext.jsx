
import React, { createContext, useState, useEffect , useReducer , useContext } from 'react';
// import { Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import  {propertyStateReducer ,  propertyInitialState , addProperty} from '../store/statemodel/propertyStateReducer';

import getEnvVars from '../config/env';

const { apiUrl } = getEnvVars();


export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
 
    /* Property Action */
    const [propertyState, propertyDispatch] = useReducer(propertyStateReducer, propertyInitialState);

    const addProperty = (data) => propertyDispatch({type: 'ADD_PROPERTY',payload: data});
    const removeProperty = (index) => propertyDispatch({type: 'REMOVE_PROPERTY',payload: index});
    

    

  return (
    <DataContext.Provider value={
            {
                property  : {
                    ... {
                        list : propertyState
                    } , 
                    addProperty,
                    removeProperty

                }
            }
        }
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
