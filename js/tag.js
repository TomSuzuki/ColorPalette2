
// タグ制御クラス
class TagControl {

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
}

// タグコントロールを生成
const tagControl = new TagControl();

// タグをクリック
function tagClick(name) {
    // タグの操作
    if (tagControl.clickTag(name)) {
        addClassALL(`.tag_${name.toLocaleLowerCase()}`, "tag_is_select"); // タグの付与
    } else {
        removeClassALL(`.tag_${name.toLocaleLowerCase()}`, "tag_is_select"); // タグの削除
    }

    // 全体の操作
    if(tagControl.hasValidTag()) {
        // 選択しているタグがある
        removeClassALL(".frame:has(.tag_is_select)", "frame_hidden");  // 選択中を表示
        addClassALL(".frame:not(:has(.tag_is_select))", "frame_hidden");  // 未選択を非表示
    } else {
        // 選択しているタグがない
        removeClassALL(".frame", "frame_hidden");  // すべて表示
    }
}
