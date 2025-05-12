const Ride = require('./ride');
const Payment = require('./payment');
const Report = require('./report');

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
        isBanned = false
    ) {
        this.aucId = aucId; // AUC ID
        this.firstName = firstName; // First name
        this.lastName = lastName; // Last name
        this.phoneNumber = phoneNumber; // Phone number
        this.isDriver = isDriver; // Is the user a driver?
        this.isBanned = isBanned; // Is the user banned?
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
            rideRequest.setAcceptTime(now);
        } else {
            throw new Error('User cannot accept a ride.');
        }
    }

    // Method to start a ride
    startRide(rideRequest) {
        if (this.isDriver && !this.isBanned) {
            const now = new Date();
            rideRequest.setRideStartTime(now);
        } else {
            throw new Error('User cannot start a ride.');
        }
    }

    // Method to complete a ride
    completeRide(rideRequest) {
        if (this.isDriver && !this.isBanned) {
            const now = new Date();
            rideRequest.setCompleteTime(now);
        } else {
            throw new Error('User cannot complete a ride.');
        }
    }

    // Method for driver to cancel a ride
    driverCancelRide(rideRequest) {
        if (this.isDriver && !this.isBanned) {
            const now = new Date();
            rideRequest.setDriverCancelTime(now);
        } else {
            throw new Error('User cannot cancel a ride as a driver.');
        }
    }

    // Method for rider to cancel a ride
    riderCancelRide(rideRequest) {
        if (!this.isDriver && !this.isBanned) {
            const now = new Date();
            rideRequest.setRiderCancelTime(now);
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

    // Method to set the banned status
    setIsBanned(isBanned) {
        this.isBanned = isBanned;
    }
}

module.exports = user;
