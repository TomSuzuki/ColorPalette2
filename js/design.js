
// カラーコード変更（HTMLのID, カラーコード）
function changeColorCode(id, color) {
    let elem = document.querySelector(`#${id}`);
    elem.innerHTML = color.toUpperCase();
    elem.style.backgroundColor = color;
    elem.style.color = getTextColor(color);
}

// 文字色を生成（白 or 黒）
function getTextColor(rgb) {
    let r = parseInt("0x" + rgb.substr(1, 2), 16);
    let g = parseInt("0x" + rgb.substr(3, 2), 16);
    let b = parseInt("0x" + rgb.substr(5, 2), 16);
    let bk = Math.sqrt(Math.pow(r - 0, 2) + Math.pow(g - 0, 2) + Math.pow(b - 0, 2));
    let wh = Math.sqrt(Math.pow(r - 255, 2) + Math.pow(g - 255, 2) + Math.pow(b - 255, 2));
    return bk > wh ? "#000000" : "#FFFFFF";
}
