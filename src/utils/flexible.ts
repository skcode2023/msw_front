function isPhone() {
  if (
    window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    console.warn("移动端");
    return true; // 移动端
  } else {
    console.warn("PC端");
    return false; // PC端
  }
}

const is_phone = isPhone();
window.isPhone = is_phone;

//amfe-flexible 代码
export default function flexible() {
  const docEl = window.document.documentElement;
  const dpr = window.devicePixelRatio || 1;

  // adjust body font size
  // function setBodyFontSize() {
  //   if (document.body) {
  //     document.body.style.fontSize = 16 * dpr + "px";
  //   } else {
  //     document.addEventListener("DOMContentLoaded", setBodyFontSize);
  //   }
  // }
  // setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    let rem = docEl.clientWidth / 19.2;
    if (is_phone) {
      rem = docEl.clientWidth / 3.75;
    }
    if (rem < 62.5) {
      rem = 62.5;
    }
    docEl.style.fontSize = rem + "%";
  }

  setRemUnit();

  // reset rem unit on page resize
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // detect 0.5px supports
  if (dpr >= 2) {
    const fakeBody = document.createElement("body");
    const testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
}
