import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

const contactDetails = {
    addressLine1: "121, Clear Water Bay Road",
    addressLine2: "Clear Water Bay, Kowloon",
    city: "HONG KONG",
    telNumber: "+852 1234 5678",
    fax: "+852 8765 4321",
    email: "confusion@food.net"
};

class ContactUs extends Component {

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    render() {
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000} >
                <Card title="Contact Information" >
                    <Text style={styles.textCss}>{contactDetails.addressLine1}</Text>
                    <Text style={styles.textCss}>{contactDetails.addressLine2}</Text>
                    <Text style={styles.textCss}>{contactDetails.city}</Text>
                    <Text style={styles.textCss}>Tel: {contactDetails.telNumber}</Text>
                    <Text style={styles.textCss}>Fax: {contactDetails.fax}</Text>
                    <Text style={styles.textCss}>Email: {contactDetails.email}</Text>
                    <Button
                        title="Send Email"
                        buttonStyle={{ backgroundColor: "#512DA8" }}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                    />
                </Card>
            </Animatable.View>
        );
    }
}


const styles = StyleSheet.create({
    textCss: { margin: 10 }
});
export default ContactUs;