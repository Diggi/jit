Layouts.Scatter = new Class({
  compute: function(prop) {
    this.controller.onBeforeCompute();
    var size = this.canvas.getSize(),
        config = this.config,
        margin = config.Margin,
        offset = this.backgroundConfig.axisOffset | 0,
        width = size.width + margin.left - margin.right + offset,
        height = size.height - margin.top + margin.bottom + offset,
        legendX = config.legendX,
        legendY = config.legendY,
        ranges = this.calculateRanges(),
        xRange = ranges[0],
        yRange = ranges[1],
        that = this;
    this.graph.eachNode(function(n) {
      var x = n.getData('x'),
          y = n.getData('y'),
          posx = that.calculateX(x, xRange, width),
          posy = that.calculateY(y, yRange, height);
      n.getPos(prop).setc(posx, posy);
    });
    this.controller.onAfterCompute(this);
  },
  
  _get: function(prop) {
    var config = this.config;
    if(config[prop] && config[prop].length) {
      return config[prop];
    }
    var ans = [];
    this.graph.eachNode(function(n) {
      var leg = n.getData(prop);
      if($.indexOf(ans, leg) < 0) {
        ans.push(leg);
      }
    });
    return ans;
  },
  
  getLegendX: function() {
    return this._get('legendX');
  },
  
  getLegendY: function() {
    return this._get('legendY');
  },
  
  calculateX: function(x, xRange, width) {
    return x * width / xRange;
  },
  
  calculateY: function(y, yRange, height) {
    return -y * height / yRange;
  },
  
  calculateRanges: function() {
    var maxX = 0,
        maxY = 0,
        minX = 0,
        minY = 0;
    this.graph.eachNode(function(n) {
      var x = n.getData('x'),
          y = n.getData('y');
      maxX = ((x > maxX) ? x : maxX);
      maxY = ((y > maxY) ? y : maxY);
      minX = ((x < minX) ? x : minX);
      minY = ((y < minY) ? y : minY);
    });
    var absMinX = Math.abs(minX),
        absMaxX = Math.abs(maxX),
        absMinY = Math.abs(minY),
        absMaxY = Math.abs(maxY);
    
    var xRange = ((absMaxX > absMinX) ? absMaxX*2 : absMinX*2),
        yRange = ((absMaxY > absMinY) ? absMaxY*2 : absMinY*2);
    return [xRange, yRange];
  }
  
});
