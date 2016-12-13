const axios = require('axios');

module.exports = {

  suggest: function(options, input, onResult) {
    // this is for mapped suggestions
    let data = {
      's1': {
        'prefix': input,
        'completion': {
          'field': 'suggest',
          'fuzzy': {
            'fuzziness': 2
          }
        }
      }
    };

    let url = `${options.es}/${options.index}/_suggest`;
    axios({
      method: 'post',
      url: url,
      data: data,
    }).then(resp => {
        onResult(resp['data']['s1'][0]['options']);
    }).catch(err => {
        console.log("error:", err);
    });
  }

}
