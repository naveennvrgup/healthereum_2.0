import React, { Component } from "react";
import Slider from "react-native-slider";

export default class SliderComponent extends Component {
    state={
        value:0,
    }


    render() {

      return (
        <Slider
          value={this.props.value}
          minimumValue={0}
          maximumValue={this.props.duration}
          onSlidingComplete={(p)=>this.props.changePostion(p)}
          thumbTintColor={"#0578FA"}
          thumbTouchSize={{width: 30, height: 30}}
          minimumTrackTintColor={"#0578FA"}
        />
      );
    }
  }
