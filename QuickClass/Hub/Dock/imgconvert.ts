import fs from 'node:fs/promises';
import path from 'node:path';
import { app } from 'electron';
import { Config as engineConfig } from '../../Config/configLoader';

function validatePath(userPath: string) {
  const config = new engineConfig('config.json')
  const configStoragePath = config.getConfigItem("archievePath");
  let archievePath = "";
  if (configStoragePath === "" || configStoragePath === undefined) {
    archievePath = path.join(app.isPackaged ? path.dirname(process.execPath) : app.getAppPath(), 'archieve');
    console.warn('Using default archieve path, when the software updates, the archieve might lost.')
  } else {
    archievePath = configStoragePath;
  }
  const allowedPaths = [
    path.join(archievePath)
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