
import * as common from "./module/common.js";
import * as tags from "./module/tag.js";
import * as design from "./module/design.js";

// 読み込み処理
window.addEventListener("load", async () => {
    // タグコントロールを初期化
    const tagControl = new tags.TagControl();

    // 色ファイルを取得する
    let colors = await new Promise(r => common.loadTextFile("./data/color.json", (text) => { r(JSON.parse(text)) }));

    // 自動生成タグを付与
    colors["list"] = colors["list"].map((c) => {
        if (c["image"] != undefined) {
            c["tag"].push("photograph");
        }
        return c;
    });

    // HTMLをリセット
    let content = document.querySelector("#content");
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }

    // 生成
    for (var i in colors["list"]) {
        let color = colors["list"][i];
        let color_code_tag = `color_code_${i}`;

        let tag_frame = document.createElement("div");
        tag_frame.classList.add("tag_frame");

        for (let t of color["tag"]) {
            let tag = document.createElement("tag");
            tag.classList.add("tag");
            tag.innerText = `#${t.toLocaleLowerCase()}`;
            tag.classList.add(`tag_${t.toLocaleLowerCase()}`);
            tag.addEventListener("click", () => tags.tagClick(tagControl, t));
            tagControl.addTag(t);

            tag_frame.appendChild(tag);
        }

        let Palette = document.createElement("div");
        Palette.classList.add("Palette");

        for (let c of color["color"]) {
            let pf = document.createElement("div");
            let pa = document.createElement("div");
            pf.classList.add("paint_frame");
            pa.classList.add("paint");
            pa.style.backgroundColor = c;
            pf.addEventListener("click", () => design.changeColorCode(color_code_tag, c));
            pf.appendChild(pa);
            Palette.appendChild(pf);
        }

        const easing = ["linear", "ease", "ease-in", "ease-out", "ease-in-out"];
        let frame_frame = document.createElement("div");
        frame_frame.classList.add("frame_frame");
        frame_frame.style.animation = `animation ${common.getRandomInt(5, 18)}s ${easing[common.getRandomInt(0, easing.length)]} infinite`;
        frame_frame.style.animationDelay = `${common.getRandomInt(0, 3)}s`;

        let frame = document.createElement("div");
        frame.classList.add("frame");

        // 背景画像
        if (color["image"] != undefined) {
            let bg = document.createElement("div");
            bg.classList.add("bg_image");
            bg.style.backgroundImage = `url("${color["image"]}")`;
            frame.appendChild(bg);
        }

        let title_frame = document.createElement("div");
        title_frame.classList.add("title_frame");

        let title = document.createElement("div");
        title.classList.add("title");
        title.innerText = color["title"];
        title.style.background = `linear-gradient(transparent 80%, ${color["color"][0]} 60%)`;

        let color_code = document.createElement("div");
        color_code.classList.add("color_code");
        color_code.id = color_code_tag;

        let color_code_frame = document.createElement("div");
        color_code_frame.classList.add("color_code_frame");

        title_frame.appendChild(title);
        color_code_frame.appendChild(color_code);

        frame.appendChild(tag_frame);
        frame.appendChild(title_frame);
        frame.appendChild(Palette);
        frame.appendChild(color_code_frame);

        frame_frame.appendChild(frame);
        content.appendChild(frame_frame);

        design.changeColorCode(color_code_tag, color["color"][0]);
    }

    // ダミーのフレームを入れる
    for (let i = 0; i < 5; i++) {
        let dummy = document.createElement("div");
        dummy.classList.add("dummy_frame");
        content.appendChild(dummy);
    }

});
