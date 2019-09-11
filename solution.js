var values = [
  .071,
  .100,
  .129,
  .614,
  .029,
  .057
]

var fs = require('fs');

var new_obj = {};
var results = [];

var json = require('./final_data.json');
// console.log(json)
var location_probabilities = [];

// TODO:
// 1. Multiply all Ps within a population to find Pm
// 2. Subtract Pm from 1
// 3. Raise that number by the sample_size (^sample_size)
// 4. Subract that number from 1 again to find PID for population

for (var i = 0; i < json.length; i++) {
  // console.log(json[i])
  var key = Object.keys(json[i])[0];

  // console.log(key)
  // console.log(json[i][key].loci)
  var loci_keys = Object.keys(json[i][key].loci);

  for (var j = 0; j < loci_keys.length; j++) {
    // console.log(json[i][key].loci[loci_keys[j]])
    var p4 = power4(json[i][key].loci[loci_keys[j]]);
    var combnAndSquare = combn(json[i][key].loci[loci_keys[j]]);
    var total = getTotal(p4, combnAndSquare);
    if (total > 0) {
      results.push({
        'key': key,
        'sample_size': json[i][key].sample_size,
        'locus': loci_keys[j],
        'Ps': total
      })
      // console.log(key + ',' + loci_keys[j] + ',' + total)
    }

  }
}
// console.log(results)

fs.writeFile("Ps_data.json", JSON.stringify(results), function(err, result) {
    if(err) console.log('error', err);
});

function power4 (values) {
  var power4_arr = [];
  for (var k = 0; k < values.length; k++) {
    power4_arr.push(Math.pow(values[k], 4))
  }
  return power4_arr;
}

function combn (values) {
  var combn_arr = [];
  for (var i = 0; i < values.length; i++) {
    for (var j = i + 1; j < values.length; j++) {
      combn_arr.push(values[i] * values[j]* 2);
    }
  }
  return square(combn_arr);
}

function square (combn_result) {
  var squared_arr = [];
  for (var l = 0; l < combn_result.length; l++) {
    squared_arr.push(Math.pow(combn_result[l], 2))
  }
  return squared_arr;
}

function getTotal (power_array, squared_array) {
  return (power_array.concat(squared_array)).reduce((a, b) => a + b, 0);
}
