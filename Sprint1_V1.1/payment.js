class payment {
    constructor(
        paymentId = 0,
        riderId = 0,
        rideId = 0,
        isAccepted = false,
        method = '',
        paymentTime = new Date(0) // Default to epoch time
    ) {
        this.paymentId = paymentId; // Payment ID
        this.riderId = riderId;     // Rider ID
        this.rideId = rideId;       // Ride ID
        this.isAccepted = isAccepted; // Whether the payment is accepted (boolean)
        this.method = method;       // Payment method (e.g., cash, card)
        this.paymentTime = paymentTime; // Date and time of the payment (JavaScript Date object)
    }
}

module.exports = payment; // Export the class for use in other files