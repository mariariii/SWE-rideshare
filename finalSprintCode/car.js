class Car {
    constructor(licencePlate = '', make = '', model = '', color = '') {
        this._licencePlate = licencePlate;
        this._make = make;
        this._model = model;
        this._color = color;
    }

    // Getter and Setter for licencePlate
    get licencePlate() {
        return this._licencePlate;
    }
    set licencePlate(value) {
        this._licencePlate = value;
    }

    // Getter and Setter for make
    get make() {
        return this._make;
    }
    set make(value) {
        this._make = value;
    }

    // Getter and Setter for model
    get model() {
        return this._model;
    }
    set model(value) {
        this._model = value;
    }

    // Getter and Setter for color
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
}

module.exports = Car;
