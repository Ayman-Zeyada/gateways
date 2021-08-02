const { expect } = require('chai');

describe('The gateway listing', () => {
    it('has no items initially', () => {
        let gateways = [];
        const length = gateways.length;

        expect(length).to.equal(0);
    });
});