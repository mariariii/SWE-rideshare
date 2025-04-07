class report {
    constructor(
        reportId = 0,
        reporterId = 0,
        rideId = 0,
        description = '',
        reportedAt = new Date(0), // Default to epoch time
        isReviewed = false
    ) {
        this.reportId = reportId;       // Report ID
        this.reporterId = reporterId;   // Reporter ID
        this.rideId = rideId;           // Ride ID
        this.description = description; // Description of the report
        this.reportedAt = reportedAt;   // Date and time the report was created (JavaScript Date object)
        this.isReviewed = isReviewed;   // Whether the report has been reviewed (boolean)
    }

    // Method to set the isReviewed property
    setIsReviewed(isReviewed) {
        this.isReviewed = isReviewed;
    }
}

module.exports = report; // Export the class for use in other files
