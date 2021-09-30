import React, { useEffect, useState } from "react";
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import differenceInHours from 'date-fns/differenceInHours'
import getUnixTime from 'date-fns/getUnixTime'
import Modal from "react-native-modal";
import fromUnixTime from 'date-fns/fromUnixTime'
import Dimension from "../constants/dimensions";

const AUTOHIDE_SECONDS = 5;
const updateLastDisplayTime = (id) => {
  AsyncStorage.setItem(id, getUnixTime(new Date()).toString())
}

const DailyReminderModal = ({ children, id }) => {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const startHideCounter = () => {
      setTimeout(() => {
        setIsVisible(false)
      }, 1000 * AUTOHIDE_SECONDS)
    }

    AsyncStorage.getItem(id)
      .then(lastDateShow => {
        if (!lastDateShow) {
          setIsVisible(true)
          startHideCounter()
          updateLastDisplayTime(id)
        }

        const hoursDiff = differenceInHours(new Date(), fromUnixTime(parseInt(lastDateShow, 10)))
        if (hoursDiff > 24) {
          setIsVisible(true)
          startHideCounter()
          updateLastDisplayTime(id)
        }
      })
  }, [id])

  return (<Modal
    style={styles.modal}
    isVisible={isVisible}
    animationIn="fadeInUp"
    animationOut="fadeOutUp">
    {children}
  </Modal>);
}

const styles = StyleSheet.create({
  modal: { backgroundColor: "white", borderRadius: Dimension.px10, maxHeight: Dimension.px100 },
});

DailyReminderModal.propTypes = {
  children: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
};

export default DailyReminderModal;
