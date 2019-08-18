import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CategoriesState, ApplicationState } from '../../types/types';
import { CategoryContainer } from './CategoryContainer';
import { connect } from 'react-redux';

/**
 * COMPONENT PROPS
 */
interface OwnProps { }
interface StateProps extends CategoriesState { }
interface DispatchProps { }
export type Props = StateProps & DispatchProps & OwnProps
/**
 * REACT COMPONENT
 */
export const CategoriesWrapperConnected: React.FC<Props> = ({ categories }: Props) => (
    <View style={styles.container}>
        {categories.map((category) => (<CategoryContainer {...category} key={category.id} />))}
    </View>
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
const mapStateToProps = ({ categoryReducer: { categories } }: ApplicationState): StateProps => ({
    categories,
})

export const CategoriesWrapper = connect(mapStateToProps)(CategoriesWrapperConnected);
