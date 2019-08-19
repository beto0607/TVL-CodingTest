import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ApplicationState, Category } from '../../types/types';
import { CategoryContainer } from './CategoryContainer';
import { connect } from 'react-redux';

/**
 * COMPONENT PROPS
 */
interface OwnProps { }
interface StateProps {
    categories: Array<Category>;
    tokenUpdate: string;
}
interface DispatchProps { }
export type Props = StateProps & DispatchProps & OwnProps
/**
 * REACT COMPONENT
 */
export const CategoriesWrapperConnected: React.FC<Props> = ({ categories }: Props) => {
    console.log(categories);
    return (
        <View style={styles.container}>
            {categories.map((category) => (<CategoryContainer {...category} key={category.id} />))}
        </View>
    )
};
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
const mapStateToProps = ({ categoryReducer: { categories, tokenUpdate } }: ApplicationState): StateProps => ({
    categories,
    tokenUpdate
})

export const CategoriesWrapper = connect(mapStateToProps)(CategoriesWrapperConnected);
