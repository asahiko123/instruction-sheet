// SetFontSizeDirective.js
//このディレクティブは、input要素に入力された文字列の大きさ(FONT SIZE)を制御します。
export default{

    bind(el,bindings,vnode){
        console.log(el)
       el.style.fontSize = '15px'
    }
}