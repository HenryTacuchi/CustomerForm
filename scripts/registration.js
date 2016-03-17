//global functions for Datepicker
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

//function to validate USphoneNumber
/**
 * Matches US phone number format
 *
 * where the area code may not start with 1 and the prefix may not start with 1
 * allows '-' or ' ' as a separator and allows parens around area code
 * some people may want to put a '1' in front of their number
 *
 * 1(212)-999-2345 or
 * 212 999 2344 or
 * 212-999-0983
 *
 * but not
 * 111-123-5434
 * and not
 * 212 123 4567
 */
$.validator.addMethod( "phoneUS", function( phone_number, element ) {
  phone_number = phone_number.replace( /\s+/g, "" );
  return this.optional( element ) || phone_number.length > 9 &&
    phone_number.match( /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/ );
}, "Please specify a valid phone number (234) 999 2345" );


$(document).ready(function () {

//Functions to validate inputs as the user fill them

 //Function to validate  firstName can't be blank

  $('#firstName').on('input', function () {
      var firstName = $('#firstName').val();

      if (firstName) { $('#firstName').removeClass("invalid").addClass("valid"); }
      else {
          $('#firstName').removeClass("valid").addClass("invalid");
      }
  });

  $('#contactFields').validate({
    rules: {
      firstName:{
        required: true,
        minlength:2
      },
      lastName:{
        required: true,
        minlength:2
      },
      phoneNumber:{
        required: true,
        phoneUS: true,
      },
      email:{
        required: true,
        email: true,
      }
    },
    messages:{
      firstName:{
        required: "Please enter your name",
        minlength: "Your name must consist of at least 2 characters",
      },
      lastName:{
        required: "Please enter your last name",
        minlength: "Your last name must consist of at least 2 characters",
      },
      phoneNumber:{
        required: "Please enter your phone number",
      }
    }
  });


  //Function to validate lastName can't be blank
  $('#lastName').on('input', function () {
      var lastName = $('#lastName').val();
      if (lastName) { $('#lastName').removeClass("invalid").addClass("valid"); }
      else {
          $('#lastName').removeClass("valid").addClass("invalid");
      }
  });

  //Function to validate that are numbers
  $('#phoneNumber').on('input', function () {
      var phoneNumber = $('#phoneNumber').val();
      if (phoneNumber) {
          $('#phoneNumber').removeClass("invalid").addClass("valid");
      }
      else {
          $('#phoneNumber').removeClass("valid").addClass("invalid");
      }
  });

  // Function to autocomplete domain of the email
  $('#userEmail').emailautocomplete({
      domains: ["gmail.com","hotmail.com"] // add your own domains
  });

  // Function to validate characters of email
  $('#userEmail').on('input', function () {
      var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      var userEmail = re.test($('#userEmail').val());
      if (userEmail) { $('#userEmail').removeClass("invalid").addClass("valid"); }
      else {
          $('#userEmail').removeClass("valid").addClass("invalid");
      }
  });

//******************************************************************************

//Function to clean the screen    
  $("#resetBtn").click(function () {
      $("#firstName").val("");
      $("#lastName").val("");
      $("#phoneNumber").val("");
      $("#birthday").val("");
      $("#userEmail").val("");
  });

//Function to recieve inputs as contact-info
  $("#submitBtn").click(function () {
      var firstName = $('#firstName').val();
      var lastName = $('#lastName').val();
      var phoneNumber = $('#phoneNumber').val();
      var birthday = $("#birthday").val();
      var email = $('#userEmail').val();
      SaveContact(firstName, lastName, phoneNumber, birthday, email);
  });

//******************************************************************************
    
//Function to show datepicker selection
  $("select.date").drum({
    onChange : function (elem) {
      var date =new Date();
      var sDay = ($("form[name='date'] select[name='date']"))[0].value;
      date.setDate(sDay);
      var sMonth = ($("form[name='date'] select[name='month']"))[0].value;
      date.setMonth(sMonth);
      var sYear = ($("form[name='date'] select[name='fullYear']"))[0].value;
      date.setFullYear(sYear);
      update(date);
      var format =date.getFullYear() + '-' + pad( date.getMonth() + 1 ) + '-' + pad( date.getDate() );
      $('.date_header .selection').html(format);
      $("#birthday").val(format);
    }
  });

//Function to set today as the start date
  update(new Date());

//Function to sent the contact-info through webservice
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
              }
              else if (result.PostSubscriptionResult == 2) {
                  alert("Its already registered");
              }
              else if (result.PostSubscriptionResult == 3) {
                  alert("We couldn't send the email");
              }
              else {
                  alert("ERROR" + result.PostSubscriptionResult);
              }
          },
          error: function (error) {
              alert("Web Service was not consumed.\n" + "error = " + error.status + " " + error.statusText);
          }
      });
  }

});


