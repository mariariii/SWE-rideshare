class car {
    constructor(licencePlate = '', make = '', model = '', color = '') {
        this.licencePlate = licencePlate; // License plate of the car
        this.make = make;                 // Make of the car
        this.model = model;               // Model of the car
        this.color = color;               // Color of the car
    }
}

module.exports = car; // Export the class for use in other files
