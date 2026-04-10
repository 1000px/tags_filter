// main.js - 最简版本
module.exports = class HelloWorldPlugin {
  async onload() {
    console.log('加载 Hello World 插件');
    
    // 添加左侧边栏图标
    this.addRibbonIcon('info', 'Hello World', () => {
      this.showHelloModal();
    });
  }

  showHelloModal() {
    // 创建对话框
    const modal = new HelloModal(this.app);
    modal.open();
  }
};

// 简单的对话框类
class HelloModal {
  constructor(app) {
    this.app = app;
  }

  open() {
    // 创建对话框容器
    const modalEl = document.createElement('div');
    modalEl.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--background-primary);
      border: 1px solid var(--background-modifier-border);
      border-radius: 8px;
      padding: 20px;
      z-index: 1000;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      min-width: 300px;
    `;
    
    // 添加标题
    const title = document.createElement('h3');
    title.textContent = 'Hello World!';
    title.style.marginTop = '0';
    modalEl.appendChild(title);
    
    // 添加内容
    const content = document.createElement('p');
    content.textContent = '你好！这是一个简单的对话框。';
    modalEl.appendChild(content);
    
    // 添加关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '关闭';
    closeBtn.className = 'mod-cta';
    closeBtn.style.cssText = 'margin-top: 10px; float: right;';
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modalEl);
      document.body.removeChild(overlay);
    });
    modalEl.appendChild(closeBtn);
    
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
    `;
    
    // 点击遮罩层关闭
    overlay.addEventListener('click', () => {
      document.body.removeChild(modalEl);
      document.body.removeChild(overlay);
    });
    
    // 添加到页面
    document.body.appendChild(overlay);
    document.body.appendChild(modalEl);
  }
}