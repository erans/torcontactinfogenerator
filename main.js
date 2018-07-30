$(document).ready( function() {
  $(".currency-dropdown a").click( function(event) {
    event.preventDefault();
    var value = $(this).attr("value");
    $(".curreny-button").text(value);
  });

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

  $("input[name=trafficaccttype]").click( function(event) {
    var value = $(this).val();
    if (value == "metered") {
      $("#trafficacct").removeClass("hide");
    } else {
      $("#trafficacct").addClass("hide");
    }
  });

  $("#generate-button").click(function(event) {
    var result = new Array();
    event.preventDefault();

    var inputs = $("input");
    var inputsLength = inputs.length;
    for (var i = 0; i < inputsLength; i++) {
      var element = $(inputs[i]);
      if (element.hasClass("dont-generate")) {
        continue;
      }
      var name = element.attr("id");
      var type = element.attr("type");

      if (type == "checkbox") {
        if (element.prop("checked")) {
          result.push(name + ":y");
        } else {
          //value = "n";
        }
      }  else if (type == "radio") {
        name = element.attr("name");
        var value = element.val();
        if (element.is(":checked")) {
          result.push(name + ":" + value);
        }
      } else {
        var value = element.val();
        if (name == "email" || name == "xmpp" || name == "abuse") {
          value = value.replace("@", "[]");
        }

        if (name == "cost") {
          if (value != "") {
            value = value + $(".curreny-button").text();
          }
        }

        if (value != "") {
          result.push(name + ":" + value);
        }
      }
    }

    var selects = $("select");
    var selectsLength = selects.length;
    for (var i = 0; i < selectsLength; i++) {
      var element = $(selects[i]);
      var name = element.attr("id");
      var value = element.val();
      if (value != "dontknow") {
        result.push(name + ":" + value);
      }
    }

    var trafficacct = $("input[name='trafficaccttype']:checked").val();
    if (trafficacct == "metered") {
      var meteredValue = $("#trafficacct").val();
      if (meteredValue != "") {
        result.push("trafficacct:" + meteredValue);
      }
    } else if (trafficacct == "unmetered") {
      result.push("trafficacct:unmetered");
    }

    $("#result").val(result.join(" "));
  })

  $(".exit-relay-only").each(function(i, v) {
    $(v).addClass("hide");
  });

  $($("input[name=relay-type]")[1]).click();
});
