function draw () {
  this.type = 'pen'
  this.penal = document.getElementById('penal')
  this.pen = this.penal.getContext('2d')
  this.isDraw = false
  this.color = document.getElementById('color')
  this.lineWidth = document.getElementById('lineWidth')
  this.select = document.getElementById('select'); // 选择面板
  this.clearCanvas = document.getElementById('new')
  this.img = new Image(); // 用于动态绘制指向，矩形，原型
}
//  不能使用es6的箭头函数 https://segmentfault.com/a/1190000007074846
draw.prototype.init = function () {
  let originX = null
  let originY = null
  let _this = this
  this.penal.addEventListener('mousedown', function (e) {
    _this.isDraw = true
    if (_this.type !== 'robber') {
      _this.img.src = _this.penal.toDataURL('image/png')
    }
    originX = e.clientX - _this.penal.offsetLeft // 原点坐标
    originY = e.clientY - _this.penal.offsetTop
      
    _this.pen.beginPath() // 如果需要改变笔触颜色，之前不被影响，则需要加入这句，进行重新绘制
    _this.pen.moveTo(originX, originY)
    _this.pen.strokeStyle = _this.color.placeholder
    _this.pen.lineWidth = _this.lineWidth.placeholder
    _this.pen.lineTo(originX, originY)
    _this.pen.stroke()
  }, false)

  this.penal.addEventListener('mousemove', function (e) {
    if (_this.isDraw) {
      let x = e.clientX - _this.penal.offsetLeft
      let y = e.clientY - _this.penal.offsetTop
      let newOriginX = originX,newOriginY = originY
      if (_this.type === 'pen') {
          _this.pen.lineTo(x, y)
          _this.pen.stroke()
      }else if (_this.type === 'robber') {
        _this.pen.strokeStyle = '#f00'
        _this.pen.clearRect(x - 10, y - 10, _this.pen.lineWidth, _this.pen.lineWidth)
      }else if (_this.type === 'line') {
        _this.pen.clearRect(0, 0, 1000, 800)
        _this.pen.drawImage(_this.img, 0, 0)
        _this.pen.beginPath()
        _this.pen.moveTo(originX, originY)
        _this.pen.lineTo(x, y)
        _this.pen.stroke()
        _this.pen.closePath()
      }else if (_this.type === 'rect') {
        _this.pen.clearRect(0, 0, 1000, 800)
        _this.pen.drawImage(_this.img, 0 , 0)
        _this.pen.beginPath()

        if (x < originX) {
          newOriginX = x
        }
        if (y < originY) {
          newOriginY = y
        }
        _this.pen.rect(newOriginX, newOriginY, Math.abs(x - originX), Math.abs(y - originY))
        _this.pen.stroke()
        _this.pen.closePath()
      }else if (_this.type === 'arc') {
        _this.pen.clearRect(0, 0, 1000, 800)
        _this.pen.drawImage(_this.img, 0, 0)
        _this.pen.beginPath()
        if (x < originX) {
          newOriginX = x
        }
        if (y < originY) {
          newOriginY = y
        }
        let r = Math.sqrt(Math.abs(x - originX) * Math.abs(x - originX) + Math.abs(y - originY) * Math.abs(y - originY))
        _this.pen.arc(Math.abs(x - originX) + newOriginX, Math.abs(y - originY) + newOriginY, r, 0, 2 * Math.PI)
        _this.pen.fillStyle = _this.color.placeholder
        _this.pen.fill()
        _this.pen.closePath()
      }
    }
  }, false)
  this.penal.addEventListener('mouseleave', function () {
    if (_this.isDraw) {
      _this.isDraw = false
      _this.pen.closePath()
    }
  }, false)
  this.penal.addEventListener('mouseup', function (event) {
    _this.isDraw = false
  }, false)
  this.select.addEventListener('click', function (event) {
    if (event.target.id !== 'img' && event.target.id !== 'save') {
      _this.type = event.target.id
    } else if (event.target.id === 'img') {
      document.getElementById('file').click()
      document.getElementById('file').onchange = function (e) {
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function (ent) {
          var img = new Image()
          img.src = ent.target.result
          img.width = 800
          img.height = 800

          _this.pen.drawImage(img, 0, 0)
        }
      }
    } else if (event.target.id === 'save') {
      var a = document.createElement('a')
      a.href = _this.penal.toDataURL('image/png')
      a.download = 'image.jpeg'
      a.id = 'download'
      a.innerHTML = 'download'
      document.body.appendChild(a)
      document.getElementById('download').style.display = 'none'
      document.getElementById('download').click()
    }
  }, false)
  this.clearCanvas.addEventListener('click', () => {
    // _this.pen.clearRect(0, 0, 1000, 800)
    let tempWidth = _this.penal.width
    _this.penal.width = _this.penal.height
    _this.penal.width = tempWidth
  })
}

export default draw
