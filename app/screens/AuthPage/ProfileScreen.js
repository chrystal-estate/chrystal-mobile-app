import React from "react";

import Background from "../../components/Background";

import AdminLayout from '../../layout/Admin';
import Paragraph from "../../components/Paragraph";
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const {authState} = useAuth();
  
  return (
    <AdminLayout>
        <Background>
            <Paragraph>Profile Page</Paragraph>
            <Paragraph>Hello , {authState.user.first_name } {authState.user.last_name}</Paragraph>
        </Background>
    </AdminLayout>
  );
}
