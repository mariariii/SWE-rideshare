class Report {
    constructor(
        reportId = 0,
        reporterId = 0,
        rideId = 0,
        description = '',
        reportedAt = new Date(0),
        isReviewed = false
    ) {
        this._reportId = reportId;
        this._reporterId = reporterId;
        this._rideId = rideId;
        this._description = description;
        this._reportedAt = reportedAt;
        this._isReviewed = isReviewed;
    }

    // Getter and Setter for reportId
    get reportId() {
        return this._reportId;
    }
    set reportId(value) {
        this._reportId = value;
    }

    // Getter and Setter for reporterId
    get reporterId() {
        return this._reporterId;
    }
    set reporterId(value) {
        this._reporterId = value;
    }

    // Getter and Setter for rideId
    get rideId() {
        return this._rideId;
    }
    set rideId(value) {
        this._rideId = value;
    }

    // Getter and Setter for description
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }

    // Getter and Setter for reportedAt
    get reportedAt() {
        return this._reportedAt;
    }
    set reportedAt(value) {
        this._reportedAt = value;
    }

    // Getter and Setter for isReviewed
    get isReviewed() {
        return this._isReviewed;
    }
    set isReviewed(value) {
        this._isReviewed = value;
    }

    // Optional: keep the original method for compatibility
    setIsReviewed(isReviewed) {
        this._isReviewed = isReviewed;
    }
}

module.exports = Report;
