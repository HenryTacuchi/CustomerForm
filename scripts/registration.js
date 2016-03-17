
Hammer.plugins.fakeMultitouch();

function getIndexForValue(elem, value) {
  for (var i=0; i<elem.options.length; i++)
    if (elem.options[i].value == value)
return i;
}

function pad(number) {
  if ( number < 10 ) {
    return '0' + number;
  }
return number;
}

function update(datetime) {
  $("#date").drum('setIndex', datetime.getDate()-1);
  $("#month").drum('setIndex', datetime.getMonth());
  $("#fullYear").drum('setIndex', getIndexForValue($("#fullYear")[0], datetime.getFullYear()));
}


$(document).ready(function () {

  var error_msg = "";
  // firstName can't be blank
  $('#firstName').on('input', function () {
      var firstName = $('#firstName').val();
      if (firstName) { $('#firstName').removeClass("invalid").addClass("valid"); }
      else {
          $('#firstName').removeClass("valid").addClass("invalid");
          error_msg += "firstName is blank, ";
      }
  });
  // lastName can't be blank
  $('#lastName').on('input', function () {
      var lastName = $('#lastName').val();
      if (lastName) { $('#lastName').removeClass("invalid").addClass("valid"); }
      else {
          $('#lastName').removeClass("valid").addClass("invalid");
          error_msg += "lastName is blank, ";
      }
  });
  //phoneNumber has to had 9 digits
  $('#phoneNumber').on('input', function () {
      var phoneNumber = $('#phoneNumber').val();
      if ($.isNumeric(phoneNumber)) {
          $('#phoneNumber').removeClass("invalid").addClass("valid");
          error_msg += "number"
      }
      else {
          $('#phoneNumber').removeClass("valid").addClass("invalid");
          error_msg += "phoneNumber is not a number, ";
          alert("its not a number");
      }
  });
  // Email must be an email
  $('#userEmail').emailautocomplete({
      domains: ["gmail.com","hotmail.com"] // add your own domains
  });

  $('#userEmail').on('input', function () {
      var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      var userEmail = re.test($('#userEmail').val());
      if (userEmail) { $('#userEmail').removeClass("invalid").addClass("valid"); }
      else {
          $('#userEmail').removeClass("valid").addClass("invalid");
          error_msg += "is not a email there, ";

      }
  });
  // Birthday must be in a correct format
  //$("#birthday").datepicker({ dateFormat: 'yy-dd-mm' });

    
  $("#resetBtn").click(function () {
      $("#firstName").val("");
      $("#lastName").val("");
      $("#phoneNumber").val("");
      $("#birthday").val("");
      $("#userEmail").val("");
  });

  $("#submitBtn").click(function () {

      var firstName = $('#firstName').val();
      var lastName = $('#lastName').val();
      var phoneNumber = $('#phoneNumber').val();
      var birthday = $("#birthday").val();
      var email = $('#userEmail').val();

      var contactIsValid = validateContact(firstName, lastName, phoneNumber, birthday, email);
      if (contactIsValid == true) {
          $("#modalSuccessfull").modal("show");

          var contactIsSaved = SaveContact(firstName, lastName, phoneNumber, birthday, email);
          if (contactIsSaved == true) {
              alert("Data was storage");
          } else {
              $("#modalNoConection").modal("show");
          }
      }
      else { alert("Contact is not valid"); 
    }
  });

  function validateContact(firstName, lastName, phoneNumber, birthday, email) {
      return true;
  }

  function SaveContact(firstName, lastName, phoneNumber, birthday, email) {
      var oContact = {
          "oSubscriptions":
          { "FirstName": firstName, "LastName": lastName, "PhoneNumber": phoneNumber, "BirthDay": birthday, "Email": email }
      };
      $.ajax({
          //type: "GET",
          type: "POST",
          url: "http://192.168.1.135/RMSCouponsServices/CouponService.svc/PostSubscription/",
          async: false,
          contentType: "application/json",
          data: JSON.stringify(oContact),
          crossdomain: true,
          success: function (result) {
              if (result.PostSubscriptionResult == 1) {
                  alert(" Now check your email to confirm your subscription!");
                  return true;
              }
              else if(result.PostSubscriptionResult == 2) {
                  alert("Ya se encuentra registrado");
                  return false;
              } 
              else if(result.PostSubscriptionResult == 0) {
                  alert("ERROR 0");
                  return false;
              }
              else {
                  alert("ERROR"+result.PostSubscriptionResult);
                  return false;
              }
          },
          error: function (error) {
              alert("Web Service was not consumed.\n" + "error = " + error.status + " " + error.statusText);
              return false;
          }
      });
  }

  $("select.date").drum({
    onChange : function (elem) {
      var arr = {'date' : 'setDate', 'month' : 'setMonth', 'fullYear' : 'setFullYear', 'hours' : 'setHours', 'minutes' : 'setMinutes'};
      vardate =new Date();
      for (var s in arr) {
        var i = ($("form[name='date'] select[name='" + s + "']"))[0].value;
        eval ("date." + arr[s] + "(" + i + ")");
      }
      date.setSeconds(0);
      update(date);
      varformat =date.getFullYear() + '-' + pad( date.getMonth() + 1 ) + '-' + pad( date.getDate() ) + ' ' + pad( date.getHours() ) + ':' + pad( date.getMinutes() );
      $('.date_header .selection').html(format);
    }
  });
  update(new Date());

});


