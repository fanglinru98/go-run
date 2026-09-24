// ================================================================
// 健康页面模块
// ================================================================

function renderCurveChart() {
    const svg = document.getElementById('curveSvg');
    if (!svg) return;
    const data = [28, 42, 18, 34, 14, 8, 38];
    const points = data.map((val, i) => ({
        x: 20 + i * (300 / (data.length - 1)),
        y: 60 - (val / 50) * 45
    }));
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i+1];
        const cp1x = p1.x + (p2.x - p1.x) * 0.5;
        const cp1y = p1.y;
        const cp2x = p2.x - (p2.x - p1.x) * 0.5;
        const cp2y = p2.y;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    // 渐变
    const gradient = svg.querySelector('defs linearGradient');
    if (!gradient) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        grad.setAttribute('id', 'areaGrad');
        grad.setAttribute('x1', '0%');
        grad.setAttribute('y1', '0%');
        grad.setAttribute('y2', '100%');
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#b7ff2a');
        stop1.setAttribute('stop-opacity', '0.3');
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#b7ff2a');
        stop2.setAttribute('stop-opacity', '0.02');
        grad.appendChild(stop1);
        grad.appendChild(stop2);
        defs.appendChild(grad);
        svg.appendChild(defs);
    }

    let fillPath = path + ` L ${points[points.length-1].x} 60 L ${points[0].x} 60 Z`;
    const oldFill = svg.querySelector('.area-path');
    if (oldFill) oldFill.remove();
    const fillEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    fillEl.setAttribute('d', fillPath);
    fillEl.setAttribute('fill', 'url(#areaGrad)');
    fillEl.classList.add('area-path');
    svg.appendChild(fillEl);

    const oldCurve = svg.querySelector('.curve-path');
    if (oldCurve) oldCurve.remove();
    const curveEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    curveEl.setAttribute('d', path);
    curveEl.setAttribute('stroke', '#b7ff2a');
    curveEl.setAttribute('stroke-width', '2.5');
    curveEl.setAttribute('fill', 'none');
    curveEl.classList.add('curve-path');
    svg.appendChild(curveEl);

    const oldDots = svg.querySelectorAll('.dot-circle');
    oldDots.forEach(el => el.remove());
    points.forEach((p, i) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', p.x);
        circle.setAttribute('cy', p.y);
        circle.setAttribute('r', '4');
        circle.setAttribute('fill', '#b7ff2a');
        circle.setAttribute('stroke', 'white');
        circle.setAttribute('stroke-width', '1.5');
        circle.classList.add('dot-circle');
        svg.appendChild(circle);
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', p.x);
        text.setAttribute('y', p.y - 8);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '8');
        text.setAttribute('fill', '#8e8e93');
        text.textContent = data[i];
        svg.appendChild(text);
    });
}

// ===== 暴露到全局 =====
window.renderCurveChart = renderCurveChart;