import React, { useEffect, useState } from 'react'
import { FlatList, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-community/async-storage';
import Dimension from "../../constants/dimensions";
import Colors from "../../constants/color";
import NLButton from "../NLButton";
import ListItem, { ChangeItem } from "./ListItem";

const SOTRAGE_KEY = "LASTEST_CHANGES_SHOWED"
const hasBeenShowed = () => AsyncStorage.getItem(SOTRAGE_KEY)
  .then((str) => str === "1")
  .catch(() => true)

const NLLastesChangesModal = ({ changes }) => {
  const [showModal, setShowModal] = useState(false);

  const renderItem = ({ item }) => (
    <ListItem {...item} />
  );

  const onBtnPress = () => {
    setShowModal(false)
    AsyncStorage.setItem(SOTRAGE_KEY, "1")
  }

  useEffect(() => {
    hasBeenShowed()
      .then(showed => {
        setShowModal(!showed)
      })
  }, [])
  return (
    <Modal style={styles.modal} isVisible={showModal}>
      <Text style={styles.title}>Latest changes from version: 1.2</Text>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={changes}
        renderItem={renderItem}
        keyExtractor={item => item.title}
      />
      <NLButton style={styles.button} value="Close" onPress={onBtnPress} />
    </Modal>
  )
}

NLLastesChangesModal.propTypes = {
  changes: PropTypes.arrayOf(ChangeItem).isRequired,
}

const styles = StyleSheet.create({
  modal: { backgroundColor: "white", borderRadius: Dimension.px10 },
  title: { fontSize: Dimension.px20, fontWeight: "bold", borderTopLeftRadius: Dimension.px10, borderTopRightRadius: Dimension.px10, padding: Dimension.px30, backgroundColor: Colors.nl_yellow },
  listContainer: { flex: 1 },
  button: { backgroundColor: Colors.s_blue, marginBottom: Dimension.px10, width: Dimension.pro90, marginLeft: "auto", marginRight: "auto" },
});

export default NLLastesChangesModal;
