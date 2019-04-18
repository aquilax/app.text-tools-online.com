(function(window, document) {
  var worker;

  var createWorker = function(onMessage) {
    worker = new Worker("/js/worker.js");
    return worker.addEventListener("message", onMessage, false);
  };

  var convert = function(convertor, args) {
    return worker.postMessage({
      cmd: convertor,
      args: args
    });
  };

  var fillOperators = function(convertors, operations) {
    convertors.innerHtml = operations
      .map(function(operation) {
        var name = operation.querySelector("b");
        var id = operation.id;
        return '<option value="' + id + '">' + name + "</option>";
      })
      .join("");
    return convertors.dispatchEvent(new Event("change"));
  };

  var init = function() {
    var from = document.querySelector("#from");
    var to = document.querySelector("#to");
    var convertors = document.querySelector("#convertors");
    var start = document.querySelector("#start");
    var param1 = document.querySelector("#param1");
    var param2 = document.querySelector("#param2");
    var operations = document.querySelectorAll("#operations p");
    var help = document.querySelector("#help");
    var up = document.querySelector("#up");
    var shareText = document.querySelector("#share");

    convertors.addEventListener("change", function() {
      var selectedId = convertors.options[convertors.selectedIndex].value;
      var config = document.querySelector("#" + selectedId);
      param1.style.display = config.dataset.param1 ? "initial" : "none";
      param1.setAttribute("placeholder", config.dataset.param1 || "");

      param2.style.display = config.dataset.param2 ? "initial" : "none";
      param2.setAttribute("placeholder", config.dataset.param2 || "");
      help.setAttribute("href", "#" + selectedId);
    });

    up.addEventListener("click", function(event) {
      event.preventDefault();
      var temp = from.value;
      from.value = to.value;
      to.value = temp;
    });

    start.addEventListener("click", function(event) {
      event.preventDefault();
      var text = from.value;
      var convertor = convertors.value;
      convert(convertor, [text, param1.value, param2.value]);
      if (window.gtag) {
        window.gtag("convert", convertor);
      }
    });

    if (navigator.share) {
      shareText.addEventListener("click", function(event) {
        event.preventDefault();
        navigator.share({
          title: "Text Tools",
          text: to.value,
          url: window.location.href
        });
      });
    } else {
      shareText.style.display = "none";
    }

    fillOperators(convertors, Array.prototype.slice.call(operations));

    createWorker(function(m) {
      return (to.value = m.data.t);
    });
  };
  init();
})(window, document);
