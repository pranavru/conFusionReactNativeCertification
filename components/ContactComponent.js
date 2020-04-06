import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

const contactDetails = {
    addressLine1: "121, Clear Water Bay Road",
    addressLine2: "Clear Water Bay, Kowloon",
    city: "HONG KONG",
    telNumber: "+852 1234 5678",
    fax: "+852 8765 4321",
    email: "confusion@food.net"
};

const ContactUs = (props) => {

    return (
        <Card
            title="Contact Information"
        >
            <Text style={{ margin: 10 }}>{contactDetails.addressLine1}</Text>
            <Text style={{ margin: 10 }}>{contactDetails.addressLine2}</Text>
            <Text style={{ margin: 10 }}>{contactDetails.city}</Text>
            <Text style={{ margin: 10 }}>Tel: {contactDetails.telNumber}</Text>
            <Text style={{ margin: 10 }}>Fax: {contactDetails.fax}</Text>
            <Text style={{ margin: 10 }}>Email: {contactDetails.email}</Text>
        </Card>
    );
}

export default ContactUs;