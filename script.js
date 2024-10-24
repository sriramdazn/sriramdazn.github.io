document.body.innerHTML="test 2";
try {
  require("@featurevisor/sdk");
} catch (e) {
  document.body.innerHTML = "test 3";
}
;