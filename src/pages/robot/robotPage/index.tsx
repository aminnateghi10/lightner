import React, {useState} from 'react';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import axios from 'axios';
import {StyleSheet} from 'react-native';
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
    console.log(currentTheme , 'yesssssssr');
    setMessages(prev => GiftedChat.append(prev, newMessages));

    const response = await sendMessage(newMessages[0].text);
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

    setMessages(prev => GiftedChat.append(prev, chatMessage));
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
