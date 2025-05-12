class Payment {
    constructor(
        paymentId = 0,
        riderId = 0,
        rideId = 0,
        isAccepted = false,
        method = '',
        paymentTime = new Date(0)
    ) {
        this._paymentId = paymentId;
        this._riderId = riderId;
        this._rideId = rideId;
        this._isAccepted = isAccepted;
        this._method = method;
        this._paymentTime = paymentTime;
    }

    // Getter and Setter for paymentId
    get paymentId() {
        return this._paymentId;
    }
    set paymentId(value) {
        this._paymentId = value;
    }

    // Getter and Setter for riderId
    get riderId() {
        return this._riderId;
    }
    set riderId(value) {
        this._riderId = value;
    }

    // Getter and Setter for rideId
    get rideId() {
        return this._rideId;
    }
    set rideId(value) {
        this._rideId = value;
    }

    // Getter and Setter for isAccepted
    get isAccepted() {
        return this._isAccepted;
    }
    set isAccepted(value) {
        this._isAccepted = value;
    }

    // Getter and Setter for method
    get method() {
        return this._method;
    }
    set method(value) {
        this._method = value;
    }

    // Getter and Setter for paymentTime
    get paymentTime() {
        return this._paymentTime;
    }
    set paymentTime(value) {
        this._paymentTime = value;
    }
}

module.exports = Payment;
