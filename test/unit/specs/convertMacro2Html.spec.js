import convertMacro2Html from '@/../main/convertMacro2Html';

describe('convertMacro2Html', () => {
  it('return normal text ', () => {
    expect(convertMacro2Html('test')).to.contain('test');
  });
});
