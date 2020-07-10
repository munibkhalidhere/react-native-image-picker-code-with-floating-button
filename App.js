import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/EvilIcons';
import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList
  ,TouchableOpacity
} from 'react-native';
Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
      }
  }
  return this;
};

class App extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      fileList : []
    }
  };


//After selected function
  onSelectedImage = (image) =>{
    var newData = this.state.fileList;
    const source = {uri: image.path}
    let item = {
      id : Date.now(),
      url : source,
      contend : image.data
    };
    newData.push(item);
    this.setState({fileList:newData})
}


// camera function 
  takePhotoFromCamera= () =>{
    ImagePicker.openCamera({
      cropping: false,
    }).then(image => {
      this.onSelectedImage(image)
    });
  };


// gallery funtion 
  takePhotoFromLibrary = () =>{
    ImagePicker.openPicker({
      cropping: false
    }).then(image => {
      this.onSelectedImage(image)
    });
  }
// remove evry imageItm
  removeImages = () =>{
    ImagePicker.clean().then(() => {
      console.log('removed all tmp images from tmp directory');
      this.setState({fileList : []})
    }).catch(e => {
      alert(e);
    });
  }
// remove single imageItm
  removeImage= (item) =>{
    ImagePicker.cleanSingle(item.url.uri).then(() => {
      console.log('removed all tmp images from tmp directory');
      var Dataremove = this.state.fileList.remove(item);
      this.setState({fileList:Dataremove})
    }).catch(e => {
      alert(e);
    });
    
  }
 
// image renderItem

  renderItem = ({item,index})=>{
    return(
       <View>
        <TouchableOpacity style={styles.cancel} onPress={()=>this.removeImage(item,'x')} ><Icon name="trash" size={30} style={styles.iconStyle} /></TouchableOpacity>
        <Image source={item.url} style={styles.imageItm} />
      </View>
    )
  };


 
 
  render(){
    let {content,txtStyle} = styles;
    let {fileList} = this.state;
    return (
      
        
      <View style={content}>
          <Text>Attach Some Files</Text>
          {/* Images List/           */}
          {/* Images List/           */}
          <FlatList
          style={styles.list}
          numColumns={3}
          data = {fileList}
          extraData = {this.state}
          renderItem ={this.renderItem}
          keyExtractor ={(item,index)=> index.toString()}  />
      
         {/* Upload Button */}


         <ActionButton style={styles.mainBtn} positioningMode="relative" offsetX={30} offsetY={20} useNativeFeedback= {true} buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item useNativeFeedback= {true} buttonColor='#3498db' title="Camera" onPress={this.takePhotoFromCamera}>
            <Icon name="camera" style={stylesForBtn.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item useNativeFeedback= {true} buttonColor='#1abc9c' title="Gallery" onPress={this.takePhotoFromLibrary}>
            <Icon name="image" style={stylesForBtn.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        </View>
              
    );
  };
}
const styles = StyleSheet.create({
  content:{
    flex: 1,
    alignItems : "center",
    padding: 20,
    },
    txtStyle :{
      color: '#ffffff',
      fontSize : 20
    },
    imageItm : {
      width: 80,
      height: 80,
      borderRadius : 8,
      resizeMode: 'cover',
      margin:10,
      marginLeft: 15
    },
    cancel:{
      width: 35,
      marginBottom : -40,
      alignItems: 'center',
      height :40,
      textAlign: 'center',
      zIndex: 20,
      marginLeft: 2,
    },
    list:{
      margin : 5,
      marginBottom: 350,
      padding : 5,
      width: 360,
      backgroundColor: 'rgb(254, 255, 255)',
      height : 'auto',
      textAlign: 'center',
      alignContent: 'center', 
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      borderRadius: 10,
      zIndex: 0,
    },
    iconStyle:{
      color: 'white',
      fontWeight: "700",
      fontSize: 20,
      backgroundColor: '#404040',
      borderRadius: 50,
      textAlign: 'center',
      width: 22,
      height: 22,
      overflow: 'hidden',
      elevation: 20,
      zIndex: 20
      
    },
    
    
});

export default App;


























// export default class App extends React.Component {

//   render() {
//     return (
//       <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
//         {/* Rest of the app comes ABOVE the action button component !*/}
//         <ActionButton useNativeFeedback= {true} buttonColor="rgba(231,76,60,1)">
//           <ActionButton.Item useNativeFeedback= {true} buttonColor='#3498db' title="Camera" onPress={() => {}}>
//             <Icon name="camera" style={stylesForBtn.actionButtonIcon} />
//           </ActionButton.Item>
//           <ActionButton.Item useNativeFeedback= {true} buttonColor='#1abc9c' title="Gallery" onPress={() => {}}>
//             <Icon name="image" style={stylesForBtn.actionButtonIcon} />
//           </ActionButton.Item>
//         </ActionButton>
//       </View>
//     );
//   }

// }

 const stylesForBtn = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 30,
    height: 22,
    color: 'white',
  },
});

