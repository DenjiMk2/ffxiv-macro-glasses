<template>
  <div>
    <div>
      <select class="me" v-model="meRole" @change="throwGlass">
        <option value="">宣言</option>
        <option class="tank">MT</option>
        <option class="tank">ST</option>
        <option class="dps">D1</option>
        <option class="dps">D2</option>
        <option class="dps">D3</option>
        <option class="dps">D4</option>
        <option class="healer">H1</option>
        <option class="healer">H2</option>
      </select>
    </div>
    <textarea v-model="inMacro" @input="throwGlass">
    </textarea>
    <div class="outputPanel" v-html="outMacro">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'main-page',
    data() {
      return {
        inMacro: '',
        outMacro: '',
        meRole: '',
      };
    },
    methods: {
      throwGlass() {
        this.outMacro = this.convertMacroString2Html(this.inMacro, this.meRole);
      },
      convertMacroString2Html(inStr, meRole) {
        let ret = inStr;
        let tankClass = 'tank';
        let dpsClass = 'dps';
        let healerClass = 'healer';
        if (meRole) {
          switch (meRole) {
            case 'MT':
            case 'ST':
              tankClass = 'tank me';
              break;
            case 'D1':
            case 'D2':
            case 'D3':
            case 'D4':
              dpsClass = 'dps me';
              break;
            case 'H1':
            case 'H2':
              healerClass = 'healer me';
              break;
            default:
              break;
          }
        }
        // 改行
        ret = ret.replace(/\r?\n/g, '<br>');
        // trim
        // 行頭用
        ret = ret.replace(/^(\[\d?\d:\d\d\] )?\([^)]*\)/g, '');
        // ２行目以降用
        ret = ret.replace(/<br>(\[\d?\d:\d\d\] )?\([^)]*\)/g, '<br>');
        // マクロ用(1行目)
        ret = ret.replace(/^\/p/g, '<br>');
        // マクロ用(2行目以降)
        ret = ret.replace(/<br>\/p/g, '<br>');

        ret = ret.replace(/[MS]T/g, "<span class='tank'>$&</span>");
        ret = ret.replace(/([^MS])T/g, `$1<span class='${tankClass}'>T</span>`);
        ret = ret.replace(/タンク/g, `<span class='${tankClass}'>$&</span>`);
        ret = ret.replace(/D[1-4]/g, "<span class='dps'>$&</span>");
        ret = ret.replace(/D([^1-4P])/g, `<span class='${dpsClass}'>D</span>$1`);
        ret = ret.replace(/DPS/g, `<span class='${dpsClass}'>$&</span>`);
        ret = ret.replace(/H[1-2]/g, "<span class='healer'>$&</span>");
        ret = ret.replace(/H([^1-2])/g, `<span class='${healerClass}'>H</span>$1`);
        ret = ret.replace(/ヒーラー/g, `<span class='${healerClass}'>$&</span>`);
        ret = ret.replace(/ヒラ/g, `<span class='${healerClass}'>$&</span>`);
        ret = ret.replace(/A/g, "<span class='marker-A'>A</span>");
        ret = ret.replace(/B/g, "<span class='marker-B'>B</span>");
        ret = ret.replace(/C/g, "<span class='marker-C'>C</span>");
        ret = ret.replace(/([^HD])1/g, "$1<span class='marker-1'>1</span>");
        ret = ret.replace(/([^HD])2/g, "$1<span class='marker-2'>2</span>");
        if (meRole) {
          const re = new RegExp(meRole, 'g');
          ret = ret.replace(re, "<span class='me'>$&</span>");
        }
        return ret;
      },
    },
  };
</script>

<style lang="scss">
body{
  font-family: sans-serif;
  background-color: #383838;
  color: #CCCCCC;
}
.outputPanel{
  font-size: 14px;
}
.dps{
  color: #FF9933;
}
.tank{
  color: #0066FF;
}
.healer{
  color: #00CC00;
}
.marker-A{
  color: #db5872;
}
.marker-B{
  color: gold;
}
.marker-C{
  color: blue;
}
.marker-1{
  color: #db5872;
}
.marker-2{
  color: gold;
}
.me{
  color: red;
}
</style>
