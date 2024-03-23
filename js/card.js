
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

    // ダミーのフレームを入れる
    for (let i = 0; i < 5; i++) {
        var dummy = document.createElement("div");
        dummy.classList.add("dummy_frame");
        content.appendChild(dummy);
    }

});
