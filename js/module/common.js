
// loadTextFile ...テキストファイルをロードします。
export function loadTextFile(fName, Callback) {
    var httpObj = createXMLHttpRequest();
    httpObj.onreadystatechange = () => {
        if (httpObj.readyState === 4 && httpObj.status === 200) {
            Callback(httpObj.responseText);
        }
    }
    httpObj.open("GET", fName, true);
    httpObj.send(null);
}

// createXMLHttpRequest ...XMLHttpRequestを作成します。
function createXMLHttpRequest() {
    // XMLHttpRequest を作成
    try {
        return new XMLHttpRequest();
    }catch (e) {
    }

    // 失敗したら Msxml2.XMLHTTP を作成
    try {
        return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
    }

    // 失敗したら Microsoft.XMLHTTP を作成
    try {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
    }

    return null;
}

// getRandomInt ...ランダムな数値を取得します。
export function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

// removeClassALL ...指定したクエリ要素のCSSクラスを削除します。
export function removeClassALL(query, className) {
    let elements = document.querySelectorAll(query);
    for(let e of elements) {
        e.classList.remove(className);
    }
}

// addClassALL ...指定したクエリ要素にCSSクラスを追加します。
export function addClassALL(query, className) {
    let elements = document.querySelectorAll(query);
    for(let e of elements) {
        e.classList.add(className);
    }
}
