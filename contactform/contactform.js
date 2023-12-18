jQuery(document).ready(function($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function(e) {
    e.preventDefault()
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();
    var action = $(this).attr('action');
    var keyValuePairs = str.split('&');

// Initialize variables
var name, email, subject, message;

// Loop through the key-value pairs
for (var i = 0; i < keyValuePairs.length; i++) {
    // Split each key-value pair into key and value
    var pair = keyValuePairs[i].split('=');

    // Decode URI component to handle special characters in the value
    var key = pair[0];
    var value = decodeURIComponent(pair[1]);

    // Assign values to corresponding variables
    if (key === 'name') {
        name = value;
    } else if (key === 'email') {
        email = value;
    } else if (key === 'subject') {
        subject = value;
    } else if (key === 'message') {
        message = value;
    }
}

// Output the variables
console.log("Name:", name);
console.log("Email:", email);
console.log("Subject:", subject);
console.log("Message:", message);
const thankMsg = `Hi Team Factual code, You have received new message from ${email}\n`;
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "service_id": "service_8al2kow",
  "template_id": "template_r5o4p3f",
  "user_id": "RXkT6jFddShuEidRN",
  "template_params": {
    "from_name": name,
    "to_name": "factual code",
    "message": thankMsg+message
  }
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};




fetch("https://api.emailjs.com/api/v1.0/email/send", requestOptions)
  .then(response => response.text())
  .then(result => {
    Swal.fire({
      title: "Submitted",
      text: "Thanks for your reponse.",
      icon: "success"
    });
    $('form.contactForm').find("input, textarea").val("");

  })
  .catch(error => console.log('error', error));

    // if( ! action ) {
    //   action = 'contactform/contactform.php';
    // }
    // $.ajax({
    //   type: "POST",
    //   url: action,
    //   data: str,
    //   success: function(msg) {
    //     // alert(msg);
    //     if (msg == 'OK') {
    //       $("#sendmessage").addClass("show");
    //       $("#errormessage").removeClass("show");
    //       $('.contactForm').find("input, textarea").val("");
    //     } else {
    //       $("#sendmessage").removeClass("show");
    //       $("#errormessage").addClass("show");
    //       $('#errormessage').html(msg);
    //     }

    //   }
    // });
    // return false;
  });

});
