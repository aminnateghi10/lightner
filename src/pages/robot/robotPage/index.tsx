import axios from 'axios';
import {StyleSheet} from 'react-native';
import { useEffect, useState } from "react";
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "../../../context/themeContext";

const ChatScreen = () => {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    messageContainer: {
      paddingBottom: 16,
    },
    input: {
      borderColor: currentTheme.border,
      justifyContent:'center',
      borderWidth: 0,
      borderRadius: 4,
    },
  });

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  // Load messages from AsyncStorage
  const loadMessages = async () => {
    try {
      const storedMessages = await AsyncStorage.getItem('chatMessages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.error('Error loading messages from AsyncStorage:', error);
    }
  };

  const sendMessage = async (message: string) => {
    setIsTyping(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: [
            {
              role: 'user',
              content: message,
            },
          ],
          model: 'gpt-3.5-turbo',
        },
        {
          headers: {
            Authorization: `Bearer ${'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'}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.choices[0].message.content;
    } catch (err) {
      console.log(err, 'api call error');
    }
    finally {
      setIsTyping(false);
    }
  };

  const onSend = async (newMessages = []) => {
    // Append new messages to the current state
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

    // Send the user's message and get a response
    const response = await sendMessage(newMessages[0].text);

    // Create a chat message from the response
    const chatMessage = [
      {
        _id: Math.random().toString(36).substring(7),
        text: response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'GPT-3.5-turbo',
          avatar: require('../../../../assets/img/avatar/botAvatar.png'),
        },
      },
    ];

    // Append the chat message to the state
    setMessages((prevMessages) => GiftedChat.append(prevMessages, chatMessage));

    // Save the updated messages to AsyncStorage
    try {
      await AsyncStorage.setItem('chatMessages', JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving messages to AsyncStorage:', error);
    }
  };

  const user = {
    _id: 1,
    name: 'Developer',
    avatar: require('../../../../assets/img/avatar/userAvatar.png'),
  };

  const renderInputToolbar = props => {
    return <InputToolbar {...props} containerStyle={styles.input} primaryStyle={{backgroundColor:currentTheme.card}} />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={user}
      placeholder={'پیام'}
      showUserAvatar={true}
      showAvatarForEveryMessage={true}
      isTyping={isTyping}
      renderInputToolbar={renderInputToolbar}
      messagesContainerStyle={styles.messageContainer}
    />
  );
};

export default ChatScreen;
