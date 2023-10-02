import axios from "axios";
import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import SendIcon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import MyText from "../../../shared/myText";
import MyTextInput from "../../../shared/myTextInput";
import { useTheme } from "../../../context/themeContext";

import { RobotParamList } from "../../../contracts/rootParamList";

interface PropsInterface {
  navigation: NativeStackNavigationProp<RobotParamList>,
}

interface MessagesInterface {
  role: "bot" | "user",
  content: string
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
      paddingHorizontal: 15
    },
    message: {
      paddingHorizontal:10,
      paddingVertical:2,
      marginVertical: 4,
    },
    user: {
      backgroundColor: "rgb(239,254,221)",
      alignSelf: "flex-end",
      borderRadius:15,
      borderBottomEndRadius:0,
    },
    bot: {
      borderRadius:15,
      borderBottomStartRadius:0,
      backgroundColor: currentTheme.card,
      alignSelf: "flex-start"
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: currentTheme.card
    },
    input: {
      flex: 1,
      height: 40,
      marginRight: 3,
      paddingHorizontal: 8,
      borderRadius: 8
    },
    headerContainer: {
      alignItems: "center",
      backgroundColor: currentTheme.card,
      height: 55,
      paddingTop: 4
    },
    headerTitle: {
      fontSize: 18
    }
  });

  navigation.setOptions({
    header: () => (
      <View style={Styles.headerContainer}>
        <MyText style={Styles.headerTitle}>ربات</MyText>
        {
          isTyping &&
          <MyText style={{ fontSize: 12 }}>در حال نوشتن...</MyText>
        }
      </View>
    )
  });

  const [messages, setMessages] = useState<MessagesInterface[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

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
    if (inputValue){
      try {
        setIsTyping(true);
        setMessages((prevMessages) => [{ role: "user", content: inputValue, time: getTime() }, ...prevMessages]);
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
          AsyncStorage.setItem("chatMessages", JSON.stringify([{
            role: "bot",
            content,
            time: getTime()
          }, ...prevMessages]));
          return [{ role: "bot", content, time: getTime() }, ...prevMessages];
        });
      } catch (err) {
        const content = "لطفا اینترنت خود را برسی کنید";
        setMessages((prevMessages) => [{ role: "bot", content, time: getTime() }, ...prevMessages]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleInputChange = (text: string) => setInputValue(text);
  return (
    <View style={Styles.container}>
      <FlatList
        inverted
        data={messages}
        contentContainerStyle={Styles.messagesContainer} renderItem={({ item }) => (
        <View style={[Styles.message, item.role === "user" ? Styles.user : Styles.bot]}>
          <MyText>
            {item.content}
          </MyText>
          <MyText style={{fontSize:9 , textAlign:'right'}}>
            {item?.time}
          </MyText>
        </View>
      )} />
      <View style={Styles.inputContainer}>
        <MyTextInput
          value={inputValue}
          style={Styles.input}
          placeholder="پیام"
          onChangeText={handleInputChange}
        />
        <SendIcon name="send" color={currentTheme.button} style={{ paddingRight: 10 }} onPress={handleInputSubmit}
                  size={25} />
      </View>
    </View>
  );
};
export default Index;
