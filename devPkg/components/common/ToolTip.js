/*********************************************************************
 * Created by deming-su on 2017/12/30
 *********************************************************************/

/* 全局通用方法 */
export const ToolTip = function () {
    /* rgb转16进制 */
    window.RGBToHEX = function(val){
        val = val.toLowerCase().replace(/\s/g, '');
        /* 测试提交的字符串 */
        if(/^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/.test(val)) {
            /* 拆分字符串 */
            let arr = val.replace(/rgb|\(|\)|\s/g, '').split(",");
            let str = "#";
            for(let i = 0;i < arr.length;i ++) {
                /* 编码数字到16进制 */
                let hex = Number(arr[i]).toString(16);
                str += hex.length < 2 ? "0" + hex : hex;
            }
            val = str;
        }
        return val;
    };
    /* 16进制转rgb */
    window.HEXToRGB = function(val){
        /* 检测提交字符串 */
        if(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(val)) {
            /* 自动补全3位16进制字符串 */
            if(val.length === 4) {
                let str = "#";
                for(let i = 1;i < 4;i ++) {
                    let char = val.slice(i, i+1);
                    str += char.concat(char);
                }
                val = str;
            }
            let res = [];
            /* 遍历字符串转为十进制rgb */
            for(let i = 1;i < 7;i += 2) {
                /* 两个方法都可以转 */
                res.push(parseInt(val.slice(i, i+2), 16)); // parseInt('0x'+val.slice(i, i+2));
            }
            val = "rgb("+res.join(",")+")";
        }
        return val;
    };
};