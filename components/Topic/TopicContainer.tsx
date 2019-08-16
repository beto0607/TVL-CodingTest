import React, { useState } from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';

export interface Props {
    topics: Array<string>;
}
export interface State {
}
export class TopicContainer extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);

    }
    render() {
        return (
            <View>
                <Text>TopicContainer</Text>
            </View>
        );
    }
}