
// タグ制御クラス
class TagControl {
    constructor() {
        this.tags = [];
    }

    // 制御するタグを追加する
    addTag(name) {
        name = name.toLocaleLowerCase();

        // 同じタグがある場合は追加しない
        var t = this.tags.find((v) => v.name == name);
        if (t != undefined) return;

        this.tags.push({
            name: name,
            is_select: false,
        });
    }

    // タグの選択を切り替える
    clickTag(name) {
        name = name.toLocaleLowerCase();
        var t = this.tags.find((v) => v.name == name);
        t.is_select = !t.is_select;
        return t.is_select;
    }

    // 有効な（選択中の）タグがあるかを確認する
    hasValidTag() {
        var t = this.tags.find((v) => v.is_select == true);
        return !(t == undefined);
    }
}

var tagControl = new TagControl();

// タグをクリック
function tagClick(name) {
    var flg = tagControl.clickTag(name);
    var elems = document.querySelectorAll(`.tag_${name.toLocaleLowerCase()}`);
    var hasValidTag = tagControl.hasValidTag();
    
    // タグの付与
    for(var elem of elems) {
        // タグをつける
        if (flg == true) {
            elem.classList.add("tag_is_select");
        }

        // タグを外す
        else {
            elem.classList.remove("tag_is_select");
        }
    }

    // 選択しているタグがある
    if(hasValidTag == true) {
        // 選択中を表示
        var select_frames = document.querySelectorAll(".frame:has(.tag_is_select)");
        for (var frame of select_frames) {
            frame.classList.remove("frame_hidden");
        }

        // 未選択を非表示
        var not_select_frames = document.querySelectorAll(".frame");
        for (var frame of not_select_frames) {
            if (frame.querySelector(".tag_is_select") != null) continue;
            frame.classList.add("frame_hidden");
        }
    }

    // 選択しているタグがない（全表示）
    else {
        var frames = document.querySelectorAll(".frame");
        for(var frame of frames) {
            frame.classList.remove("frame_hidden");
        }
    }
}

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
        var color = colors["list"][i];
        var color_code_tag = `color_code_${i}`;

        var tag_frame = document.createElement("div");
        tag_frame.classList.add("tag_frame");

        for (var t of color["tag"]) {
            var tag = document.createElement("tag");
            tag.classList.add("tag");
            tag.innerText = `#${t.toLocaleLowerCase()}`;
            tag.classList.add(`tag_${t.toLocaleLowerCase()}`);
            tag.setAttribute("onclick", `tagClick("${t}");`);
            tagControl.addTag(t);

            tag_frame.appendChild(tag);
        }

        var pallet = document.createElement("div");
        pallet.classList.add("pallet");

        for (var c of color["color"]) {
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
        var frame_frame = document.createElement("div");
        frame_frame.classList.add("frame_frame");
        frame_frame.style.animation = `animation ${getRandomInt(5, 18)}s ${easing[getRandomInt(0, easing.length)]} infinite`;
        frame_frame.style.animationDelay = `${getRandomInt(0, 3)}s`;

        var frame = document.createElement("div");
        frame.classList.add("frame");

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

        frame.appendChild(tag_frame);
        frame.appendChild(title_frame);
        frame.appendChild(pallet);
        frame.appendChild(color_code_frame);

        frame_frame.appendChild(frame);
        content.appendChild(frame_frame);

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
