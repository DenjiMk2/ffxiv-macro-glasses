import convertMacro2Html from '@/../main/convertMacro2Html';

describe('convertMacro2Html', () => {
  it('return normal text ', () => {
    expect(convertMacro2Html('test')).to.contain('test');
  });
  it('Trim /p', () => {
    expect(convertMacro2Html('/p test\r\n/p test')).to.contain(' test\n test');
  });
  it('Trim chat header', () => {
    expect(convertMacro2Html('[21:03] (Ya HinHades) 【水のルーン】\r\n[1:03] (Ya HinHades) 【火のルーン】')).to.contain(' 【水のルーン】\n 【火のルーン】');
  });
  it('MT text convert', () => {
    expect(convertMacro2Html('MT')).to.contain("<span class='tank'>MT</span>");
    expect(convertMacro2Html('ＭＴ')).to.contain("<span class='tank'>ＭＴ</span>");
    expect(convertMacro2Html('mt')).to.contain('mt');
  });
  it('Call MT attache "MT" class', () => {
    expect(convertMacro2Html('MT', 'MT')).to.contain("<span class='tank'><span class='me'>MT</span></span>");
  });
  it('ST text convert', () => {
    expect(convertMacro2Html('ST')).to.contain("<span class='tank'>ST</span>");
  });
  it('Call ST attache "ST" class', () => {
    expect(convertMacro2Html('ST', 'ST')).to.contain("<span class='tank'><span class='me'>ST</span></span>");
  });
  it('D1 text convert', () => {
    expect(convertMacro2Html('D1\ntest\nD1')).to.contain("<span class='dps'>D1</span>\ntest\n<span class='dps'>D1</span>");
    expect(convertMacro2Html('Ｄ１')).to.contain("<span class='dps'>Ｄ１</span>");
  });
  it('Call D1 attache "D1" class', () => {
    expect(convertMacro2Html('D1', 'D1')).to.contain("<span class='dps'><span class='me'>D1</span></span>");
  });
  it('D2 text convert', () => {
    expect(convertMacro2Html('D2\ntest\nD2')).to.contain("<span class='dps'>D2</span>\ntest\n<span class='dps'>D2</span>");
    expect(convertMacro2Html('Ｄ２')).to.contain("<span class='dps'>Ｄ２</span>");
  });
  it('Call D2 attache "D2" class', () => {
    expect(convertMacro2Html('D2', 'D2')).to.contain("<span class='dps'><span class='me'>D2</span></span>");
  });
  it('D3 text convert', () => {
    expect(convertMacro2Html('D3\ntest\nD3')).to.contain("<span class='dps'>D3</span>\ntest\n<span class='dps'>D3</span>");
    expect(convertMacro2Html('Ｄ３')).to.contain("<span class='dps'>Ｄ３</span>");
  });
  it('Call D3 attache "D3" class', () => {
    expect(convertMacro2Html('D3', 'D3')).to.contain("<span class='dps'><span class='me'>D3</span></span>");
  });
  it('D4 text convert', () => {
    expect(convertMacro2Html('D4\ntest\nD4')).to.contain("<span class='dps'>D4</span>\ntest\n<span class='dps'>D4</span>");
    expect(convertMacro2Html('Ｄ４')).to.contain("<span class='dps'>Ｄ４</span>");
  });
  it('Call D4 attache "D4" class', () => {
    expect(convertMacro2Html('D4', 'D4')).to.contain("<span class='dps'><span class='me'>D4</span></span>");
  });
  it('H1 text convert', () => {
    expect(convertMacro2Html('H1\ntest\nH1')).to.contain("<span class='healer'>H1</span>\ntest\n<span class='healer'>H1</span>");
    expect(convertMacro2Html('Ｈ１')).to.contain("<span class='healer'>Ｈ１</span>");
  });
  it('Call H1 attache "H1" class', () => {
    expect(convertMacro2Html('H1', 'H1')).to.contain("<span class='healer'><span class='me'>H1</span></span>");
  });
  it('H2 text convert', () => {
    expect(convertMacro2Html('H2\ntest\nH2')).to.contain("<span class='healer'>H2</span>\ntest\n<span class='healer'>H2</span>");
    expect(convertMacro2Html('Ｈ２')).to.contain("<span class='healer'>Ｈ２</span>");
  });
  it('Call H2 attache "H2" class', () => {
    expect(convertMacro2Html('H2', 'H2')).to.contain("<span class='healer'><span class='me'>H2</span></span>");
  });
  it('Dont atache "me" class before call', () => {
    expect(convertMacro2Html('MT\nST\nD1\nD2\nD3\nD4\nH1\nH2', '')).to.contain("<span class='tank'>MT</span>\n<span class='tank'>ST</span>\n<span class='dps'>D1</span>\n<span class='dps'>D2</span>\n<span class='dps'>D3</span>\n<span class='dps'>D4</span>\n<span class='healer'>H1</span>\n<span class='healer'>H2</span>");
  });
  it('Convert tank roll', () => {
    expect(convertMacro2Html('MT\nST\nタンク\n断T ', '')).to.contain("<span class='tank'>MT</span>\n<span class='tank'>ST</span>\n<span class='tank'>タンク</span>\n断<span class='tank'>T</span> ");
    expect(convertMacro2Html('MT\nST\nタンク\n断T ', 'MT')).to.contain("<span class='tank'><span class='me'>MT</span></span>\n<span class='tank'>ST</span>\n<span class='tank me'>タンク</span>\n断<span class='tank me'>T</span> ");
    expect(convertMacro2Html('MT\nST\nタンク\n断T ', 'ST')).to.contain("<span class='tank'>MT</span>\n<span class='tank'><span class='me'>ST</span></span>\n<span class='tank me'>タンク</span>\n断<span class='tank me'>T</span> ");
  });
  it('Convert DPS roll', () => {
    expect(convertMacro2Html('D1\nD2\nD3\nD4\nDPS\n拡D ', '')).to.contain("<span class='dps'>D1</span>\n<span class='dps'>D2</span>\n<span class='dps'>D3</span>\n<span class='dps'>D4</span>\n<span class='dps'>DPS</span>\n拡<span class='dps'>D</span> ");
    expect(convertMacro2Html('D1\nD2\nD3\nD4\nDPS\n拡D ', 'D1')).to.contain("<span class='dps'><span class='me'>D1</span></span>\n<span class='dps'>D2</span>\n<span class='dps'>D3</span>\n<span class='dps'>D4</span>\n<span class='dps me'>DPS</span>\n拡<span class='dps me'>D</span> ");
    expect(convertMacro2Html('D1\nD2\nD3\nD4\nDPS\n拡D ', 'D2')).to.contain("<span class='dps'>D1</span>\n<span class='dps'><span class='me'>D2</span></span>\n<span class='dps'>D3</span>\n<span class='dps'>D4</span>\n<span class='dps me'>DPS</span>\n拡<span class='dps me'>D</span> ");
    expect(convertMacro2Html('D1\nD2\nD3\nD4\nDPS\n拡D ', 'D3')).to.contain("<span class='dps'>D1</span>\n<span class='dps'>D2</span>\n<span class='dps'><span class='me'>D3</span></span>\n<span class='dps'>D4</span>\n<span class='dps me'>DPS</span>\n拡<span class='dps me'>D</span> ");
    expect(convertMacro2Html('D1\nD2\nD3\nD4\nDPS\n拡D ', 'D4')).to.contain("<span class='dps'>D1</span>\n<span class='dps'>D2</span>\n<span class='dps'>D3</span>\n<span class='dps'><span class='me'>D4</span></span>\n<span class='dps me'>DPS</span>\n拡<span class='dps me'>D</span> ");
  });
  it('Convert healer roll', () => {
    expect(convertMacro2Html('H1\nH2\nヒラ\nヒーラー\n拡H ', '')).to.contain("<span class='healer'>H1</span>\n<span class='healer'>H2</span>\n<span class='healer'>ヒラ</span>\n<span class='healer'>ヒーラー</span>\n拡<span class='healer'>H</span> ");
    expect(convertMacro2Html('H1\nH2\nヒラ\nヒーラー\n拡H ', 'H1')).to.contain("<span class='healer'><span class='me'>H1</span></span>\n<span class='healer'>H2</span>\n<span class='healer me'>ヒラ</span>\n<span class='healer me'>ヒーラー</span>\n拡<span class='healer me'>H</span> ");
    expect(convertMacro2Html('H1\nH2\nヒラ\nヒーラー\n拡H ', 'H2')).to.contain("<span class='healer'>H1</span>\n<span class='healer'><span class='me'>H2</span></span>\n<span class='healer me'>ヒラ</span>\n<span class='healer me'>ヒーラー</span>\n拡<span class='healer me'>H</span> ");
  });
});
