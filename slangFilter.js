const slang = new Array("바보", "멍청이");

export function slangFilter(value) {
  let check = slang.some((item) => value.includes(item));
  return check ? alert("욕입니다") : alert("꺠끗합니다");
}
