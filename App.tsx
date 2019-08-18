import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Header } from './components/Header/Header';
import { UsateText } from './components/UsateText/UsateText';
import { TopicContainer } from './components/Topic/TopicContainer';
import { Provider } from 'react-redux';
import { store } from './store';
import { CategoriesWrapper } from './components/Categories/CategoriesWrapper';
import { AddTopicComponent } from './components/Topic/AddTopicComponent';
import { SelectedTopicComponent } from './components/Topic/SelectedTopic';

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
    <ScrollView style={styles.container}>
      <Header title="What do you think we..." />
      <UsateText />
      <CategoriesWrapper />
      <TopicContainer />
    </ScrollView>
    <SelectedTopicComponent />
    <AddTopicComponent />
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