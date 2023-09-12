import axios from "axios";
import { useState, useEffect, useRef, useMemo } from "react";
import { View, Button, StyleSheet, FlatList, Keyboard } from "react-native";
import SendIcon from "react-native-vector-icons/Ionicons";

import MyText from "../../../shared/myText";
import MyTextInput from "../../../shared/myTextInput";
import { useTheme } from "../../../context/themeContext";

const Index = () => {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    messagesContainer: {
      flexGrow: 1,
      justifyContent: "flex-end",
      paddingHorizontal: 15
    },
    message: {
      padding: 8,
      marginVertical: 4,
      borderRadius: 8,
      backgroundColor: "#eee"
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
      borderRadius: 8,
    }
  });

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const storedMessages = await AsyncStorage.getItem("chatMessages");
      if (storedMessages) {
        // setMessages(JSON.parse(storedMessages));
      } else {
        const chatMessage = [
          {
            _id: Math.random().toString(36).substring(7),
            text: "برای شروع ارتباط با من از قسمت پایین پیام خود را بفرستید.",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "GPT-3.5-turbo",
              avatar: require("../../../../assets/img/avatar/botAvatar.png")
            }
          },
          {
            _id: Math.random().toString(36).substring(7),
            text: "سلام من هوش مصنوعی هستم.😃\nمن توانایی پاسخ به سوالات و درخواست های متنی را دارم و میتوانم در موضوعات گوناگون کمک کنم.همچنین، من می‌توانم به آموزش سریعتر زبان نیز کمک کنم و در تمرین درستی از اصول گرامری و نوشتاری راهنمایی کنم.",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "GPT-3.5-turbo",
              avatar: require("../../../../assets/img/avatar/botAvatar.png")
            }
          }
        ];
        // setMessages((prevMessages) => GiftedChat.append(prevMessages, chatMessage));
      }
    } catch (error) {
      console.error("Error loading messages from AsyncStorage:", error);
    }
  };

  const handleInputSubmit = async () => {
    setIsTyping(true);
    setMessages((prevMessages) => [{ role: "user", content: inputValue }, ...prevMessages]);
    setInputValue("");
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages: [
            {
              role: "user",
              content: inputValue
            }
          ],
          model: "gpt-3.5-turbo"
        },
        {
          headers: {
            Authorization: `Bearer ${"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"}`,
            "Content-Type": "application/json"
          }
        }
      );

      setMessages((prevMessages) => [
        { role: "assistant", content: response.data.choices[0].message.content },
        ...prevMessages
      ]);
    } catch (err) {

      setMessages((prevMessages) => [
        { role: "assistant", content: "لطفا اینترنت خود را برسی کنید" },
        ...prevMessages
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleInputChange = (text: string) => setInputValue(text);

  return (
    <View style={styles.container}>
      <FlatList
        inverted
        data={messages}
        contentContainerStyle={styles.messagesContainer} renderItem={({ item }) => (
        <MyText
          style={[
            styles.message,
            { alignSelf: item.role === "user" ? "flex-start" : "flex-end" }
          ]}
        >
          {item.content}
        </MyText>
      )} />
      <View style={styles.inputContainer}>
        <MyTextInput
          value={inputValue}
          onChangeText={handleInputChange}
          style={styles.input}
          placeholder="پیام"
        />
        <SendIcon name="send" color="red" style={{ paddingRight: 10 }} onPress={handleInputSubmit} size={25} />
      </View>
    </View>
  );
};
export default Index;
