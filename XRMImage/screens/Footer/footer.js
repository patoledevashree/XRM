import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

/**
 * @author Devashree Patole
 * @description This component is to display the footer of the screen. This is common component
 * @param {function} props contains the onclick function
 * @returns JSx of the Footer comoponent
 */
function Footer(props) {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: 'crimson',
          width: '100%',
          position: 'absolute',
          bottom: 0,
          height: 55,
        }}
        onPress={() => {
          props.onClick();
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            paddingTop: 10,
            fontSize: 22,
          }}>
          NEXT
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Footer;
