import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Card from "../homeScreen/components/card";

const AddNewCard = () => {
  const [selectedValue, setSelectedValue] = useState();

  const list = useSelector((state: RootState) => state.cards.list);
  return (
    <View style={styles.contener}>
      <Text style={styles.title}>دسته بندی</Text>
      <View style={styles.pickerContener}>
        <Picker
          mode="dropdown"
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}>
          {list.map(item => <Picker.Item key={item.id} label={item.name} value={item.name} />)}
        </Picker>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.tabTitleCard}>
          <Text style={styles.tabTitle}>روی کارت</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabTitleCard}>
          <Text style={styles.tabTitle}>پشت کارت</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddNewCard;

const styles = StyleSheet.create({
  contener: {
    marginHorizontal: 10
  },
  title: {
    marginTop: 30,
    marginBottom: 10
  },
  pickerContener: {
    borderWidth: 1,
    borderColor: "black"
  },
  tabTitleCard: {
    marginTop: 10,
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomColor: "rgb(129,127,127)",
    borderBottomWidth: 1,
    paddingBottom: 5
  },
  tabTitle: {
    fontSize: 18,
    color:'rgb(0,0,0)'
  }
});
