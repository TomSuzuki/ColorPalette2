
// 読み込み処理
window.addEventListener("load", async function () {
    // 色ファイルを取得する
    var colors = await new Promise(r => loadTextFile("./data/color.json", (text) => { r(JSON.parse(text)) }));

    // HTMLをリセット
    var content = document.querySelector("#content");
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }

    // 生成
    for (var i in colors["list"]) {
        var color_code_tag = `color_code_${i}`;

        var color = colors["list"][i];
        var pallet = document.createElement("div");
        pallet.classList.add("pallet");

        for(var c of color["color"]) {
            var pf = document.createElement("div");
            var pa = document.createElement("div");
            pf.classList.add("paint_frame");
            pa.classList.add("paint");
            pa.style.backgroundColor = c;
            pf.setAttribute("onclick", `changeColorCode("${color_code_tag}", "${c}");`);
            pf.appendChild(pa);
            pallet.appendChild(pf);
        }

        var easing = ["linear", "ease", "ease-in", "ease-out", "ease-in-out"];
        var frame = document.createElement("div");
        frame.classList.add("frame");
        frame.style.animation = `animation ${getRandomInt(5, 18)}s ${easing[getRandomInt(0, easing.length)]} infinite`;
        frame.style.animationDelay = `${getRandomInt(0, 3)}s`;

        var title_frame = document.createElement("div");
        title_frame.classList.add("title_frame");

        var title = document.createElement("div");
        title.classList.add("title");
        title.innerText = color["title"];
        title.style.background = `linear-gradient(transparent 80%, ${color["color"][0]} 60%)`;

        var color_code = document.createElement("div");
        color_code.classList.add("color_code");
        color_code.id = color_code_tag;

        var color_code_frame = document.createElement("div");
        color_code_frame.classList.add("color_code_frame");

        title_frame.appendChild(title);
        color_code_frame.appendChild(color_code);

        frame.appendChild(title_frame);
        frame.appendChild(pallet);
        frame.appendChild(color_code_frame);

        content.appendChild(frame);

        changeColorCode(color_code_tag, color["color"][0]);
    }

});

// カラーコード変更
function changeColorCode(id, color) {
    var elem = document.querySelector(`#${id}`);
    elem.innerHTML = color.toUpperCase();
    elem.style.backgroundColor = color;
    elem.style.color = getTextColor(color);
}

// 文字色を生成（白 or 黒）
function getTextColor(rgb) {
    let r = parseInt("0x" + rgb.substr(1, 2), 16);
    let g = parseInt("0x" + rgb.substr(3, 2), 16);
    let b = parseInt("0x" + rgb.substr(5, 2), 16);
    let bk = Math.sqrt(
      Math.pow(r - 0, 2) + Math.pow(g - 0, 2) + Math.pow(b - 0, 2)
    );
    let wh = Math.sqrt(
      Math.pow(r - 255, 2) + Math.pow(g - 255, 2) + Math.pow(b - 255, 2)
    );
    return bk > wh ? "#000000" : "#FFFFFF";
}
