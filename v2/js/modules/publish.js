// ================================================================
// 发布页面模块
// ================================================================

let photoCount = 0;

function addPhoto() {
    const slots = document.querySelectorAll('.photo-slot');
    for (let i = 1; i < slots.length; i++) {
        if (slots[i].style.display === 'none') {
            slots[i].style.display = 'flex';
            photoCount++;
            break;
        }
    }
    if (photoCount >= 3) document.querySelector('.photo-slot:first-child').style.display = 'none';
}

function toggleAdvanced() {
    const sw = document.getElementById('advancedSwitch');
    const panel = document.getElementById('advancedPanel');
    sw.classList.toggle('active');
    panel.style.display = sw.classList.contains('active') ? 'block' : 'none';
}

function openSummaryModal() {
    document.getElementById('summaryModal').classList.add('open');
}

function closeSummaryModal() {
    document.getElementById('summaryModal').classList.remove('open');
}

function editSummary() {
    alert('✎ 进入编辑模式（可修改训练日志内容）');
}

function confirmPublish() {
    alert('✅ 训练日志已发布！');
    closeSummaryModal();
}

// ===== 暴露到全局 =====
window.addPhoto = addPhoto;
window.toggleAdvanced = toggleAdvanced;
window.openSummaryModal = openSummaryModal;
window.closeSummaryModal = closeSummaryModal;
window.editSummary = editSummary;
window.confirmPublish = confirmPublish;