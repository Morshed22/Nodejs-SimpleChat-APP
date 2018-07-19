
const expect = require('expect');
const {isRealString} = require('./validation');

describe('is Real String',()=>{
    it('should reject non string values',()=>{
        var res = isRealString(98);
        expect(res).toBe(false);
    });

    it('should reject non empty values',()=>{
        var res = isRealString('       ');
        expect(res).toBe(false);
    });


    it('should alow string with non space character',()=>{
        var res = isRealString('   Morshed ');
        expect(res).toBe(true);
    });
});