import React,{useState} from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginLogout = () => {
        setIsLoggedIn(!isLoggedIn);
      };
    
  return (
    <TouchableOpacity onPress={handleLoginLogout} style={styles.button}>
      <Text style={styles.buttonText}>{isLoggedIn ? 'Logout' : 'Login'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,

    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
