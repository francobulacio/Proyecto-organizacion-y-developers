import * as React from 'react';
import { View, Pressable, Modal, Text, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { useAppSelector, useAppDispatch } from '../../redux/hook';
import { setAvatar } from '../../redux/slices/user/userSlice';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUri: React.Dispatch<React.SetStateAction<{
    path?: string, mime?: string
  }>>;
}

const AvatarPicker = ({ showModal, setShowModal, setUri }: Props) => {

  const dispatch = useAppDispatch();

  const handlePicker = (picker: string) => {
    switch (picker) {
      case 'image':
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        })
          .then(image => {
              dispatch(setAvatar(image.path))
            setUri({ 
              path: image.path,
              mime: image.mime
            });
          })
          .catch(err => console.log(err))
          .finally(() => setShowModal(false));
        break;
      case 'camera':
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        })
          .then(image => {
            dispatch(setAvatar(image.path))
            setUri({ 
              path: image.path,
              mime: image.mime
            });
          })
          .catch(err => console.log(err))
          .finally(() => setShowModal(false));
        break;
    }
  };
  return (
    <>
      <Modal
        style={{ position: 'absolute', zIndex: -10 }}
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}>
        <Pressable
          style={{
            backgroundColor: 'hsla(0,0%,0%,0.95)',
            height: '100%',
            width: '100%',
          }}
          onPress={() => setShowModal(false)}>
          <View
            style={{
              flexDirection: 'row',
              height: '15%',
              backgroundColor: 'white',
              borderBottomRightRadius: 15,
              borderBottomLeftRadius: 15,
            }}>
            <Pressable
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRightWidth: 1,
              }}
              onPress={() => handlePicker('image')}>
              <Icon name="images" size={29} color="black" />
              <Text style={{ color: 'black' }}>Gallery</Text>
            </Pressable>
            <Pressable
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => handlePicker('camera')}>
              <Icon name="camera" size={34} color="black" />
              <Text style={{ color: 'black' }}>Camera</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default AvatarPicker;
