
const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate correct message object', ()=>{
        var from = 'Jenila';
        var text = "some text";
        var message = generateMessage(from, text);
        expect( typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});

describe('generateLOcationMessage', ()=>{
    it('should generate correct location object', ()=>{
        var from = 'Morshed';
        var lat = 13;
        var lon = 23;
        var url  = 'http://www.google.com/maps?q=13,23';
        var message = generateLocationMessage(from, lat,lon);
        expect( typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});
