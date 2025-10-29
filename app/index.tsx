import Button from '@/Components/Button';
import PokemonCard from '@/Components/PokemonCard';
import "@/global.css";
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Pokemon } from '../types'; // Importa desde types.ts

// Elimina la interfaz Pokemon duplicada aquí

export default function Index() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener un Pokémon por ID
  const fetchPokemon = async (id: number) => {
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

  // useEffect para cargar Pikachu inicialmente
  useEffect(() => {
    fetchPokemon(25); // Pikachu
  }, []);

  // Función para cambiar a un Pokémon aleatorio
  const handleRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    fetchPokemon(randomId);
  };

  if (loading) {
    return (
    <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg">Cargando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold text-center mb-4">Pokedex Básica</Text>
      {pokemon && <PokemonCard pokemon={pokemon} />} 
      <Button title="Cambiar Pokémon Aleatorio" onPress={handleRandomPokemon} />
      {pokemon && (
        <Link href={`/pokemon/${pokemon.id}`} className="mt-4">
          <Text className="text-blue-500 text-center">Ver Detalles</Text>
        </Link>
      )}
    </View>
  );
}