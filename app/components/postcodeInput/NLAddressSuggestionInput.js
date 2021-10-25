import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { useThrottle } from '@react-hook/throttle'
import Dimension from '../../constants/dimensions';
import InputResultBox from './InputResultBox';


/**
 * @param {Object} params
 * @param {onLocationSelected} params.onLocationSelected - On suggestion selected callback
 * @param {String} [params.defaultValue]
 * @param {String} [params.placeholder]
 */
const NLAddressSuggestionInput = ({
  onLocationSelected,
  defaultValue = null,
  placeholder = '',
  style = {},
  lookUpInitial,
}) => {
  const wrapperRef = useRef();
  const inputRef = useRef();
  const [inputLayout, setInputLayout] = useState({
    y: 0,
    x: 0,
    height: 0,
    width: 0
  });
  const [currentValue, setCurrentValue] = useThrottle(undefined);
  const [currentDisaplyValue, setCurrentDisaplyValue] = useState();
  const [optionWasSelected, setOptionWasSelected] = useState(true);

  useEffect(() => {
    if (defaultValue != null) {
      setCurrentDisaplyValue(defaultValue);
      if (lookUpInitial) {
        setCurrentValue(defaultValue);
      }
    }
  }, [defaultValue]);

  const hideModal = () => {
    inputRef?.current?.focus()
    setOptionWasSelected(true)
  }

  const onPostCodeSelected = (location) => {
    hideModal()
    onLocationSelected(location)
  }

  const getAbsoluteDimmentions = () => {
    wrapperRef.current.measureInWindow((px, py, width, height) => {
      const dimmentions = {
        y: parseFloat(px.toFixed(2)),
        x: parseFloat(px.toFixed(2)),
        height: parseFloat(height.toFixed(2)),
        width: parseFloat(width.toFixed(2))
      }

      setInputLayout(dimmentions)
    })
  }

  const resultBoxIsvisible = () => inputLayout !== undefined && optionWasSelected === false

  const setValueToSearch = (val) => {
    getAbsoluteDimmentions()

    setCurrentValue(() => {
      setOptionWasSelected(false)
      return val
    });
  }

  const onLayout = () => {
    getAbsoluteDimmentions()
  }
  return (
    <>
      <View
        ref={view => { wrapperRef.current = view }}
        onLayout={onLayout}
        style={[styles.input_wrapper, { ...style }]}>
        <TextInput
          ref={ref => { inputRef.current = ref }}
          placeholder={placeholder || 'Search by a post code'}
          placeholderTextColor="rgba(0,0,0,0.3)"
          value={currentDisaplyValue}
          style={{ fontSize: 16, width: "100%", height: 50 }}
          onChangeText={(t) => {
            setCurrentDisaplyValue(t);
            setValueToSearch(t)
            getAbsoluteDimmentions()
          }}
        />
      </View>
      <InputResultBox
        onCancel={hideModal}
        isVisible={resultBoxIsvisible()}
        postCode={currentValue}
        coordinates={inputLayout}
        onSelect={onPostCodeSelected}
      />
    </>
  );
};

NLAddressSuggestionInput.propTypes = {
  placeholder: PropTypes.string,
};

NLAddressSuggestionInput.defaultProps = {
  placeholder: "",
};

const styles = StyleSheet.create({
  input_wrapper: {
    color: 'black',
    borderBottomWidth: 0.8,
    borderBottomColor: 'lightgrey',
    marginTop: Dimension.px1,
    width: '100%',
    flexDirection: 'row',
    zIndex: 100,
  },
});

export default NLAddressSuggestionInput;
