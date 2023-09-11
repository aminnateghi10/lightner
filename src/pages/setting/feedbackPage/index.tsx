import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";

import { useTheme } from "../../../context/themeContext";

const ChatScreen = () => {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    messageContainer: {
      paddingBottom: 16
    },
    input: {
      borderColor: currentTheme.border,
      justifyContent: "center",
      borderWidth: 0,
      borderRadius: 4
    }
  });

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(()=>{
    //   axis and set deta is here
  },[]);

  const sendMessage = async (message: string) => {
  //   send Massage
  };

  const onSend = async (newMessages = []) => {
    setMessages(prev => GiftedChat.append(prev, newMessages));

    const response = await sendMessage(newMessages[0].text);
    const chatMessage = [
      {
        _id: Math.random().toString(36).substring(7),
        text: response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "feedbackAvatar",
          avatar: require("../../../../assets/img/avatar/feedbackAvatar.jpeg")
        }
      }
    ];

    setMessages(prev => GiftedChat.append(prev, chatMessage));
  };

  const user = {
    _id: 1,
    name: "Developer",
    avatar: require("../../../../assets/img/avatar/userAvatar.png")
  };

  const renderInputToolbar = props => {
    return <InputToolbar {...props} containerStyle={styles.input}
                         primaryStyle={{ backgroundColor: currentTheme.card }} />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={user}
      placeholder="پیام خود را وارد کنید..."
      showUserAvatar={true}
      showAvatarForEveryMessage={true}
      isTyping={isTyping}
      renderInputToolbar={renderInputToolbar}
      messagesContainerStyle={styles.messageContainer}
    />
  );
};

export default ChatScreen;
