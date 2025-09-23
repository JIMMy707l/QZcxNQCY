// 代码生成时间: 2025-09-24 01:21:40
const fs = require('fs');
const readline = require('readline');
const { Chart, registerables } = require('chart.js');
const { BarElement, CategoryScale, LinearScale, PointElement } = registerables;

// 定义图表类型和样式
const chartTypes = {
  bar: 'bar',
  line: 'line'
};

// 创建一个交互式提示界面
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 函数：获取用户输入
function getChartOptions() {
  return new Promise(resolve => {
    rl.question('请输入图表类型（bar/line）: ', async (type) => {
      if (!chartTypes[type]) {
        console.error('无效的图表类型，请输入 bar 或 line');
        await getChartOptions();
        return;
      }

      rl.question('请输入数据点的数量: ', (dataPoints) => {
        if (isNaN(dataPoints)) {
          console.error('数据点数量必须是数字');
          resolve(getChartOptions());
          return;
        }

        rl.question('请输入数据点值（以逗号分隔）: ', (values) => {
          const dataArray = values.split(',').map(num => parseFloat(num.trim()));
          if (dataArray.someisNaN)) {
            console.error('所有数据点值必须是数字');
            resolve(getChartOptions());
            return;
          }

          const options = {
            type: chartTypes[type],
            data: {
              labels: Array.from({length: dataPoints}, (_, i) => `Point ${i+1}`),
              datasets: [{
                label: '示例数据集',
                data: dataArray,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          };

          // 将图表配置写入文件
          fs.writeFileSync('chart-options.json', JSON.stringify(options, null, 2));
          console.log('图表配置已保存到 chart-options.json');
          rl.close();
          resolve(options);
        });
      });
    });
  });
}

// 主函数
async function main() {
  try {
    const options = await getChartOptions();
    // 此处可以添加代码来生成图表
    console.log('图表配置:', options);
  } catch (error) {
    console.error('发生错误:', error);
  }
}

main();