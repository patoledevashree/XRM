import ImagePicker from 'react-native-image-picker';

export const handleImage = (data) => {
  console.log('Image');
  const options = {};
  let detail = {};
  ImagePicker.launchImageLibrary(options, (response) => {
    if (response.uri) {
      // console.log(response);
      uploadImage(data, response);
      detail.response = response;
      detail.key = data;
    }
  });

  return detail;
};

const uploadImage = (data, response, img) => {
  var formData = new FormData();
  const image = 'data:image/jpeg;base64,' + response.data;
  let obj = {[data]: response.fileName};
  // console.log('obj', obj);
  // formData.append(obj);
  console.log('res', response);
  if (img !== undefined) {
    let str = response.uri.split('/');
    console.log('str', str);
    let fname = str[str.length - 1];
    formData.append([data], {
      uri: response.uri,
      name: fname,
      type: 'image/jpeg',
    });
  } else {
    formData.append([data], {
      uri: response.uri,
      name: response.fileName,
      type: 'image/jpeg',
    });
  }
  console.log('form', formData);
  // if (props.vin === '') {
  //   Toast.show('Please enter Vin Number');
  // } else {
  //   axios
  //     .put(`${baseURL}/${submitImage}/${props.vin}`, formData, {
  //       headers: {
  //         'x-api-key': 'MV7PnHh2mC48n9n3oqKW3911T6Ch6gmd7xQJ0JQ6',
  //         'Content-Type': 'multipart/form-data;',
  //       },
  //     })
  //     .then((response) => {
  //       console.log('response', response);
  //       Toast.show('Image Saved!!');
  //     })
  //     .catch((err) => {
  //       console.log('err', err.response.data);
  //     });
  // }
};
