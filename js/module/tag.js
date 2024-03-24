
import * as common from "./common.js";

// タグ制御クラス
export class TagControl {

    // コンストラクタ
    constructor() {
        this.tags = []; // タグ制御を管理する
    }

    // 制御するタグを追加する
    addTag(name) {
        // 小文字変換
        name = name.toLocaleLowerCase();

        // 同じタグがある場合は追加しない
        var t = this.tags.find((v) => v.name == name);
        if (t != undefined) return;

        // タグを追加
        this.tags.push({
            name: name,
            is_select: false,
        });
    }

    // タグの選択を切り替える
    clickTag(name) {
        // 小文字変換
        name = name.toLocaleLowerCase();

        // タグの制御を切り替える
        var t = this.tags.find((v) => v.name == name);
        t.is_select = !t.is_select;
        return t.is_select;
    }

    // 有効な（選択中の）タグがあるかを確認する
    hasValidTag() {
        var t = this.tags.find((v) => v.is_select == true);
        return !(t == undefined);
    }

    // 選択中のタグ名を配列で返す
    validTags() {
        return this.tags.filter((t) => t.is_select).map((t) => t.name);
    }
}

// タグをクリック
export function tagClick(tagControl, name) {
    // タグの操作
    if (tagControl.clickTag(name)) {
        common.addClassALL(`.tag_${name.toLocaleLowerCase()}`, "tag_is_select"); // タグの付与
    } else {
        common.removeClassALL(`.tag_${name.toLocaleLowerCase()}`, "tag_is_select"); // タグの削除
    }

    // 全体の操作
    if (tagControl.hasValidTag()) {
        // 選択しているタグがある
        let selector = (tagControl.validTags()).reduce((ac, cu) => ac + `:has(.tag_${cu})`, ""); // 選択中のclassの一覧を生成
        common.removeClassALL(`.frame${selector}`, "frame_hidden");  // 選択中を表示
        common.addClassALL(`.frame:not(${selector})`, "frame_hidden");  // 未選択を非表示
    } else {
        // 選択しているタグがない
        common.removeClassALL(".frame", "frame_hidden");  // すべて表示
    }
}
