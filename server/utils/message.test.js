
const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate correct message object', ()=>{
        var from = 'Jenila';
        var text = "some text";
        var message = generateMessage(from, text);
        expect( typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});
