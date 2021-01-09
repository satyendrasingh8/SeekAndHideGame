import React from 'react';
import {
  View,
  Model,
  asset,
  PointLight,
} from 'react-vr';

export default class House extends React.Component {

  render() {
    return (
      <View>
        <PointLight intensity={2} style={{transform: [{translate: [0, -0.5, 0]},]}} />
        <Model
        source={{obj: asset('House.obj') , mtl: asset('House.mtl')}}
        lit
        style={{
          transform: [
            {translate: [0, 0, 0]},
            {scale: [1, 1, 1]},
          ]
        }}
        />
      </View>
    )
  }

}
