class draw {
  constructor(
    imgWidth = 300,
    imgHeight = 200,
    canvasWidth = 1100,
    canvasHeight = 800
  ) {
    this.type = 'pen';
    this.isDraw = false;
    this.img = new Image(); // 用于动态绘制指向，矩形，原型
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.imgWidth = canvasWidth;
    this.imgHeight = canvasHeight;
    this.penal = document.querySelector('#penal');
    this.pen = this.penal.getContext('2d');
    this.color = document.querySelector('#color');
    this.lineWidth = document.querySelector('#lineWidth');
    this.select = document.querySelector('#select'); // 选择面板
    this.clearCanvas = document.querySelector('#new');
  }

  clearAndBeginPath() {
    this.pen.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.pen.drawImage(this.img, 0, 0);
    this.pen.beginPath();
  }

  init() {
    let originX;
    let originY;

    this.penal.addEventListener('mousedown', e => {
      this.isDraw = true;

      if (this.type !== 'robber') {
        this.img.src = this.penal.toDataURL('image/png');
      }
      originX = e.clientX - this.penal.offsetLeft; // 原点坐标
      originY = e.clientY - this.penal.offsetTop;

      // TODO: 如果需要改变笔触颜色，之前不被影响，则需要加入这句，进行重新绘制
      this.pen.beginPath();

      this.pen.moveTo(originX, originY);
      this.pen.strokeStyle = this.color.placeholder;
      this.pen.lineWidth = this.lineWidth.placeholder;
      this.pen.lineTo(originX, originY);
      this.pen.stroke();
    });

    this.penal.addEventListener('mousemove', ({ clientX, clientY }) => {
      if (!this.isDraw) return;
      const x = clientX - this.penal.offsetLeft;
      const y = clientY - this.penal.offsetTop;
      let newOriginX = originX;
      let newOriginY = originY;
      if (this.type === 'pen') {
        this.pen.lineTo(x, y);
        this.pen.stroke();
      } else if (this.type === 'robber') {
        this.pen.strokeStyle = '#f00';
        this.pen.clearRect(
          x - 10,
          y - 10,
          this.pen.lineWidth,
          this.pen.lineWidth
        );
      } else if (this.type === 'line') {
        this.clearAndBeginPath();
        this.pen.moveTo(originX, originY);
        this.pen.lineTo(x, y);
        this.pen.stroke();
        this.pen.closePath();
      } else if (this.type === 'rect') {
        this.clearAndBeginPath();

        if (x < originX) {
          newOriginX = x;
        }
        if (y < originY) {
          newOriginY = y;
        }
        this.pen.rect(
          newOriginX,
          newOriginY,
          Math.abs(x - originX),
          Math.abs(y - originY)
        );
        this.pen.stroke();
        this.pen.closePath();
      } else if (this.type === 'arc') {
        this.clearAndBeginPath();

        if (x < originX) {
          newOriginX = x;
        }
        if (y < originY) {
          newOriginY = y;
        }
        let r = Math.sqrt(
          Math.abs(x - originX) * Math.abs(x - originX) +
            Math.abs(y - originY) * Math.abs(y - originY)
        );
        this.pen.arc(
          Math.abs(x - originX) + newOriginX,
          Math.abs(y - originY) + newOriginY,
          r,
          0,
          2 * Math.PI
        );
        this.pen.fillStyle = this.color.placeholder;
        this.pen.fill();
        this.pen.closePath();
      }
    });

    this.penal.addEventListener('mouseleave', () => {
      if (!this.isDraw) return;
      this.isDraw = false;
      this.pen.closePath();
    });

    this.penal.addEventListener('mouseup', () => {
      this.isDraw = false;
    });

    this.select.addEventListener('click', ({ target: { id } }) => {
      if (id !== 'img' && id !== 'save') {
        this.type = id;
      } else if (id === 'img') {
        const file = document.querySelector('#file');
        file.click();
        file.onchange = ({ target: { files } }) => {
          let reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload = ({ target: { result } }) => {
            let img = new Image();
            img.src = result;
            img.onload = () => {
              this.pen.drawImage(img, 0, 0, this.imgWidth, this.imgHeight);
            };
          };
        };
      } else if (id === 'save') {
        let a = document.createElement('a');
        a.href = this.penal.toDataURL('image/png');
        a.download = 'image.jpeg';
        a.id = 'download';
        a.innerHTML = 'download';
        document.body.appendChild(a);

        const download = document.querySelector('#download');
        download.style.display = 'none';
        download.click();
      }
    });

    this.clearCanvas.addEventListener('click', () => {
      this.pen.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    });
  }
}
export default draw;
