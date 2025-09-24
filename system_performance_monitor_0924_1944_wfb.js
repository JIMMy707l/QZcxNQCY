// 代码生成时间: 2025-09-24 19:44:27
 * Features:
 * - Retrieves CPU usage
 * - Retrieves memory usage
 * - Retrieves disk usage
 *
 * @author Your Name
 * @version 1.0
 */

const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');

class SystemPerformanceMonitor {
  // Get CPU usage
  getCPUUsage() {
    return new Promise((resolve, reject) => {
      const { cpus } = os;
      this.cpuUsagePrevious = this.cpuUsagePrevious || cpus()[0].times.idle;
      const idle = cpus()[0].times.idle;
      const cpuUsage = 1 - (idle - this.cpuUsagePrevious) / (idle - cpus()[0].times.idle);
      this.cpuUsagePrevious = idle;
      resolve(cpuUsage);
    });
  }

  // Get Memory usage
  getMemoryUsage() {
    return new Promise((resolve, reject) => {
      const { freemem, totalmem } = os;
      const used = totalmem - freemem;
      const memoryUsage = (used / totalmem) * 100;
      resolve(memoryUsage);
    });
  }

  // Get Disk usage
  getDiskUsage() {
    return new Promise((resolve, reject) => {
      exec('df -h', (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          const lines = stdout.split('
');
          const lastLine = lines[lines.length - 1];
          const diskUsage = lastLine.split(' ')[1];
          resolve(diskUsage);
        }
      });
    });
  }
}

// Example usage:
const monitor = new SystemPerformanceMonitor();

Promise.all([
  monitor.getCPUUsage(),
  monitor.getMemoryUsage(),
  monitor.getDiskUsage()
]).then(results => {
  console.log('System Performance Metrics:', results);
}).catch(error => {
  console.error('Error:', error);
});
