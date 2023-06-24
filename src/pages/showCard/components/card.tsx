import { useState } from "react";
import {
    Button,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    useColorScheme,
    View
} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import CoustomModal from "./coustomModal";

const Card = ({data, navigation}: any) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [lang, setLang] = useState(true);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const isDarkMode = useColorScheme() === 'dark';
    const colorStyle = {color: isDarkMode ? "black" : "white"};
    const backgroundStyle = {backgroundColor: isDarkMode ? Colors.lighter : Colors.darker};
    return (
      <>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Button title="Open Modal" onPress={toggleModal} />
              <Modal visible={isModalVisible} animationType="slide">
                  <View style={{display:'flex', alignItems: 'center', justifyContent: 'center' , height:"100%"}}>
                            <TouchableOpacity style={{backgroundColor:'rgba(0,132,255,0.43)' , width:"60%" , height:'60%',borderRadius:20,alignItems:"center",justifyContent:"center",elevation:1, opacity:.8}} onPress={()=>setLang(!lang)}>
                                <Text style={{fontSize:30,color:'rgb(0,0,0)'}}>{lang ? data.english : data.persian}</Text>
                            </TouchableOpacity>
                  </View>
              </Modal>
          </View>
        <TouchableHighlight onPress={()=>navigation.navigate('')} style={[styles.card,backgroundStyle]}>
            <Text style={[styles.title,colorStyle]}>{data.english}</Text>
        </TouchableHighlight>
      </>
    );
};

export default Card;

const styles = StyleSheet.create({
    card: {
        marginHorizontal:15,
        paddingVertical:25,
        borderRadius:15,
        marginVertical:10,
    },
    title: {
        textAlign:"center",
    }
})
