
document.body.innerHTML="test 2";
try {
  ;
} catch (e) {
  document.body.innerHTML = "test 3";
}
;