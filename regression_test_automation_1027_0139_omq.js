// 代码生成时间: 2025-10-27 01:39:24
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 配置回归测试的参数
const testConfig = {
  testsDirectory: path.join(__dirname, 'tests'),
  testScript: 'regression_test_script.sh',
  expectedResults: 'expected_results.json'
};

// 执行回归测试
function runRegressionTests() {
  const command = `./${testConfig.testScript} ${testConfig.testsDirectory}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing regression tests:', error);
      return;
    }

    if (stderr) {
      console.error('Error output from regression tests:', stderr);
      return;
    }

    // 读取预期结果并进行比较
    fs.readFile(testConfig.expectedResults, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading expected results:', err);
        return;
      }

      const expectedResults = JSON.parse(data);
      const actualResults = stdout.trim().split('
');

      actualResults.forEach((result, index) => {
        if (result !== expectedResults[index]) {
          console.error(`Test case ${index + 1} failed: Expected ${expectedResults[index]}, but got ${result}`);
        } else {
          console.log(`Test case ${index + 1} passed: ${result}`);
        }
      });
    });
  });
}

// 启动回归测试
runRegressionTests();