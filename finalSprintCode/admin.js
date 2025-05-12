const Report = require('./report');
const User = require('./user');

class admin {
    constructor(adminId = 0, firstName = '', lastName = '') {
        this.adminId = adminId;       // Admin ID
        this.firstName = firstName;   // Admin's first name
        this.lastName = lastName;     // Admin's last name
    }

    // Method to view a report and mark it as reviewed
    viewReport(reportToView) {
        if (reportToView instanceof Report) {
            reportToView.setIsReviewed(true); // Mark the report as reviewed
        } else {
            throw new Error('Invalid report object.');
        }
    }

    // Method to ban a user's profile
    banProfile(userToBan) {
        if (userToBan instanceof User) {
            userToBan.setIsBanned(true); // Ban the user
        } else {
            throw new Error('Invalid user object.');
        }
    }

    // Placeholder for issuing penalties (to be implemented)
    issuePenalty(userToPenalize) {
        if (userToPenalize instanceof User) {
            console.log(`Penalty issued to user with AUC ID: ${userToPenalize.aucId}`);
            // Add penalty logic here as needed
        } else {
            throw new Error('Invalid user object.');
        }
    }
}

module.exports = admin;