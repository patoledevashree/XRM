import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';

/**
 * @author Devashree Patole
 * @description This component is for the user to selct the options of camera and image library
 * during image upload
 * @param {boolean} visible sets visibility of modal
 * @param {function} closeModal function to close the modal
 * @returns JSX of modal
 */
function OptionModal({visible, closeModal, selectImage, selectCamera}) {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={{backgroundColor: '#000000aa', flex: 1}}>
        <View style={styles.modalStyle}>
          <View
            style={{
              margin: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Select Options
            </Text>
            <TouchableOpacity
              onPress={() => {
                selectCamera(true);
                closeModal();
              }}>
              <View style={styles.button}>
                <Text style={{textAlign: 'center', paddingTop: 10}}>
                  Take Photo
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                selectImage(false);
                closeModal();
              }}>
              <View style={styles.button}>
                <Text style={{textAlign: 'center', paddingTop: 10}}>
                  Select Photo From Gallery
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: 'white',
    marginHorizontal: 50,
    marginTop: 200,
    borderRadius: 20,
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#777',
    shadowColor: '#777',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default OptionModal;
