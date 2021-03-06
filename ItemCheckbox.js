'use strict';
/**
 * @providesModule ItemCheckbox
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

export default class ItemCheckbox extends React.Component {
  static propTypes = {
    onCheck: PropTypes.func,
    onUncheck: PropTypes.func,
    icon: PropTypes.string,
    size: PropTypes.number,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    iconSize: PropTypes.string,
    checked: PropTypes.bool,
    default: PropTypes.bool,
  };

  static defaultProps = {
    onCheck: null,
    onUncheck: null,
    icon: "check",
    size: 40,
    backgroundColor: 'white',
    color: 'grey',
    iconSize: 'normal',
    checked: false,
    default: false,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      checked: props.checked,
      bg_color: props.checked ? props.color : props.backgroundColor,
    }
  }

  _getCircleCheckStyle() {
    return {
      width: this.props.size,
      height: this.props.size,
      backgroundColor: this.state.bg_color,
      borderColor: this.props.color,
      borderWidth: 2,
      borderRadius: this.props.size/2,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    };
  }

  _getIconSize() {
    if (this.props.iconSize == 'small') {
      return this.props.size * 0.5;
    } else if (this.props.iconSize == 'normal') {
      return this.props.size * 0.6;
    } else {
      return this.props.size * 0.7;
    }
  }

  _getCircleIconStyle() {
    return {
      color: this.props.backgroundColor,
      width: this._getIconSize(),
      height: this._getIconSize(),
    };
  }

  _completeProgress(defaultValue) {
    if (this.state.checked) {
      this.setState({
        checked: false,
        bg_color: this.props.backgroundColor,
      });
      if (this.props.onUncheck && !defaultValue) {
        this.props.onUncheck();
      }
    } else {
      this.setState({
        checked: true,
        bg_color: this.props.color,
      });
      if (this.props.onCheck && !defaultValue) {
        this.props.onCheck();
      }
    }
  }

  _initDefault() {
    this._completeProgress(true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked,
        bg_color: nextProps.checked ? this.props.color : this.props.backgroundColor,
      });
    }
  }

  render() {
    var icon = this.props.icon;
    return (
      <View style={this.props.style}>
        <TouchableWithoutFeedback
          onPress={this._completeProgress.bind(this, false)}
          >
          <View style={this._getCircleCheckStyle()}>
            <Icon
              name={this.props.icon}
              size={this._getIconSize()}
              color={this.props.backgroundColor}
              backgroundColor='transparent'
              style={this._getCircleIconStyle()}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

module.exports = ItemCheckbox;
