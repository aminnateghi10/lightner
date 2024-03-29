import axios from "axios";
import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Image, ToastAndroid } from "react-native";
import SendIcon from "react-native-vector-icons/Ionicons";
import MicrophoneIcon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ArrowLeftIcon from "react-native-vector-icons/AntDesign";

import MyText from "../../../shared/myText";
import MyTextInput from "../../../shared/myTextInput";
import { useTheme } from "../../../context/themeContext";

import { RobotParamList } from "../../../contracts/rootParamList";
import Clipboard from "@react-native-clipboard/clipboard";
import Voice from "@react-native-voice/voice";

interface PropsInterface {
  navigation: NativeStackNavigationProp<RobotParamList>,
}

interface MessagesInterface {
  role: "bot" | "user" | "isTyping",
  content: string,
}

const Index = ({ navigation }: PropsInterface) => {
  const { currentTheme } = useTheme();

  const Styles = StyleSheet.create({
    container: {
      flex: 1
    },
    messagesContainer: {
      flexGrow: 1,
      justifyContent: "flex-end",
      paddingHorizontal: 14
    },
    message: {
      paddingHorizontal: 12,
      paddingVertical: 5,
      marginTop: 6,
      maxWidth: "90%"
    },
    user: {
      backgroundColor: "#0076fe",
      alignSelf: "flex-end",
      borderRadius: 10,
      borderBottomEndRadius: 0
    },
    bot: {
      borderRadius: 10,
      borderBottomStartRadius: 0,
      backgroundColor: "#eaf4fe",
      alignSelf: "flex-start"
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: currentTheme.card,
      with: 100,
      borderRadius: 16,
      marginTop: 8,
      margin: 10
    },
    input: {
      flex: 1,
      height: 40,
      marginRight: 3,
      paddingHorizontal: 8,
      borderRadius: 8
    },
    headerContainer: {
      flexDirection: "row",
      backgroundColor: currentTheme.card,
      height: 55,
      paddingTop: 4,
      alignItems: "center"
    },
    headerTitle: {
      fontSize: 18,
      flexGrow: 1,
      textAlign: "center"
    }
  });

  navigation.setOptions({
    header: () => (
      <View style={Styles.headerContainer}>
        <TouchableOpacity style={{ position: "absolute", left: 20, zIndex: 9 }} onPress={() => navigation.goBack()}>
          <ArrowLeftIcon name="arrowleft" size={22} style={{ flexGrow: 0 }} color={currentTheme.text} />
        </TouchableOpacity>
        <MyText style={Styles.headerTitle}>ربات</MyText>
      </View>
    )
  });

  const [messages, setMessages] = useState<MessagesInterface[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const copyToClipboard = (text) => {
    ToastAndroid.show("متن کپی شد", ToastAndroid.SHORT);
    Clipboard.setString(text);
  };

  const loadMessages = async () => {
    const storedMessages = await AsyncStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      const chatMessage: MessagesInterface[] = [
        {
          content: "برای شروع ارتباط با من از قسمت پایین پیام خود را بفرستید.",
          role: "bot"
        },
        {
          content: "سلام من هوش مصنوعی هستم.😃\nمن توانایی پاسخ به سوالات و درخواست های متنی را دارم و میتوانم در موضوعات گوناگون کمک کنم.همچنین، من می‌توانم به آموزش سریعتر زبان نیز کمک کنم و در تمرین درستی از اصول گرامری و نوشتاری راهنمایی کنم.",
          role: "bot"
        }
      ];
      setMessages([...chatMessage, ...messages]);
    }
  };

  const getTime = () => {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var currentMinute = currentDate.getMinutes();
    return currentHour + ":" + currentMinute;
  };

  const handleInputSubmit = async () => {
    if (inputValue) {
      try {
        setIsTyping(true);
        setMessages((prevMessages) => [{ role: "isTyping", content: inputValue, time: getTime() }, {
          role: "user",
          content: inputValue,
          time: getTime()
        }, ...prevMessages]);
        setInputValue("");
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          { messages: [{ role: "user", content: inputValue }], model: "gpt-3.5-turbo" },
          {
            headers: {
              Authorization: `Bearer ${"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"}`,
              "Content-Type": "application/json"
            }
          }
        );
        const content = await response.data.choices[0].message.content;
        setMessages((prevMessages) => {
          let newList = prevMessages.filter((item => item.role !== "isTyping"));
          AsyncStorage.setItem("chatMessages", JSON.stringify([{
            role: "bot",
            content,
            time: getTime()
          }, ...newList]));
          return [{ role: "bot", content, time: getTime() }, ...newList];
        });
      } catch (err) {
        console.log(err.response);
        const content = "لطفا اینترنت خود را بررسی کنید";
        setMessages((prevMessages) => {
          let newList = prevMessages.filter((item => item.role !== "isTyping"));
          return [{ role: "bot", content, time: getTime() }, ...newList];
        });
      } finally {
        setIsTyping(false);
      }
    }
  };


  useEffect(() => {
    // Set up event listener for speech recognition results
    Voice.onSpeechResults = (e) => {
      setInputValue(e.value[0]);
    };

    // Clean up event listener when component unmounts
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecognition = async () => {
    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  };

  const handleInputChange = (text: string) => setInputValue(text);
  return (
    <View style={Styles.container}>
      <FlatList
        inverted
        data={messages}
        contentContainerStyle={Styles.messagesContainer} renderItem={({ item }) => (
        <>
          {
            item.role === "isTyping" ?
              <View style={[Styles.message, Styles.bot]}>
                <Image style={{ width: 50, height: 30 }} source={require("../../../../assets/gif/loading.gif")} />
              </View>
              :
              <>
                {
                  item.role === "user" ?
                    <>
                      <MyText style={{ fontSize: 9, textAlign: "right", opacity: 0.4 }}>
                        {item?.time}
                      </MyText>
                      <TouchableOpacity style={[Styles.message, Styles.user]}
                                        onPress={() => copyToClipboard(item.content)}>
                        <MyText style={{ color: "#e9eafd" }}>
                          {item.content}
                        </MyText>
                      </TouchableOpacity>
                    </>
                    :
                    <>
                      <MyText style={{ fontSize: 9, textAlign: "left", opacity: 0.4 }}>
                        {item?.time}
                      </MyText>
                      <TouchableOpacity onPress={() => copyToClipboard(item.content)}
                                        style={[Styles.message, Styles.bot]}>
                        <MyText style={{ color: "#1f2732" }}>
                          {item.content}
                        </MyText>
                      </TouchableOpacity>
                    </>
                }</>
          }
        </>
      )} />
      <View style={Styles.inputContainer}>
        <MyTextInput
          value={inputValue}
          style={Styles.input}
          placeholder="پیام"
          onChangeText={handleInputChange}
        />
        {
          isTyping ?
            <Image style={{ width: 40, height: 40 }} source={require("../../../../assets/gif/smallLoading.gif")} /> :
            inputValue ?
              <SendIcon name="send" color={currentTheme.button} style={{ paddingRight: 10 }} onPress={handleInputSubmit}
                        size={25} />
              :
              <MicrophoneIcon name="microphone" color={currentTheme.button} style={{ paddingRight: 10 }}
                              onPress={startRecognition} size={25} />
        }
      </View>
    </View>
  );
};
export default Index;
