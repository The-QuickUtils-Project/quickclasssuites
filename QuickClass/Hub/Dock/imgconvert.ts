import fs from 'node:fs/promises';
import path from 'node:path';
import { app } from 'electron';

function validatePath(userPath: string) {
  const allowedPaths = [
    path.join(app.getPath('appData'), 'classhub')
  ]

  const isValid = allowedPaths.some(allowed => {
    const relative = path.relative(allowed, userPath)
    return !relative.startsWith('..') && !path.isAbsolute(relative)
  })

  if (!isValid) throw new Error('非法路径访问')
  return userPath
}

// Img转base64读取
export async function read_image_to_base64(filePath: string): Promise<string | null> {
  try {
    // 校验路径合法性并获取buffer
    const validPath = validatePath(filePath);
    const buffer = await fs.readFile(validPath)
    const data = `data:image/png;base64,${buffer.toString('base64')}`
    console.log('ReadImgSuccessful:', data)
    return data;
  } catch (error) {
    console.error('读取图片失败:', error)
    return null
  }
}