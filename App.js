import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Keyboard
} from 'react-native';

import api from './src/services/api';

export default function App() {

  const [cep, setCep] = useState("");
  const [cepUser, setCepUser] = useState(null);
  const inputRef = useRef(null);

  function limpar() {
    setCep('');
    inputRef.current.focus();
    setCepUser(null);
  }

  async function buscar() {
    if (cep == '') {
      alert('Digite um cep válido!');
      setCep('');
      return;
    }
    try {
      const response = await api.get(`/${cep}/json`);
      setCepUser(response.data);
      Keyboard.dismiss();
    } catch (error) {
      console.log('Error: ' + error);
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}>Digite o CEP desejado !</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 89765432"
          placeholderTextColor="#808080"
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#CCC' }]}
          onPress={buscar} >
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#CCC' }]}
          onPress={limpar} >
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser &&
        <View style={styles.resultado}>
          <Text style={[styles.itemText, { color: '#000' }]}>CEP: {cepUser.cep}</Text>
          <Text style={[styles.itemText, { color: '#000' }]}>Logradouro: {cepUser.logradouro} </Text>
          <Text style={[styles.itemText, { color: '#000' }]}>Bairro: {cepUser.bairro} </Text>
          <Text style={[styles.itemText, { color: '#000' }]}>Cidade: {cepUser.localidade} </Text>
          <Text style={[styles.itemText, { color: '#000' }]}>Estado: {cepUser.uf} </Text>
        </View>
      }

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080'
  },
  text: {
    marginTop: 30,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  input: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    width: '60%',
    padding: 10,
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  botao: {
    marginTop: 12,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: "center",
    padding: 6,
    borderRadius: 8,
  },
  botaoText: {
    fontSize: 18,
    color: 'rgba(0,0,0,0.6)',
  },
  img: {
    width: 130,
    height: 130,
    marginLeft: 120,
    zIndex: 99,
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
  }

});