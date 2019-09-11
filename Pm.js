var json = require('./Ps_data.json');
var key = json[0]['key'];
var sample_size = json[0]['sample_size'];
var full_Ps_array = [];
var temp_Ps_array = [];
// console.log(json)
for (var i = 0; i < json.length; i++) {
  if (json[i]['key'] === key) {
    temp_Ps_array.push(json[i]['Ps'])
  } else {
    full_Ps_array.push({key: key, values: temp_Ps_array, sample_size: sample_size})
    key = json[i]['key'];
    sample_size = json[i]['sample_size'];
    temp_Ps_array.length = 0;
    temp_Ps_array.push(json[i]['Ps'])
  }
}

for (var j = 0; j < full_Ps_array.length; j++) {
  var product = full_Ps_array[j]['values'].reduce( (a,b) => a * b );
  product = 1 - product;
  product = Math.pow(product, full_Ps_array[j]['sample_size'])
  product = 1 - product;
  full_Ps_array[j]['PID'] = product;
}

// console.log(full_Ps_array)
var csv_array = [];
for (var k = 0; k < full_Ps_array.length; k++) {
  console.log(full_Ps_array[k]['key'] + ',' + full_Ps_array[k]['PID'])
}
