class ride {
    constructor(
        rideId = 0,
        requestTime = new Date(0),       // Default to epoch time
        acceptTime = new Date(0),
        riderCancelTime = new Date(0),
        driverCancelTime = new Date(0),
        completeTime = new Date(0),
        rideStartTime = new Date(0)
    ) {
        this.rideId = rideId;                 // Ride ID
        this.requestTime = requestTime;       // Time when the ride was requested
        this.acceptTime = acceptTime;         // Time when the ride was accepted
        this.riderCancelTime = riderCancelTime; // Time when the rider canceled the ride
        this.driverCancelTime = driverCancelTime; // Time when the driver canceled the ride
        this.completeTime = completeTime;     // Time when the ride was completed
        this.rideStartTime = rideStartTime;   // Time when the ride started
    }

    // Setter for accept time
    setAcceptTime(acceptTime) {
        this.acceptTime = acceptTime;
    }

    // Setter for rider cancel time
    setRiderCancelTime(riderCancelTime) {
        this.riderCancelTime = riderCancelTime;
    }

    // Setter for driver cancel time
    setDriverCancelTime(driverCancelTime) {
        this.driverCancelTime = driverCancelTime;
    }

    // Setter for complete time
    setCompleteTime(completeTime) {
        this.completeTime = completeTime;
    }

    // Setter for ride start time
    setRideStartTime(rideStartTime) {
        this.rideStartTime = rideStartTime;
    }

    // Getter for ride ID
    getRideId() {
        return this.rideId;
    }
}

module.exports = ride; // Export the class for use in other files
