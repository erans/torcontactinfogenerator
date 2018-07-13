$(document).ready( function() {
  $("#generate-button").click(function(event) {
    var result = new Array();
    event.preventDefault();

    var inputs = $("input");
    var inputsLength = inputs.length;
    for (var i = 0; i < inputsLength; i++) {
      var element = $(inputs[i]);
      var name = element.attr("id")
      var type = element.attr("type");

      if (type == "checkbox") {
        if (element.prop("checked")) {
          result.push(name + ":y");
        } else {
          //value = "n";
        }
      } else {
        var value = element.val();
        if (name == "email" || name == "xmpp") {
          value = value.replace("@", "[]");
        }

        if (value != "") {
          result.push(name + ":" + value);
        }
      }


    }

    $("#result").val(result.join(" "));
  })
});
