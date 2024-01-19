function convert(binaryString, onSuccess) {
  $.ajax({
    url: "convert_binary",
    data: {
      binary_string: binaryString,
    },
    dataType: "json",
    type: "GET",
    success: function (response) {
      onSuccess(response);
    },
  });
}

$("#convert-button").on("click", function () {
  let binaryString = $("#binary-input").val();
  convert(binaryString, function (decimal) {
    $("#decimal").text(decimal);
  });
});

function convert(binaryString, onSuccess) {
  $.ajax({
    url: "convert_binary",
    data: {
      binary_string: binaryString,
    },
    dataType: "json",
    type: "GET",
    success: function (response) {
      onSuccess(response);
    },
  });
}

$("#convert-button").on("click", function () {
  let binaryString = $("binary-input").val();

  convert(binaryString, function (decimal) {
    $("#decimal").text(decimal);
  });
});
