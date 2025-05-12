const Ride = require('./ride');
const Payment = require('./payment');
const Report = require('./report');
const Car = require('./car');
const Request = require('./request');

// Global counters for IDs
let rideIdCounter = 1;
let paymentIdCounter = 1;
let reportIdCounter = 1;

class user {
    constructor(
        aucId = 0,
        firstName = '',
        lastName = '',
        phoneNumber = 0,
        isDriver = false,
        isBanned = false,
        car = '', // Array to hold Car objects (only for drivers)
        friends = [], // Array to hold friends 
        blockedBy = [], // Array to hold users who blocked current user
        preferences = [], //Array to hold user preferences (strings)
        password = '',
        rating = 5
    ) {
        this.aucId = aucId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.isDriver = isDriver;
        this.isBanned = isBanned;
        this.car = isDriver ? car : ''; // Only drivers can have a car
        this.friends = friends;
        this.blockedBy = blockedBy;
        this.preferences = preferences;
        this.password = password;
        this.rating = rating;
    }

    // Getter and Setter for aucId
    get aucId() {
        return this._aucId;
    }
    set aucId(value) {
        this._aucId = value;
    }

    // Getter and Setter for firstName
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }

    // Getter and Setter for lastName
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }

    // Getter and Setter for phoneNumber
    get phoneNumber() {
        return this._phoneNumber;
    }
    set phoneNumber(value) {
        this._phoneNumber = value;
    }

    // Getter and Setter for isDriver
    get isDriver() {
        return this._isDriver;
    }
    set isDriver(value) {
        this._isDriver = value;
    }

    // Getter and Setter for isBanned
    get isBanned() {
        return this._isBanned;
    }
    set isBanned(value) {
        this._isBanned = value;
    }

    // Getter and Setter for car
    get car() {
        return this._car;
    }
    set car(value) {
        // Only drivers can have a car
        if (this._isDriver) {
            this._car = value;
        } else {
            this._car = '';
        }
    }

    // Getter and Setter for password
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }

    // Getter for rating
    get rating() {
        return this._rating;
    }

    // Getter for friends
    get friends() {
        return this._friends;
    }

    // Getter for blockedBy
    get blockedBy() {
        return this._blockedBy;
    }

    // Getter for preferences
    get preferences() {
        return this._preferences;
    }

    // Method to add a preference
    addPreference(preference) {
        this._preferences.push(preference);
    }

    // Method to request a ride
    requestRide() {
        if (!this.isDriver && !this.isBanned) {
            const now = new Date();
            return new Ride(rideIdCounter++, now, null, null, null, null, null);
        } else {
            throw new Error('User cannot request a ride.');
        }
    }

    // Method to accept a ride
    acceptRide(rideRequest) {
        if (this.isDriver && !this.isBanned) {
            const now = new Date();
            rideRequest.acceptTime = now;
        } else {
            throw new Error('User cannot accept a ride.');
        }
    }

    // Method to start a ride
    startRide(rideRequest) {
        if (this.isDriver && !this.isBanned) {
            const now = new Date();
            rideRequest.rideStartTime = now;
        } else {
            throw new Error('User cannot start a ride.');
        }
    }

    // Method to complete a ride
    completeRide(rideRequest) {
        if (this.isDriver && !this.isBanned) {
            const now = new Date();
            rideRequest.completeTime = now;
        } else {
            throw new Error('User cannot complete a ride.');
        }
    }

    // Method for driver to cancel a ride
    driverCancelRide(rideRequest) {
        if (this.isDriver && !this.isBanned) {
            const now = new Date();
            rideRequest.riderCancelTime = now;
        } else {
            throw new Error('User cannot cancel a ride as a driver.');
        }
    }

    // Method for rider to cancel a ride
    riderCancelRide(rideRequest) {
        if (!this.isDriver && !this.isBanned) {
            const now = new Date();
            rideRequest.riderCancelTime = now;
        } else {
            throw new Error('User cannot cancel a ride as a rider.');
        }
    }

    // Method to make a payment
    makePayment(rideRequest, method) {
        if (!this.isDriver && !this.isBanned) {
            if (['Cash', 'Telda', 'Instapay'].includes(method)) {
                const now = new Date();
                return new Payment(paymentIdCounter++, this.aucId, rideRequest.getRideId(), true, method, now);
            } else {
                throw new Error('Invalid payment method chosen.');
            }
        } else {
            throw new Error('User cannot make a payment.');
        }
    }

    // Method for driver to make a report
    makeDriverReport(rideRequest, description) {
        if (this.isDriver && !this.isBanned) {
            const now = new Date();
            return new Report(reportIdCounter++, this.aucId, rideRequest.getRideId(), description, now, false);
        } else {
            throw new Error('User cannot make a driver report.');
        }
    }

    // Method for rider to make a report
    makeRiderReport(rideRequest, description) {
        if (!this.isDriver && !this.isBanned) {
            const now = new Date();
            return new Report(reportIdCounter++, this.aucId, rideRequest.getRideId(), description, now, false);
        } else {
            throw new Error('User cannot make a rider report.');
        }
    }


    //Method to send friend request
    sendRequest(receiver) {
        if (this.isBanned) {
            throw new Error('User cannot send friend request.');
        }
        if (receiver.blockedBy.includes(this.aucId)) { //check if sender is blocked by receiver
            throw new Error('You are blocked by this user and cannot send a friend request.');
        }
        const now = new Date();
        return new Request(this.aucId, receiver.aucId, now, "Pending");
    }

    //Method to accept friend request
    acceptRequest(request) {
        if (!this.isBanned) {
            request.status = "Accepted";
            this.friends.push(request.senderID);
        }
        else {
            throw new Error('User cannot accept friend request.');
        }
    }

    //Method to decline friend request
    declineRequest(request) {
        if (!this.isBanned) {
            request.status = "Declined";
        }
        else {
            throw new Error('User cannot decline friend request.');
        }
    }

    //Method to block user
    blockUser(user) {
        if (!this.isBanned) {
            user.blockedBy.push(this.aucId);
        }
    }

    //Method to rate user
    rateUser(user,rate) {
        user._rating=rate;
    }

}

module.exports = user;
