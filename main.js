$(document).ready( function() {
  $("input[name=relay-type]").click( function(event) {
    var nodeType = $(this).val()
    var isExitNode = (nodeType == "exit");

    $(".exit-relay-only").each(function(i, v) {
      if (isExitNode) {
          $(v).removeClass("hide");
      } else {
          $(v).addClass("hide");
      }
    });
  });

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

        if (name == "cost") {
          value = value + $("#cost-currency").val();
        }

        if (value != "") {
          result.push(name + ":" + value);
        }
      }


    }

    $("#result").val(result.join(" "));
  })

  $(".exit-relay-only").each(function(i, v) {
    $(v).addClass("hide");
  });

  $($("input[name=relay-type]")[1]).click();
});
