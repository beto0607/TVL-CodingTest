import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from './components/Header/Header';
import { UsateText } from './components/UsateText/UsateText';
import { TopicContainer } from './components/Topic/TopicContainer';
import { Provider, connect } from 'react-redux';
import { store } from './store';
import { ApplicationState } from './types/types';
import { CategoriesWrapper } from './components/Categories/CategoriesWrapper';
import { AddTopicComponent } from './components/Topic/AddTopicComponent';

/**
 * COMPONENT PROPS
 */
interface OwnProps { }
interface StateProps { }
interface DispatchProps { }
export type Props = StateProps & DispatchProps & OwnProps
/**
 * REACT COMPONENT
 */
export const App: React.FC<Props> = (props: Props) => (
  <Provider store={store}>
    <View style={styles.container}>
      <Header title="What do you think we..." />
      <UsateText />
      <CategoriesWrapper />
      <TopicContainer />
      <AddTopicComponent />
    </View>
  </Provider>
);
/**
 *  STYLES
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});