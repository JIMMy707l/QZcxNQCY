// 代码生成时间: 2025-09-30 20:10:48
const fs = require('fs');
const path = require('path');

// 定义一个函数，用于解析注释并生成API文档
function parseCommentsAndGenerateDocs(comments) {
  return comments.map(comment => {
    const lines = comment.split('
');
    let doc = {
      description: '',
      params: [],
      returns: '',
      examples: [],
    };
    lines.forEach(line => {
      if (line.startsWith('* ')) {
        line = line.slice(2);
        if (line.startsWith('@param')) {
          const paramParts = line.split(' ');
          const paramName = paramParts[1];
          const paramDesc = paramParts.slice(2).join(' ');
          doc.params.push({ [paramName]: paramDesc });
        } else if (line.startsWith('@returns')) {
          doc.returns = line.slice(8);
        } else if (line.startsWith('@description')) {
          doc.description += line.slice(12) + '
';
        } else if (line.startsWith('@example')) {
          doc.examples.push(line.slice(9));
        }
      }
    });
    return doc;
  });
}

// 读取文件并生成API文档
function generateApiDocs(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const comments = fileContent.match(//\*\*([\s\S]*?)\*\//g);
    if (!comments) {
      throw new Error('No JSDoc comments found in the file.');
    }
    const docs = parseCommentsAndGenerateDocs(comments);
    fs.writeFileSync(path.join(__dirname, 'api_docs.json'), JSON.stringify(docs, null, 2), 'utf8');
    console.log('API documentation generated successfully.');
  } catch (error) {
    console.error('Error generating API documentation:', error.message);
  }
}

// 示例用法
// 假设有一个名为'api.js'的文件，其中包含JSDoc注释
// generateApiDocs('./api.js');