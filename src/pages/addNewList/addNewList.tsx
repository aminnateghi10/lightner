import {Button, Text, View} from "react-native";

const AddNewList = ({navigation}: any) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>las;jf;lasjkkdf</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}
export default AddNewList;
