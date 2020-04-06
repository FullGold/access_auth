/**
 * @description 利用二进制实现的权限管理
 *  用一个无符号整型数表示最多32个权限
 * @author Qiu 2020/4/6 12:15:03
 * 
 */

export default class AccessAuth {
    // 列表的长度最多32
    // 所有的权限列表，最多填32个，可以少于32个
    static AllAccessList = [
        "权限1", "权限2", "权限3", "权限4", "权限5", "权限6", "权限7", "权限8",
        "权限9", "权限10", "权限11", "权限12", "权限13", "权限14", "权限15", "权限16",
        "权限17", "权限18", "权限19", "权限20", "权限21", "权限22", "权限23", "权限24",
        "权限25", "权限26", "权限27", "权限28"]//, "权限29", "权限30", "权限31", "权限32"];
    /**
     * @description 解析权限值，传入权限值，返回权限值对应的权限集合
     * @param {Number} value 权限值
     * @returns 返回权限列表（[权限.....]）
     */
    static getAccessArray(value) {
        if (value === undefined || value === null || value === 0) {
            return [];
        }
        if (isNaN(value)) {
            throw new Error('权限值应该为合法数字');
        }
        if (`${value}`.indexOf('.')>=0) {
            throw new Error('权限值应该为整数');
        }
        if (value < 0 || value > 0xffffffff) {
            throw new Error('权限值超出表示范围');
        }
        // 转二进制
        let binaryVal = (+value).toString(2);
        const start = 32 - binaryVal.length;
        let accessResult = '';
        for(let i=start;i<32;i++) {
            if (binaryVal[i-start] == 1) {
                if (AccessAuth.AllAccessList[i] !== undefined) {
                    accessResult = `${accessResult},${AccessAuth.AllAccessList[i]}`;
                }
            }
        }
        // console.log('a:'+accessResult)
        return accessResult ? accessResult.substr(1).split(',') : [];
    }

    /**
     * @description 解析权限集合，返回传入的权限对应的权限值
     * @param {Array} accessList 待转化的权限集合
     * @returns 返回unsigned int权限值
     */
    static getAccessValue(accessList) {
        if (accessList instanceof Array) {
            const accessMap = {}
            accessList.forEach(v => {
                if (typeof v !== 'string') {
                    throw new Error('权限集合中存在非字符串类型');
                }
                accessMap[v] = true;
            });
            // 二进制开头
            let binaryVal = '0b';
            for(let i=0, access;i<32;i++) {
                access = AccessAuth.AllAccessList[i];
                binaryVal = `${binaryVal}${
                    access !== undefined && accessMap[access] ? 1:0}`;
            }
            // 利用运算符号转化为数值类型
            return +binaryVal;
        } else {
            throw new Error('传入的值应该为数组内容');
        }
    }
}
