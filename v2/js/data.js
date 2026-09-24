// ================================================================
// 数据定义（用于全局共享 & 弹窗逻辑）
// ================================================================

// 今日运动数据（由 index.html 内联脚本管理，此处作为后备）
window.actions = [
    { id: 'e1', name: '平板卧推', part: '胸部', type: 'strength', groups: 4, reps: 10, weight: 50, done: true,  kcal: 520 },
    { id: 'e2', name: '高位下拉', part: '背部', type: 'strength', groups: 4, reps: 10, weight: 50, done: false, kcal: 480 },
    { id: 'e3', name: '慢跑',     part: '有氧', type: 'cardio',   duration: 30, distance: 5.2, calories: 420, done: false, kcal: 420 },
];

window.currentDate = '2026-07-26';

window.dateWorkouts = {
    '2026-07-20': ['卧推', '深蹲'],
    '2026-07-21': ['硬拉'],
    '2026-07-22': [],
    '2026-07-23': ['推举', '划船'],
    '2026-07-24': [],
    '2026-07-25': ['深蹲', '卧推', '划船'],
    '2026-07-26': ['平板卧推', '高位下拉', '慢跑'],
};

// 力量动作预设（按部位）
window.strengthPresets = {
    chest: [
        { name: '平板卧推', groups: 4, reps: 10, weight: 50 },
        { name: '上斜卧推', groups: 4, reps: 10, weight: 40 },
        { name: '哑铃飞鸟', groups: 3, reps: 12, weight: 16 },
        { name: '绳索夹胸', groups: 3, reps: 15, weight: 20 },
    ],
    back: [
        { name: '高位下拉', groups: 4, reps: 10, weight: 50 },
        { name: '杠铃划船', groups: 4, reps: 10, weight: 45 },
        { name: '引体向上', groups: 3, reps: 8, weight: 0 },
        { name: '坐姿划船', groups: 3, reps: 12, weight: 40 },
    ],
    legs: [
        { name: '杠铃深蹲', groups: 4, reps: 10, weight: 60 },
        { name: '腿举', groups: 4, reps: 12, weight: 80 },
        { name: '罗马尼亚硬拉', groups: 3, reps: 10, weight: 50 },
        { name: '腿弯举', groups: 3, reps: 12, weight: 35 },
    ],
    shoulders: [
        { name: '哑铃推举', groups: 4, reps: 10, weight: 20 },
        { name: '侧平举', groups: 3, reps: 15, weight: 8 },
        { name: '面拉', groups: 3, reps: 15, weight: 15 },
        { name: '杠铃推举', groups: 4, reps: 8, weight: 40 },
    ],
    arms: [
        { name: '杠铃弯举', groups: 3, reps: 12, weight: 25 },
        { name: '绳索下压', groups: 3, reps: 15, weight: 20 },
        { name: '锤式弯举', groups: 3, reps: 12, weight: 14 },
        { name: '窄距卧推', groups: 3, reps: 10, weight: 40 },
    ],
    core: [
        { name: '卷腹', groups: 3, reps: 20, weight: 0 },
        { name: '平板支撑', groups: 3, reps: 60, weight: 0 },
        { name: '悬垂举腿', groups: 3, reps: 12, weight: 0 },
        { name: '俄罗斯转体', groups: 3, reps: 20, weight: 5 },
    ],
};

// 有氧运动预设
window.cardioPresets = [
    { name: '跑步', duration: 30, distance: 5.0, calories: 280 },
    { name: '爬坡', duration: 20, distance: 0, calories: 150 },
    { name: '骑行', duration: 45, distance: 15.0, calories: 350 },
    { name: '游泳', duration: 30, distance: 1.0, calories: 300 },
    { name: '跳绳', duration: 15, distance: 0, calories: 180 },
    { name: '椭圆机', duration: 30, distance: 3.0, calories: 250 },
    { name: '划船机', duration: 20, distance: 2.0, calories: 200 },
    { name: 'HIIT', duration: 20, distance: 0, calories: 320 },
];