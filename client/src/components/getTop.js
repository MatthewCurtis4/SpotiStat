



module.exports = {
  top: function (data, listType) {
    var rows = [];
    var row = [];

    data.items.forEach(function (item, index) {
      var imageUrl;

      //imageUrl call is different depending on if its for a song or an artist
      if (listType == "artists"){
        imageUrl = item.images.length > 0 ? item.images[0].url : null
      }
      else{
        imageUrl = item.album.images.length > 0 ? item.album.images[0].url : null
      }

      row.push({
        rank: index + 1,
        name: item.name,
        image: imageUrl,
      });

      // Check if the row is full (5 items), then start a new row
      if (row.length === 5 || index === data.items.length - 1) {
        rows.push(row);
        row = [];
      }
    });

    // Create HTML for the grid
    var result = rows.map(function (row, rowIndex) {
      var rowHtml = row.map(function (item) {
        return (
          `<div class="item1">
            ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}
            <div class="item-info">${item.rank}. ${item.name}</div>
          </div>`
        );
      }).join("");

      return `<div class="row" key="${rowIndex}">${rowHtml}</div>`;
    }).join("");

    return result;
  }
};