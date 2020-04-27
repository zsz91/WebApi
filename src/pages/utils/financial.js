export default function financial(x) {
  if (typeof x === undefined || x == null) {
    x = 0;
  }
  return '¥' + Number.parseFloat(x).toFixed(2);
}
