import React from 'react';
import {
  Text,
  View,
} from 'react-vr';

export default class LostScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={{color: 'red', fontWeight: 600, textAlign: 'center'}}>
          Oho! You have lost the game. Please try again.
        </Text>
      </View>
    )
  }

}