import React from 'react';
import {View, Text, Image} from 'react-native';

/**
 * @author Devashree Patole
 * @description This component contains the header which as image in it. This is common component
 * @returns JSX of Header Component
 */
function Header() {
  return (
    <View style={{width: '100%', backgroundColor: '#cecece'}}>
      <Image
        source={require('../../assests/images/logo.png')}
        style={{
          width: 160,
          height: 50,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />
    </View>
  );
}
export default Header;
