import Matrix from './widgets/matrix.js'
import convolutionMatrix from './tools/convolutionMatrix.js'

const matrix = new Matrix(32, 32)
document.body.appendChild(matrix.element)

// DEMO
const canvas = document.createElement("canvas")
const context = canvas.getContext('2d')
const image = new Image()

image.src = 'img/00010-938548211.png'
image.onload = function () {
  context.drawImage(image, 0, 0)
  //let handle = document.createElement("button")
  //let create = document.createElement("button")
  //document.body.appendChild(handle)
  //document.body.appendChild(create)
  //handle.innerText = "处理图片"
  //create.innerText = "生成图片"
  //handle.onclick = function () {
  //  let imgData = context.getImageData(0, 0, canvas.width, canvas.height)
  //  let average = 0
  //  //// 灰度处理
  //  //for (var i = 0; i < imgData.data.length; i += 4) {
  //  //  average = Math.floor((imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3);  //将红、绿、蓝色值求平均值后得到灰度值
  //  //  imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = average; //将每个像素点的色值重写
  //  //  //matrix.setItem(i, 1, 125)
  //  //  //console.log(imgData.data[i])
  //  //  //matrix.setIndex(i / 4, imgData.data[i])
  //  //}
  //  //context.putImageData(imgData, 0, 0);  //将处理后的图像数据重写至Canvas画布，此时画布中图像变为黑白色
  //};
  //create.onclick = function () {  // 单击“生成图片”按钮，导出图片
  //  var imgSrc = canvas.toDataURL();  //获取图片的DataURL
  //  var newImg = new Image();
  //  var result = document.createElement("div");
  //  document.body.appendChild(result)
  //  newImg.src = imgSrc;  //将图片路径赋值给src
  //  result.innerHTML = '';
  //  result.appendChild(newImg);
  //  //matrix.setItem(2, 0, 125)
  //};

  //获取图片数据对象
  let imgData = context.getImageData(0, 0, canvas.width, canvas.height)

  // 分离通道
  let R = []
  let G = []
  let B = []
  for (var i = 0; i < imgData.data.length; i += 4) {
    R.push(imgData.data[i])
    G.push(imgData.data[i + 1])
    B.push(imgData.data[i + 2])
  }

  // 使用单通道
  for (var i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i + 1] = 0
    imgData.data[i + 2] = 0
  }
  context.putImageData(imgData, 0, 0);

  //// 10 层滤波器
  //for (let i = 0; i < 10; i++) {
  //  context.putImageData(convolutionMatrix(imgData, [
  //    //-1, -1, 0,
  //    //-1, 1, 1,
  //    //0, 1, 1,
  //    -2, -1, 0,
  //    1, -1, 1,
  //    8, 0, -4
  //  ]), 0, 0)
  //}

  // 将图像展示到矩阵中
  for (var i = 0; i < imgData.data.length && i < 4096; i += 4) {
    matrix.setItem(i / 4, 0, imgData.data[i])
  }

  //let ctx = this
  //for (var i = 0; i < imgData.data.length; i += 4) {
  //  imgData.data[i + 1] = 128
  //  imgData.data[i + 2] = 128
  //}
  //context.putImageData(imgData, 0, 0);

  //  /* 
  // * 参数中的 kernel 就是卷积核方阵，不过顺着排列成了一个九位的数组
  // * 像是这样 [-1, -1, -1, -1, 8, -1, -1, -1, -1]
  // * offset 对RGBA数值直接增加，表现为提高亮度
  // * 下面的for循环
  // * y 代表行，x 代表列，c 代表RGBA
  // */
  //convolutionMatrix(input, kernel, offset = 0) {
  //  let ctx = this.outputCtx
  //  let output = ctx.createImageData(input)
  //  let w = input.width,
  //    h = input.height
  //  let iD = input.data,
  //    oD = output.data
  //  for (let y = 1; y < h - 1; y += 1) {
  //    for (let x = 1; x < w - 1; x += 1) {
  //      for (let c = 0; c < 3; c += 1) {
  //        let i = (y * w + x) * 4 + c
  //        oD[i] =
  //          offset +
  //          (kernel[0] * iD[i - w * 4 - 4] +
  //            kernel[1] * iD[i - w * 4] +
  //            kernel[2] * iD[i - w * 4 + 4] +
  //            kernel[3] * iD[i - 4] +
  //            kernel[4] * iD[i] +
  //            kernel[5] * iD[i + 4] +
  //            kernel[6] * iD[i + w * 4 - 4] +
  //            kernel[7] * iD[i + w * 4] +
  //            kernel[8] * iD[i + w * 4 + 4]) /
  //            this.divisor
  //      }
  //      oD[(y * w + x) * 4 + 3] = 255
  //    }
  //  }
  //  ctx.putImageData(output, 0, 0)
  //}


};

document.body.appendChild(canvas)

// 第一层输入层数量固定 32*32
// 通过 滤波器 保留特征, 到输出合并层时,
// 网络深度有限, 因而特征规模有限(但非常大)
// 如何作关键特征映射?
// 1. 存储常见特征, 如果符合, 滤波器将一组特征保留, 因而最后一层滤波器输出结果就是// 卷积结果为激活值, 算子为特征
// 2. 输入一张图像, 设定此图像输出结果
// 3. 输入另一张图, 设定此图像输出结果

// 4. 输入另一张图, 排除所有不同激活的
