import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async obtainCalendarPermission() {
        let permissionCalendar = await Permissions.getAsync(Permissions.CALENDAR);
        if (permissionCalendar.status !== 'granted') {
            permissionCalendar = await Permissions.askAsync(Permissions.CALENDAR);
            if (permissionCalendar.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permissionCalendar;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

    async getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
    }


    async addReservationToCalendar(date) {
        await this.obtainCalendarPermission();
        const defaultCalendarSource =
            Platform.OS === 'ios'
                ? await this.getDefaultCalendarSource()
                : { isLocalAccount: true, name: 'Expo Calendar' };
        const newCalendarID = await Calendar.createCalendarAsync({
            title: "Your Reservation",
            color: "#512DA8",
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        })
        console.log("New Calendar Id is: " + newCalendarID);
        const eventSet = await Calendar.createEventAsync(newCalendarID, {
            title: "Con Fusion Table Reservation",
            startDate: Date.parse(date),
            endDate: (Date.parse(date) + (2 * 60 * 60 * 1000)),
        })
        console.log("Event is set: " + eventSet);
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }

    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                    <ScrollView>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Number of Guests</Text>
                            <Picker
                                style={styles.formItem}
                                selectedValue={this.state.guests}
                                onValueChange={(itemValue) => this.setState({ guests: itemValue })}>
                                <Picker.Item label="1" value="1" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4" value="4" />
                                <Picker.Item label="5" value="5" />
                                <Picker.Item label="6" value="6" />
                            </Picker>
                        </View>
                        <View style={styles.formRow}>
                            <Text style={[styles.formLabel, { flex: 2.5 }]}>Smoking/Non-Smoking?</Text>
                            <Switch
                                style={[styles.formItem, { justifyContent: 'flex-end', flex: 0.5 }]}
                                value={this.state.smoking}
                                onTintColor='#512DA8'
                                onValueChange={(value) => this.setState({ smoking: value })}>
                            </Switch>
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Date and Time</Text>
                            <DatePicker
                                style={{ flex: 2 }}
                                date={this.state.date}
                                format=''
                                mode="datetime"
                                placeholder="Select Date and Time"
                                minDate="2017-01-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                    // ... You can check the source to find the other keys. 
                                }}
                                onDateChange={(date) => { this.setState({ date: date }) }}
                            />
                        </View>
                        <View style={[styles.formRow, { backgroundColor: '#512DA8', borderRadius: 10 }]}>
                            <Button
                                onPress={() => {
                                    Alert.alert(
                                        'Your Reservation OK?',
                                        'Number of Guests: ' + this.state.guests + '\nSmoking? ' + this.state.smoking + '\nDate and Time: ' + this.state.date,
                                        [
                                            { text: 'Cancel', onPress: () => { this.resetForm(); console.log('Cancel Pressed') }, style: 'cancel' },
                                            {
                                                text: 'OK', onPress: () => {
                                                    this.presentLocalNotification(this.state.date);
                                                    this.addReservationToCalendar(this.state.date);
                                                    this.resetForm();
                                                }
                                            },
                                        ],
                                        { cancelable: false }
                                    );
                                }}
                                title="Reserve"
                                color="#fff"
                                accessibilityLabel="Learn more about this purple button"
                            />
                        </View>

                        <Modal animationType={"slide"} transparent={false}
                            visible={false}
                            // onDismiss={() => this.toggleModal()}
                            onRequestClose={() => this.toggleModal()}
                        >
                            <View style={styles.modal}>
                                <Text style={styles.modalTitle}>Your Reservation</Text>
                                <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                                <Text style={styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                                <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>

                                <Button
                                    onPress={() => {
                                        this.toggleModal();
                                        this.resetForm();
                                    }}
                                    color="#512DA8"
                                    title="Close"
                                />
                            </View>
                        </Modal>
                    </ScrollView>
                </Animatable.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#fff',
        marginVertical: '15%',
        flex: 1
    },
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    formLabel: {
        fontSize: 18,
        flex: 1.5
    },
    formItem: {
        flex: 1.5,
        alignSelf: 'stretch'
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;