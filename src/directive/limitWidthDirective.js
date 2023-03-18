// limitWidthDirective.js
//このディレクティブは、テキストの幅がinput要素の幅を超えた場合に、テキストを自動的に切り詰めます。
export default {
    bind(el, binding, vnode) {
      el.addEventListener('input', function (event) {
        console.log('custom derective loaded')
        const input = event.target;
        const style = window.getComputedStyle(input);
        const fontSize = parseFloat(style.getPropertyValue('font-size'));
        const fontFamily = style.getPropertyValue('font-family');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = `${fontSize}px ${fontFamily}`;
  
        let inputWidth = input.clientWidth - 4; // Adjust for padding
        let text = input.value;
        let textWidth = ctx.measureText(text).width;
  
        while (textWidth > inputWidth && text.length > 0) {
          text = text.slice(0, -1);
          textWidth = ctx.measureText(text).width;
        }
  
        input.value = text;
      });
    },
  };
  