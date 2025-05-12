class Request {
    constructor(senderID = 0, receiverID = 0, requestDate = new Date(0), status = '') {
        this._senderID = senderID;
        this._receiverID = receiverID;
        this._requestDate = requestDate;
        this._status = status;
    }

    // Getter and Setter for senderID
    get senderID() {
        return this._senderID;
    }
    set senderID(value) {
        this._senderID = value;
    }

    // Getter and Setter for receiverID
    get receiverID() {
        return this._receiverID;
    }
    set receiverID(value) {
        this._receiverID = value;
    }

    // Getter and Setter for requestDate
    get requestDate() {
        return this._requestDate;
    }
    set requestDate(value) {
        this._requestDate = value;
    }

    // Getter and Setter for status
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
}

module.exports = Request;
