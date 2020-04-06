import React, { Component } from 'react';
import { Text, FlatList, ScrollView } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';

const History = () => {
    return (
        <Card title='Our History' style={{ height: '10%' }}>
            <Text style={{ margin: 10, fontSize: 9 }}>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
            <Text style={{ margin: 10, fontSize: 9 }}>
                The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
            </Text>
        </Card>
    );
}

class AboutUs extends Component {

    static navigationOptions = {
        title: 'About Us'
    };
    //state = {  }
    render() {
        const renderMenuItem = ({ item, index }) => {

            return (
                <ListItem
                    key={index}
                    title={<Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.name}</Text>}
                    subtitle={<Text style={{ fontSize: 10 }}>{item.description}</Text>}
                    leftAvatar={{ source: require("./images/alberto.png") }}
                />
            );
        };

        return (
            <ScrollView
                alwaysBounceVertical
                showsVerticalScrollIndicator="false"
                style={{ marginBottom: '5%' }}>
                <History />
                <Card title='Corporate Leaders' style={{ marginBottom: '32%' }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={LEADERS}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );
    }
}

export default AboutUs;