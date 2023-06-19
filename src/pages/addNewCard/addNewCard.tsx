import {Button, Text, View} from "react-native";

const AddNewCard = ({navigation}: any) => {
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
export default AddNewCard;
