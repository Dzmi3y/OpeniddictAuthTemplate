export default class ApiRequestInfo {
    constructor(isSuccessful: boolean, message: string = '') {
        this._isSuccessful = isSuccessful
        this._message = message
    }
    private _isSuccessful: boolean
    private _message: string

    get isSuccessful(): boolean {
        return this._isSuccessful
    }

    get message(): string {
        return this._message
    }
}
