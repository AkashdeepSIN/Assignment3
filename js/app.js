

// State
$(function() {
    $('button').attr('aria-hidden', 'true');
});


// live
// DOM elements
var $modal = $('#modal'),
    $liveRegions = $('[aria-live]'),
    $l1 = $('#live01'),
    $l2 = $('#live02'),
    $work = $('#alert'),
    $time = $('.current-time'),
    $day = $('.current-day');

$('#getTime').click(function() {
  // date variables
  var now = new Date(),
    datetime = now.toISOString(),
    today = dateInfo(now),
    time = today.time,
    day = today.day,
    work = today.work;

  // user options
  var options = $('#options').parseForm();

  // set default view
  displayRegions('default');

  // trigger additional regions
  if (typeof(options.extras) === 'string') {
    displayRegions(options.extras);
  } else {
    $.each(options.extras, function(key, val) {
      displayRegions(val);
    });
  }

  // set alert options
  $liveRegions.attr(options);

  // determine & set work alert text
  if (!work) {
    $work.addClass('alert-success')
      .find('.alert-text').html('Welcome here');
    $work.find('.fa').addClass('fa-smile-o');
  } else if (today.weekend) {
    $work.addClass('alert-success')
      .find('.alert-text').html('It&apos;s the weekend, what are you doing here?!');
    $work.find('.fa').addClass('fa-child');
  } else {
    $work.addClass('alert-danger')
      .find('.alert-text').html('It&apos;s time to work...');
    $work.find('.fa').addClass('fa-frown-o');
  }

  // set time text
  $time.attr('datetime', datetime).text(time);

  // 10ms delay so screen readers register the change
  setTimeout(function() {
    // set day of week text
    $day.attr('datetime', datetime).text(day);
  }, 10);
});

$(document).ready(function () {
  var now = new Date(),
    datetime = now.toISOString(),
    today = dateInfo(now),
    time = today.time;

  $time.attr('datetime', datetime).text(time);
});

$.fn.parseForm = function() {
  var $f = $(this),
    arr = $f.serializeArray(),
    obj = {};

  $.each(arr, function(key, val) {
    if (typeof(obj[val.name]) === 'string') {
      var initial = obj[val.name];
      obj[val.name] = [];
      obj[val.name].push(initial);
      obj[val.name].push(val.value);
    } else if (typeof(obj[val.name]) === 'object') {
      obj[val.name].push(val.value);
    } else {
      obj[val.name] = val.value;
    }
  });
  return obj;
}

function displayRegions(option) {
    switch (option) {
      case 'aria-live':
        $l2.prop('hidden', false);
        break;
      case 'dialog':
        $modal.modal();
        break;
      case 'alert':
        $work.prop('hidden', false);
        break;
      default:
        $l2.prop('hidden', true);
        $work.prop('hidden', true);
        break;
    }
  }

function dateInfo(date) {
  var h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    d = date.getDay(),
    ap = (h >= 12) ? 'pm' : 'am';

  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    day = days[d],
    weekend = (d === 0 | d === 6) ? true : false;

  var work = (h > 9 && h < 17 && !weekend) ? true : false;

  h = h % 12;
  h = (h) ? h : 12;
  m = (m < 10) ? '0' + m : m;
  s = (s < 10) ? '0' + s : s;

  var strTime = h + ':' + m + ':' + s + ' ' + ap;
  return {
    'time': strTime,
    'day': day,
    'weekend': weekend,
    'work': work
  };
}

// invalid 
(function(win, undefined) {
 $(function() {
    var rules = {
      email: function(node) {
        var inputText = node.value,
				    inputRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

			  return inputRegex.test(inputText);
      },
      name: function(node) {
        var inputText = node.value,
				    inputRegex = /^\s*[a-zA-Z0-9,\s]+\s*$/;

			 return inputRegex.test(inputText);
      },
      subject: function(node) {
        var inputText = node.value,
				    inputRegex = /^\s*[a-zA-Z0-9,\s]+\s*$/;

			 return inputRegex.test(inputText);
      },
      phone: function(node) {
        var inputText = node.value,
				    inputRegex = /^\s*[0-9,\s]+\s*$/;

			 return inputRegex.test(inputText);
      },
      message: function(node) {
        var inputText = node.value,
				    inputRegex = /^\s*[a-zA-Z0-9,\s]+\s*$/;

			 return inputRegex.test(inputText);
      },
      
      location: function(node) {
        var inputText = node.value,
				    inputRegex = /^\s*[a-zA-Z0-9,\s]+\s*$/;

			 return inputRegex.test(inputText);
      }
    };

    function onFocusOut() {
      validate(this);
    }

    function validate(node) {
     var valid = isValid(node),
         $error = $(node).next('.error');

      if (valid) {
        $(node).attr('aria-invalid', false);
        $error
          .attr('aria-hidden', true)
          .hide();
        $(node).attr('aria-describedby', '');
      } else {
        $(node).attr('aria-invalid', true);
        $error
          .attr('aria-hidden', false)
          .show();
        $(node).attr('aria-describedby', $error.attr('id'));
      }
    }

    function isValid(node) {
      return rules[node.dataset.rule](node);
    }

    $('[aria-invalid]').on('focusout', onFocusOut);
  });
}(window));
