
var encryptKey = "abcdefgabcdefg12";
    // 加密
    function encrypt(word) {
        var key = CryptoJS.enc.Utf8.parse(encryptKey);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }
    //解密
    function decrypt(word) {
        if (!word) {
            return null;
        }
        var key = CryptoJS.enc.Utf8.parse(encryptKey);
        var decrypt = CryptoJS.AES.decrypt(word, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }