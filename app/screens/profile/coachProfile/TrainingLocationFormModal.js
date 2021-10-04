import React from 'react';
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import PropTypes from 'prop-types';
import { TrainingLocationForm } from './TrainingLocationForm';

const TrainingLocationFormModal = ({ isVisible, afterCreation, onCancel }) => (
  <Modal onBackButtonPress={onCancel} style={styles.modal} isVisible={isVisible}>
    <TrainingLocationForm onCreate={afterCreation} />
  </Modal>
);

TrainingLocationFormModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  afterCreation: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  modal: { backgroundColor: "white", margin: 0 },
});

export default TrainingLocationFormModal;