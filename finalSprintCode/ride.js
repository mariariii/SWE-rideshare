class Ride {
    constructor(
        rideId = 0,
        requestTime = new Date(0),
        acceptTime = new Date(0),
        riderCancelTime = new Date(0),
        driverCancelTime = new Date(0),
        completeTime = new Date(0),
        rideStartTime = new Date(0)
    ) {
        this._rideId = rideId;
        this._requestTime = requestTime;
        this._acceptTime = acceptTime;
        this._riderCancelTime = riderCancelTime;
        this._driverCancelTime = driverCancelTime;
        this._completeTime = completeTime;
        this._rideStartTime = rideStartTime;
    }

    // Getter and Setter for rideId
    get rideId() {
        return this._rideId;
    }
    set rideId(value) {
        this._rideId = value;
    }

    // Getter and Setter for requestTime
    get requestTime() {
        return this._requestTime;
    }
    set requestTime(value) {
        this._requestTime = value;
    }

    // Getter and Setter for acceptTime
    get acceptTime() {
        return this._acceptTime;
    }
    set acceptTime(value) {
        this._acceptTime = value;
    }

    // Getter and Setter for riderCancelTime
    get riderCancelTime() {
        return this._riderCancelTime;
    }
    set riderCancelTime(value) {
        this._riderCancelTime = value;
    }

    // Getter and Setter for driverCancelTime
    get driverCancelTime() {
        return this._driverCancelTime;
    }
    set driverCancelTime(value) {
        this._driverCancelTime = value;
    }

    // Getter and Setter for completeTime
    get completeTime() {
        return this._completeTime;
    }
    set completeTime(value) {
        this._completeTime = value;
    }

    // Getter and Setter for rideStartTime
    get rideStartTime() {
        return this._rideStartTime;
    }
    set rideStartTime(value) {
        this._rideStartTime = value;
    }
}

module.exports = Ride;
