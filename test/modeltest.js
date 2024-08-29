const assert = require('assert');
const dataModel = require('../models/dataModel');

describe('User Authentication', () => {

    it('should fail when the username is not provided', () => {
        const user = { password: 'password123' };
        assert.throws(() => {
            dataModel.validateUser(user);
        }, /Username is required/);
    });

    it('should fail when the password is not provided', () => {
        const user = { username: 'testUser' };
        assert.throws(() => {
            dataModel.validateUser(user);
        }, /Password is required/);
    });

    it('should authenticate user with valid username and password', () => {
        const user = { username: 'testUser', password: 'password123' };
        const result = dataModel.validateUser(user);
        assert.strictEqual(result, true);
    });

    it('should fail when username is incorrect', () => {
        const user = { username: 'wrongUser', password: 'password123' };
        const result = dataModel.validateUser(user);
        assert.strictEqual(result, false);
    });

    it('should fail when password is incorrect', () => {
        const user = { username: 'testUser', password: 'wrongPassword' };
        const result = dataModel.validateUser(user);
        assert.strictEqual(result, false);
    });

});
