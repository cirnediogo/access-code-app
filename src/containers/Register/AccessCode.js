export const getAccessCode = (n, value) => {
    let res = '';
    res += getCode(value[8], value[9], value[10]);
    res += getCode(value[1], value[5], value[9]);
    res += getCode(value[0], value[1], value[2]);
    res += getCode(value[4], value[5], value[6]);
    res += getCode(value[2], value[6], value[10]);
    res += getCode(value[0], value[4], value[8], n);
    return res;
}

const getCode = (a, b, c, n) => {
    let res = getNumber(a + b + c);
    res = res*61/999;
    if (n) res += n;
    res += 48;
    if (res >= 58) res += 39;
    if (res >= 123) res -= 26;
    return String.fromCharCode(res);
}
  
const getNumber = value => {
    if (isNaN(value)) {
        return 0;
    } else {
        return 1*value;
    }
}