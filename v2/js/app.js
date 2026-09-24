// ================================================================
// 应用核心（路由、Tab切换、全局模态框、初始化）
// ================================================================

// ===== 页面缓存 =====
const pageCache = {};

// ===== Tab 切换 =====
function switchTab(tabId) {
    const container = document.getElementById('pageContainer');
    const map = {
        'today': 'pages/today.html',
        'follow': 'pages/follow.html',
        'publish': 'pages/publish.html',
        'health': 'pages/health.html',
        'profile': 'pages/profile.html'
    };

    // 更新 Tab 激活状态
    document.querySelectorAll('.tab-item').forEach(el => {
        el.classList.toggle('active', el.dataset.tab === tabId);
    });

    // 控制固定头部（今日和发布页显示）
    const fixedHeader = document.getElementById('fixedHeader');
    const calendarStrip = document.getElementById('calendarStrip');
    const publishBadge = document.getElementById('publishBadge');
    const fab = document.getElementById('fabFixed');

    if (tabId === 'today' || tabId === 'publish') {
        fixedHeader.classList.add('visible');
        if (calendarStrip) {
            calendarStrip.style.display = (tabId === 'today') ? 'flex' : 'none';
        }
        // 发布角标仅在发布页显示
        if (publishBadge) {
            publishBadge.style.display = (tabId === 'publish') ? 'inline-block' : 'none';
        }
    } else {
        fixedHeader.classList.remove('visible');
    }

    // FAB 仅在今日页显示
    if (tabId === 'today') {
        fab.classList.add('visible');
    } else {
        fab.classList.remove('visible');
    }

    // 加载页面内容（缓存优先）
    const url = map[tabId];
    if (pageCache[url]) {
        container.innerHTML = pageCache[url];
        afterPageLoad(tabId);
        return;
    }

    fetch(url)
        .then(res => res.text())
        .then(html => {
            pageCache[url] = html;
            container.innerHTML = html;
            afterPageLoad(tabId);
        })
        .catch(err => {
            console.error('加载页面失败:', err);
            container.innerHTML = `<div style="text-align:center;padding:40px;color:#8e8e93;">页面加载失败，请刷新重试</div>`;
        });

    // 滚动到顶部
    document.getElementById('scrollContent').scrollTop = 0;
}

// ===== 页面加载后执行 =====
function afterPageLoad(tabId) {
    if (tabId === 'health') {
        if (typeof window.renderCurveChart === 'function') {
            window.renderCurveChart();
        }
    } else if (tabId === 'profile') {
        if (typeof window.renderMiniCalendar === 'function') {
            window.renderMiniCalendar();
        }
    }
}

// ===== 浮窗控制（暴露至 window 供 HTML onclick 调用） =====
window.openModal = function() {
    document.getElementById('actionModal').classList.add('open');
    // 初始化浮窗内部交互
    if (typeof window.initFloatingModal === 'function') {
        setTimeout(window.initFloatingModal, 50);
    }
};

window.closeModal = function() {
    document.getElementById('actionModal').classList.remove('open');
};

window.selectItem = function(name) {
    var el = document.getElementById('strengthName');
    if (el) el.value = name;
    el = document.getElementById('cardioName');
    if (el) el.value = name;
};

// ===== 换装弹窗（暴露至 window） =====
window.openDressModal = function() {
    document.getElementById('dressModal').classList.add('open');
};

window.closeDressModal = function() {
    document.getElementById('dressModal').classList.remove('open');
};

window.changeOutfit = function(emoji) {
    const placeholder = document.querySelector('.character-placeholder .big-icon');
    if (placeholder) placeholder.textContent = emoji;
    document.querySelectorAll('.dress-modal .opt').forEach(el => el.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    setTimeout(window.closeDressModal, 400);
};

// ===== 训练日志弹窗 =====
window.openSummaryModal = function() {
    document.getElementById('summaryModal').classList.add('open');
};
window.closeSummaryModal = function() {
    document.getElementById('summaryModal').classList.remove('open');
};
window.editSummary = function() { window.closeSummaryModal(); };
window.confirmPublish = function() { window.closeSummaryModal(); };

// ===== 初始化（由 index.html 内联脚本接管 switchTab） =====
// DOMContentLoaded 在 index.html 内联脚本中处理