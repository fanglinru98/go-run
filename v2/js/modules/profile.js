// ================================================================
// 个人中心模块
// ================================================================

function renderMiniCalendar() {
    const container = document.getElementById('miniCalendar');
    if (!container) return;
    const dateWorkouts = window.dateWorkouts;
    const days = [];
    for (let d = 1; d <= 31; d++) {
        const dateStr = `2026-07-${String(d).padStart(2,'0')}`;
        const has = dateWorkouts[dateStr] && dateWorkouts[dateStr].length > 0;
        const isToday = (dateStr === '2026-07-26');
        days.push({ day: d, has, isToday });
    }
    let html = '';
    for (let i = 0; i < 3; i++) html += `<div class="day empty"></div>`;
    days.forEach(d => {
        let cls = 'day';
        if (d.has) cls += ' has-workout';
        if (d.isToday) cls += ' active';
        html += `<div class="${cls}">${d.day}</div>`;
    });
    container.innerHTML = html;
}

// ===== 暴露到全局 =====
window.renderMiniCalendar = renderMiniCalendar;