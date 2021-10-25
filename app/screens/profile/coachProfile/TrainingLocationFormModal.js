import React from 'react';
import { StyleSheet, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import { TrainingLocationForm } from './TrainingLocationForm';
import Header from '../../../components/header/Header';

const TrainingLocationFormModal = ({ isVisible, afterCreation, onCancel }) => {
  const onCreate = (cb) => {
    onCancel()
    afterCreation()
    cb()
  }
  return (
    <Modal onBackButtonPress={onCancel} style={styles.modal} isVisible={isVisible}>
      <SafeAreaView style={{ flex: 1 }}>
      <Header
        title="Create Training Location"
        hideCreatePost
        customButton={() => (
          <Icon
            onPress={onCancel}
            type="Feather"
            name="arrow-left"
            style={{
              paddingVertical: 10,
              paddingRight: 10,
              left: 15,
              fontSize: 22,
              color: '#2D7AF0',
            }}
          />
        )}
      />
      <TrainingLocationForm onCreate={onCreate} />
      </SafeAreaView>
    </Modal>
  )
};

TrainingLocationFormModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  afterCreation: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  modal: { backgroundColor: "white", margin: 0 },
});

export default TrainingLocationFormModal;