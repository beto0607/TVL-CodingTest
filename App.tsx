import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from './components/Header/Header';
import { UsateText } from './components/UsateText/UsateText';
import { CategoryContainer } from './components/Box/CategoryContainer';
import { TopicContainer } from './components/Topic/TopicContainer';
import { Provider, connect } from 'react-redux';
import { store } from './store';
import { CategoriesState, ApplicationState, TopicState } from './types/types';

/**
 * COMPONENT PROPS
 */
interface OwnProps { }
interface StateProps extends CategoriesState, TopicState { }
interface DispatchProps { }
export type Props = StateProps & DispatchProps & OwnProps
/**
 * REACT COMPONENT
 */
export const AppConnected: React.FC<Props> = ({ categories, topics }: Props) => (
  <Provider store={store}>
    <View style={styles.container}>
      <Header title="What do you think we..." />
      <UsateText />
      {categories.map((category) => (<CategoryContainer {...category} key={category.id} />))}
      <TopicContainer />
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
/**
 * REDUX 
 */
const mapStateToProps = ({ categoryReducer: { categories }, topicReducer: { topics, selectedTopic } }: ApplicationState): StateProps => ({
  categories,
  topics,
  selectedTopic
})

export const App = connect(mapStateToProps)(AppConnected);
