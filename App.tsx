import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from './components/Header/Header';
import { UsateText } from './components/UsateText/UsateText';
import { BoxContainer } from './components/Box/BoxContainer';
import uuid from 'uuid';
import { TopicContainer } from './components/Topic/TopicContainer';


const boxes: Array<string> = [
  'Did well?',
  'Did badly?',
  'Should start doing?',
  'Should stop doing?'
]
const topics: Array<string> = [
  'Example 1',
  'Example 2',
  'Example 3',
  'Example 4',
  'Example 5'
]

export default function App() {
  return (
    <View style={styles.container}>
      <Header title="What do you think we..." />
      <UsateText />
      {boxes.map(boxTitle => (<BoxContainer title={boxTitle} key={uuid.v1()} topics={[]} />))}
      <TopicContainer topics={topics} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

  },
});
