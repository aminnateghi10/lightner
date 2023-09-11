// import axios from "axios";
// import { StyleSheet } from "react-native";
// import { useEffect, useState } from "react";
// import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
// import AsyncStorage from "@react-native-async-storage/async-storage";
//
// import { useTheme } from "../../../context/themeContext";
//
// const ChatScreen = () => {
//   const { currentTheme } = useTheme();
//
//   const styles = StyleSheet.create({
//     messageContainer: {
//       paddingBottom: 0
//     },
//     input: {
//       borderColor: currentTheme.border,
//       justifyContent: "center",
//       borderWidth: 0,
//       borderRadius: 4
//     }
//   });
//
//   const [messages, setMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//
//   useEffect(() => {
//     loadMessages();
//   }, []);
//
//   // Load messages from AsyncStorage
//   const loadMessages = async () => {
//     try {
//       const storedMessages = await AsyncStorage.getItem("chatMessages");
//       if (storedMessages) {
//         setMessages(JSON.parse(storedMessages));
//       } else {
//         const chatMessage = [
//           {
//             _id: Math.random().toString(36).substring(7),
//             text: "برای شروع ارتباط با من از قسمت پایین پیام خود را بفرستید.",
//             createdAt: new Date(),
//             user: {
//               _id: 2,
//               name: "GPT-3.5-turbo",
//               avatar: require("../../../../assets/img/avatar/botAvatar.png")
//             }
//           },
//           {
//             _id: Math.random().toString(36).substring(7),
//             text: "سلام من هوش مصنوعی هستم.😃\nمن توانایی پاسخ به سوالات و درخواست های متنی را دارم و میتوانم در موضوعات گوناگون کمک کنم.همچنین، من می‌توانم به آموزش سریعتر زبان نیز کمک کنم و در تمرین درستی از اصول گرامری و نوشتاری راهنمایی کنم.",
//             createdAt: new Date(),
//             user: {
//               _id: 2,
//               name: "GPT-3.5-turbo",
//               avatar: require("../../../../assets/img/avatar/botAvatar.png")
//             }
//           }
//         ];
//         setMessages((prevMessages) => GiftedChat.append(prevMessages, chatMessage));
//       }
//     } catch (error) {
//       console.error("Error loading messages from AsyncStorage:", error);
//     }
//   };
//
//   const sendMessage = async (message: string) => {
//     setIsTyping(true);
//     try {
//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           messages: [
//             {
//               role: "user",
//               content: message
//             }
//           ],
//           model: "gpt-3.5-turbo"
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${"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"}`,
//             "Content-Type": "application/json"
//           }
//         }
//       );
//
//       return response.data.choices[0].message.content;
//     } catch (err) {
//       console.log(err, "api call error");
//     } finally {
//       setIsTyping(false);
//     }
//   };
//
//   const onSend = async (newMessages = []) => {
//     // Append new messages to the current state
//     setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
//
//     // Send the user's message and get a response
//     const response = await sendMessage(newMessages[0].text);
//
//     // Create a chat message from the response
//     const chatMessage = [
//       {
//         _id: Math.random().toString(36).substring(7),
//         text: response ?? "مشکلی وجود دارد! \nلطفا اینترنت خود را چک کنید. \nدر غیر این صورت با پشتیبان تماس بگیرید. (تنظیمات)",
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "ربات",
//           avatar: require("../../../../assets/img/avatar/botAvatar.png")
//         }
//       }
//     ];
//
//
//     // Append the chat message to the state
//     setMessages((prevMessages) => GiftedChat.append(prevMessages, chatMessage));
//
//     // Save the updated messages to AsyncStorage
//     try {
//       await AsyncStorage.setItem("chatMessages", JSON.stringify(messages));
//     } catch (error) {
//       console.error("Error saving messages to AsyncStorage:", error);
//     }
//
//   };
//
//   const user = {
//     _id: 1,
//     name: "Developer",
//     avatar: require("../../../../assets/img/avatar/userAvatar.png")
//   };
//
//   const renderInputToolbar = props => {
//     return <InputToolbar {...props} containerStyle={styles.input}
//                          primaryStyle={{ backgroundColor: currentTheme.card }} />;
//   };
//
//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={onSend}
//       user={user}
//       placeholder="پیام"
//       showUserAvatar={true}
//       showAvatarForEveryMessage={true}
//       isTyping={isTyping}
//       renderInputToolbar={renderInputToolbar}
//       messagesContainerStyle={styles.messageContainer}
//     />
//   );
// };
//
// export default ChatScreen;

import axios from "axios";

import { useState, useEffect, useRef,useMemo } from "react";
import { View, Button, StyleSheet, FlatList, Keyboard } from "react-native";

import MyText from "../../../shared/myText";
import MyTextInput from "../../../shared/myTextInput";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const flatList = useRef(null);
  const API_KEY = "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";

  // const memoizedValue = useMemo(() => {
  //   // Perform some expensive calculation or return a computed value
  //   return [...messages.reverse()]
  // }, [messages]);

  useEffect(() => {
    const initializeChatGPT = async () => {
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a helpful assistant." }
            ]
          },
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              "Content-Type": "application/json"
            }
          }
        );

        setMessages((prevMessages) => [
          { role: "system", content: response.data.choices[0].message.content },
          ...prevMessages
        ]);
      } catch (error) {
        console.error("Failed to initialize ChatGPT", error);
      }
    };

    initializeChatGPT();
  }, []);

  const handleInputSubmit = async () => {
    setMessages((prevMessages) => [
      { role: "user", content: inputValue },
      ...prevMessages
    ]);
    setInputValue("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/cofmpletions",
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
      flatList.current.scrollToOffset({ offset: -100, animated: true });
    } catch (err) {
      console.log(err, "api call error");
    } finally {
      // setIsTyping(false);
    }
  };

  const scrollFlatListToEnd = () => {
    if (flatList.current) {
      flatList.current.scrollToEnd({ animated: true });
    }
  };
  const handleInputFocus = () => {
    scrollFlatListToEnd();
  };
  const handleInputChange = (text: string) => setInputValue(text);

  return (
    <View style={styles.container}>
      <FlatList
        inverted
        data={messages} contentContainerStyle={styles.messagesContainer} renderItem={({ item }) => (
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
        <Button title="Send" onPress={handleInputSubmit} />
      </View>
    </View>
  );
};

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
    alignItems: "center"
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#fff"
  }
});

export default ChatScreen;
