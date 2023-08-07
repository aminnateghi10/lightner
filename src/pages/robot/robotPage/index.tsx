import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';


const RobotPage = () => {
    const [inputText, setInputText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleMessageSubmit = async () => {
        try {
            // Make a POST request to the GPT API endpoint with the user's message
            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer YOUR_API_KEY', // Replace with your OpenAI API key
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: inputText,
                    max_tokens: 50, // Adjust the number of tokens as needed
                    temperature: 0.6, // Adjust the temperature parameter as needed
                    n: 1
                })
            };

            const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', requestOptions);
            const data = await response.json();

            console.log(data,'ddd')

            // Append the response from the API to the chat history
            // const newChatEntry = {
            //     role: 'ai',
            //     content: response.data.choices[0].text.trim()
            // };
            // setChatHistory([...chatHistory, newChatEntry]);

            // Clear the input text
            setInputText('');
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <View>
            {/* Render chat history */}
            {chatHistory.map((entry, index) => (
                <Text key={index}>{`${entry.role}: ${entry.content}`}</Text>
            ))}

            {/* Render chat input */}
            <TextInput
                value={inputText}
                onChangeText={(text) => setInputText(text)}
            />

            {/* Render submit button */}
            <Button title="Send" onPress={handleMessageSubmit}/>
        </View>
    );
};

export default RobotPage;
