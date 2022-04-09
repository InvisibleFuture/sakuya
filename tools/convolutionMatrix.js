/*
 * 参数中的 kernel 就是卷积核方阵，不过顺着排列成了一个九位的数组
 * 像是这样 [-1, -1, -1, -1, 8, -1, -1, -1, -1]
 * offset 对RGBA数值直接增加，表现为提高亮度
 * 下面的for循环
 * y 代表行，x 代表列，c 代表RGBA
 */

export default function (image, kernel, offset = 0) {
  let { width, height, data } = image
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      for (let c = 0; c < 3; c += 1) {
        let i = (y * width + x) * 4 + c
        data[i] =
          offset +
          (
            kernel[0] * data[i - width * 4 - 4] +
            kernel[1] * data[i - width * 4] +
            kernel[2] * data[i - width * 4 + 4] +
            kernel[3] * data[i - 4] +
            kernel[4] * data[i] +
            kernel[5] * data[i + 4] +
            kernel[6] * data[i + width * 4 - 4] +
            kernel[7] * data[i + width * 4] +
            kernel[8] * data[i + width * 4 + 4]
          ) / 1
      }
      data[(y * width + x) * 4 + 3] = 255
    }
  }
  return image
}

// 卷积核

// 全连接层, 输入全部特征队列, 输入网络深度
function 全连接(arr, deep = 1) {
  let list = []
  for (let i = 0; i < arr.length; i++) {
    list.push(arr[i])
  }

  for (let i = 0; i < deep; i++) {

  }
}