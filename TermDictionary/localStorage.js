// 하나의 객체 형태로 저장
loginButton.addEventListener("click",()=>{
    let userInfo = { id: idElement.value, pwd: pwdElement.value }
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
})

const idElement = document.getElementById("id");
const pwdElement = document.getElementById("pwd");
const loginButton = document.getElementById("loginBtn");


// key-value 쌍으로 저장
loginButton.addEventListener("click", ()=>{
  localStorage.setItem("id", idElement);
  localStorage.setItem("pwd", pwdElement);
});