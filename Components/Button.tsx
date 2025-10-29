import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import "@/global.css";

interface Props {
  title: string;
  onPress: () => void;
}

export default function Button({ title, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-blue-500 p-3 rounded-lg mb-4"
    >
      <Text className="text-white text-center font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}