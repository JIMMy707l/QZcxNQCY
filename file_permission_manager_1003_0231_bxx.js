// 代码生成时间: 2025-10-03 02:31:23
const fs = require('fs');
const path = require('path');

/**
 * 文件权限管理器
 * @class FilePermissionManager
 */
class FilePermissionManager {
  
  /**
   * 构造函数
   * @param {string} directoryPath - 需要管理权限的目录路径
   */
  constructor(directoryPath) {
    this.directoryPath = directoryPath;
  }

  /**
   * 设置文件或目录的权限
   * @param {string} filePath - 文件或目录的路径
   * @param {string} mode - 权限模式（例如：'755'）
   */
  setPermissions(filePath, mode) {
    try {
      fs.chmodSync(filePath, mode);
      console.log(`Permissions set to ${mode} for ${filePath}`);
    } catch (error) {
      console.error(`Error setting permissions for ${filePath}: ${error.message}`);
      throw error;
    }
  }

  /**
   * 获取文件或目录的当前权限
   * @param {string} filePath - 文件或目录的路径
   * @returns {Promise<string>} - 文件或目录的权限模式
   */
  getPermissions(filePath) {
    return new Promise((resolve, reject) => {
      fs.stat(filePath, (err, stats) => {
        if (err) return reject(err);
        const mode = stats.mode.toString(8);
        resolve(mode);
      });
    });
  }

  /**
   * 递归设置目录及其子文件/目录的权限
   * @param {string} directoryPath - 目录的路径
   * @param {string} mode - 权限模式
   */
  setPermissionsRecursively(directoryPath, mode) {
    fs.readdirSync(directoryPath).forEach(file => {
      const fullPath = path.join(directoryPath, file);
      this.setPermissions(fullPath, mode);
      if (fs.statSync(fullPath).isDirectory()) {
        this.setPermissionsRecursively(fullPath, mode);
      }
    });
  }
}

// 使用示例
const directoryPath = './example_directory';
const manager = new FilePermissionManager(directoryPath);

// 设置单个文件权限
manager.setPermissions(`${directoryPath}/file.txt`, '644');

// 获取单个文件权限
manager.getPermissions(`${directoryPath}/file.txt`)
  .then((mode) => console.log(`File permissions: ${mode}`))
  .catch((error) => console.error(`Error getting permissions: ${error.message}`));

// 递归设置目录权限
manager.setPermissionsRecursively(directoryPath, '755');