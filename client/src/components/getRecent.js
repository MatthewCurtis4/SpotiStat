module.exports = {
    recent: function(data) {
      var result = "";
  

      data.items.forEach(function(jsonData) {
        // Get the values
        var songName = jsonData.track.name;
        var artistName = jsonData.track.artists[0].name;
  
        // Format the timePlayed to display only the date and time
        var timePlayed = new Date(jsonData.played_at).toLocaleString();
  
        // Add the formatted values to the result
        result += `<div style='display: flex; width: 100%; justify-content: space-between; padding: 0 9%;'>`;
        result += `<div style='width: 30%; text-align: left;'>${songName}</div>`;
        result += `<div style='width: 30%; text-align: left;'>${artistName}</div>`;
        result += `<div style='width: 30%; text-align: left;'>${timePlayed}</div>`;
        result += `</div>`;
      });
  
      // Center the entire content on the screen
      result = `<div style='display: flex; flex-direction: column; align-items: center;'>${result}</div>`;
  
      return result;
    }
  };
  
  