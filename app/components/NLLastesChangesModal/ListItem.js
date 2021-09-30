import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import PropTypes from 'prop-types';
import Dimension from "../../constants/dimensions";
import Colors from "../../constants/color";

export const ChangeItem = PropTypes.shape({
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
}).isRequired;

const Item = ({ body, title }) => (
  <View style={itemStyles.wrapper}>
    <View style={itemStyles.titleWrapper}>
      <Icon
        name="checkcircle"
        type="AntDesign"
        style={itemStyles.icon}
      />
      <Text style={itemStyles.title}>{title}</Text>
    </View>
    <View style={{ width: "95%" }}>
      <Text style={itemStyles.body}>{body}</Text>
    </View>
  </View>
);

const itemStyles = StyleSheet.create({
  wrapper: {
    paddingBottom: Dimension.px4,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    color: "black",
    fontSize: Dimension.px20,
    fontWeight: "bold"
  },
  body: {
    color: "black",
    fontSize: Dimension.px18,
    paddingHorizontal: Dimension.px10
  },
  icon: { fontSize: Dimension.px20, color: Colors.nl_yellow, padding: Dimension.px10 }
});

Item.propTypes = ChangeItem

export default Item;