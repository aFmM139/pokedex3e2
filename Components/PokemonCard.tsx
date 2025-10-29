import React from 'react';
import { View, Text, Image } from 'react-native';
import "@/global.css";
import { Pokemon } from '../types'; // Ajusta la ruta si es necesario

interface Props {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {  // Cambia a const y agrega React.FC<Props>
  return (
    <View className="bg-white p-4 rounded-lg shadow-md mb-4">
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        className="w-32 h-32 mx-auto mb-2"
        resizeMode="contain"
      />
      <Text className="text-xl font-semibold text-center capitalize">{pokemon.name}</Text>
      <Text className="text-center text-gray-600">ID: {pokemon.id}</Text>
      <Text className="text-center text-gray-600">
        Tipos: {pokemon.types.map(t => t.type.name).join(', ')}
      </Text>
    </View>
  );
};

export default PokemonCard;