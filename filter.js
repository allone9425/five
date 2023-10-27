const slang = new Array("바보", "멍청이");

export function slangFilter(value) {
  let check = slang.some((item) => value.includes(item));
  return check ? true : false;
}

export function userFilter(value) {
  return value ? true : false;
}
// 화이뎅

export function userPW(value) {
  return value ? true : false;
}

export function userInput(value) {
  return value ? true : false;
}
