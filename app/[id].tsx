import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import "@/global.css";
import { Pokemon } from '../types'; // Ajusta la ruta si es necesario

export default function PokemonDetail() {
  const { id } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data: Pokemon = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPokemon();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg">Cargando detalles...</Text>
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg">Pokémon no encontrado</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold text-center mb-4">Detalles de {pokemon.name}</Text>
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        className="w-32 h-32 mx-auto mb-2"
        resizeMode="contain"
      />
      <Text className="text-lg mb-2">ID: {pokemon.id}</Text>
      <Text className="text-lg mb-2">Tipos: {pokemon.types.map(t => t.type.name).join(', ')}</Text>
      <Text className="text-lg font-semibold mb-2">Estadísticas:</Text>
      {pokemon.stats ? (
        pokemon.stats.map(stat => (
          <Text key={stat.stat.name} className="mb-1">
            {stat.stat.name}: {stat.base_stat}
          </Text>
        ))
      ) : (
        <Text className="text-gray-500">Estadísticas no disponibles</Text>
      )}
    </View>
  );
}
