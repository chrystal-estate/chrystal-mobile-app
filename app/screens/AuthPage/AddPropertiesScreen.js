import React , {useReducer, useState} from "react";

import Background from "../../components/Background";

import AdminLayout from '../../layout/Admin';
import Paragraph from "../../components/Paragraph";
import TextInput from "../../components/TextInput";
import { Title } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import Button from "../../components/Button";
import { Ionicons } from '@expo/vector-icons';
import { View , StyleSheet } from 'react-native';
// import propertyReducer , {addProperty , removeProperty}from "../../store/statemodel/propertyStateReducer";
import { useData } from '../../context/DataContext';

export default function AddPropertiesScreen({ navigation }) {
 
    const {property} = useData();
  /*   const propertyInitialState =[
        {
            Title : "sample",

        },
        {
            Title : "sample2",
            
        }
    ]; */
    // const [propertyState, propertyDispatch] = useReducer(propertyReducer,propertyInitialState );
    const [textInput, setTextInput] = useState({value: ""});

    const onRemovePressed = (index) =>{
        property.removeProperty({itemIndex:index});
    }   
    const onAddPressed = () =>{
        if(textInput.value === "")return;
       
        property.addProperty(textInput);
       
        setTextInput({ value: ""});
    }
  return (
    <AdminLayout>
        <Background>
            <Paragraph>Add New Property</Paragraph>
            <Paragraph>{JSON.stringify(property)}</Paragraph>
            <TextInput
                label="Text"
                returnKeyType="next"
                value={textInput.value}
                onChangeText={(text) =>setTextInput({ value: text})}
                /* onChangeText={(text) => propertyDispatch({
                    type: 'FAKE_LOGIN_SUCCESS',
                    payload: [],
                  })} */
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            
              <Button mode="contained" onPress={onAddPressed }>
                    Add List
                </Button>
            <FlatList
                data={property.list}
                keyExtractor={(item , index)=>{
                    // console.log(item.Title);
                    return index;
                }}
                renderItem={({item , index})=>(
                    <View style={styles.flatitemcontainer}>
                         <Ionicons name="trash-outline" size={24} color="black" style={{ marginLeft: 10 }} onPress={()=>onRemovePressed(index) } />
                    
                        <Paragraph>{item.Title}</Paragraph>
                    </View>
                )}
            /> 
           
        </Background>
    </AdminLayout>
  );
}


const styles = StyleSheet.create({
    flatitemcontainer: {
      
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
  });