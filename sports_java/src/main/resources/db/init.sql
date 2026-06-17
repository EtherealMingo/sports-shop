-- 创建数据库
CREATE DATABASE IF NOT EXISTS sports_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE sports_db;

-- 会员表
CREATE TABLE IF NOT EXISTS tb_member (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    member_id VARCHAR(64) NOT NULL COMMENT '会员ID',
    name VARCHAR(50) COMMENT '姓名',
    phone VARCHAR(20) NOT NULL UNIQUE COMMENT '手机号',
    avatar VARCHAR(255) COMMENT '头像',
    level INT DEFAULT 1 COMMENT '会员等级',
    points INT DEFAULT 0 COMMENT '积分余额',
    register_time DATETIME COMMENT '注册时间',
    last_consume_time DATETIME COMMENT '最后消费时间',
    deleted INT DEFAULT 0 COMMENT '删除标记 0-未删除 1-已删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_member_id (member_id),
    INDEX idx_phone (phone),
    INDEX idx_level (level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='会员表';

-- 积分记录表
CREATE TABLE IF NOT EXISTS tb_points_record (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    member_id VARCHAR(64) NOT NULL COMMENT '会员ID',
    points INT NOT NULL COMMENT '积分数量',
    type VARCHAR(20) NOT NULL COMMENT '类型 earn-获得 deduct-扣除',
    reason VARCHAR(200) COMMENT '原因',
    create_time DATETIME COMMENT '记录时间',
    deleted INT DEFAULT 0 COMMENT '删除标记 0-未删除 1-已删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_member_id (member_id),
    INDEX idx_type (type),
    INDEX idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='积分记录表';

-- 兑换商品表
CREATE TABLE IF NOT EXISTS tb_exchange_item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    name VARCHAR(100) NOT NULL COMMENT '商品名称',
    description TEXT COMMENT '商品描述',
    points INT NOT NULL COMMENT '所需积分',
    stock INT DEFAULT 0 COMMENT '库存',
    image VARCHAR(255) COMMENT '商品图片',
    type VARCHAR(20) NOT NULL COMMENT '类型 product-商品 service-服务',
    status VARCHAR(20) DEFAULT 'active' COMMENT '状态 active-启用 inactive-停用',
    deleted INT DEFAULT 0 COMMENT '删除标记 0-未删除 1-已删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='兑换商品表';

-- 兑换记录表
CREATE TABLE IF NOT EXISTS tb_exchange_record (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    member_id VARCHAR(64) NOT NULL COMMENT '会员ID',
    item_id BIGINT NOT NULL COMMENT '商品ID',
    item_name VARCHAR(100) NOT NULL COMMENT '商品名称',
    points INT NOT NULL COMMENT '消耗积分',
    status VARCHAR(20) DEFAULT 'pending' COMMENT '状态 pending-待核销 redeemed-已核销 cancelled-已取消',
    code VARCHAR(64) UNIQUE COMMENT '兑换码',
    create_time DATETIME COMMENT '兑换时间',
    redeem_time DATETIME COMMENT '核销时间',
    deleted INT DEFAULT 0 COMMENT '删除标记 0-未删除 1-已删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_member_id (member_id),
    INDEX idx_status (status),
    INDEX idx_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='兑换记录表';

-- 预约表
CREATE TABLE IF NOT EXISTS tb_appointment (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    member_id VARCHAR(64) NOT NULL COMMENT '会员ID',
    service_type VARCHAR(20) NOT NULL COMMENT '服务类型 badminton-羽毛球 tennis-网球',
    appointment_date DATE NOT NULL COMMENT '预约日期',
    time_slot VARCHAR(20) NOT NULL COMMENT '预约时段',
    racket_count INT DEFAULT 1 COMMENT '球拍数量',
    requirements VARCHAR(500) COMMENT '特殊要求',
    status VARCHAR(20) DEFAULT 'pending' COMMENT '状态 pending-待确认 confirmed-已确认 completed-已完成 cancelled-已取消',
    deleted INT DEFAULT 0 COMMENT '删除标记 0-未删除 1-已删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_member_id (member_id),
    INDEX idx_appointment_date (appointment_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='预约表';

-- 管理员表
CREATE TABLE IF NOT EXISTS tb_admin (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码(加密)',
    role VARCHAR(50) DEFAULT 'admin' COMMENT '角色',
    deleted INT DEFAULT 0 COMMENT '删除标记 0-未删除 1-已删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理员表';

-- 店铺信息表
CREATE TABLE IF NOT EXISTS tb_shop_info (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    name VARCHAR(100) NOT NULL COMMENT '店铺名称',
    address VARCHAR(255) COMMENT '地址',
    phone VARCHAR(20) COMMENT '电话',
    business_hours VARCHAR(100) COMMENT '营业时间',
    description TEXT COMMENT '店铺介绍',
    images TEXT COMMENT '店铺图片(JSON数组)',
    deleted INT DEFAULT 0 COMMENT '删除标记 0-未删除 1-已删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='店铺信息表';

-- 积分规则表
CREATE TABLE IF NOT EXISTS tb_points_rule (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    earn_rate INT DEFAULT 1 COMMENT '获取比例',
    deduct_rate INT DEFAULT 10 COMMENT '抵扣比例',
    valid_months INT DEFAULT 12 COMMENT '有效期(月)',
    description TEXT COMMENT '规则描述',
    deleted INT DEFAULT 0 COMMENT '删除标记 0-未删除 1-已删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='积分规则表';

-- 签到记录表
CREATE TABLE IF NOT EXISTS tb_sign_record (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    member_id VARCHAR(64) NOT NULL COMMENT '会员ID',
    sign_date DATE NOT NULL UNIQUE COMMENT '签到日期',
    consecutive_days INT DEFAULT 1 COMMENT '连续签到天数',
    points INT DEFAULT 1 COMMENT '获得积分',
    deleted INT DEFAULT 0 COMMENT '删除标记 0-未删除 1-已删除',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_member_id (member_id),
    INDEX idx_sign_date (sign_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='签到记录表';

-- 插入初始数据
INSERT INTO tb_admin (username, password, role) VALUES ('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'admin');
-- 默认密码: admin123

INSERT INTO tb_points_rule (earn_rate, deduct_rate, valid_months, description) VALUES
(1, 10, 12, '缠线服务/商品消费每1元积1分，10积分可抵扣1元消费，积分有效期为12个月');

-- ============================================
-- 线材耗材管理系统 — 新增表
-- ============================================

-- 1. 线材字典
CREATE TABLE IF NOT EXISTS tb_wire (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    brand           VARCHAR(50)  NOT NULL COMMENT '品牌（李宁/Yonex/王子…）',
    model           VARCHAR(50)  NOT NULL COMMENT '型号（N90/AB/66U…）',
    spec            VARCHAR(30)           COMMENT '规格粗细（如 0.65mm）',
    color           VARCHAR(30)           COMMENT '颜色',
    type            VARCHAR(20)  NOT NULL COMMENT '类型 tennis/badminton',
    min_stock       INT DEFAULT 0          COMMENT '最低库存预警线（条）',
    deleted         TINYINT DEFAULT 0      COMMENT '删除标记 0-正常 1-已删',
    create_time     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_brand_model (brand, model),
    INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='线材字典';

-- 2. 供应商
CREATE TABLE IF NOT EXISTS tb_supplier (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    name            VARCHAR(100) NOT NULL COMMENT '供应商名称',
    contact         VARCHAR(50)           COMMENT '联络人',
    phone           VARCHAR(20)           COMMENT '电话',
    payment_method  VARCHAR(20)           COMMENT '支付方式 cash/transfer/monthly',
    remark          VARCHAR(500)          COMMENT '备注',
    deleted         TINYINT DEFAULT 0      COMMENT '删除标记 0-正常 1-已删',
    create_time     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='供应商表';

-- 3. 进货记录（批次计价）
CREATE TABLE IF NOT EXISTS tb_purchase (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    wire_id         BIGINT       NOT NULL COMMENT '线材ID',
    supplier_id     BIGINT       NOT NULL COMMENT '供应商ID',
    purchase_date   DATE         NOT NULL COMMENT '进货日期',
    quantity        INT          NOT NULL COMMENT '数量（条）',
    unit_price      DECIMAL(10,2) NOT NULL COMMENT '单价（元）',
    total_price     DECIMAL(12,2) NOT NULL COMMENT '总价（元）',
    payment_method  VARCHAR(20)           COMMENT '付款方式',
    batch_no        VARCHAR(30)  NOT NULL COMMENT '批次号（如 YNK-20260612-001）',
    remark          VARCHAR(500)          COMMENT '备注',
    deleted         TINYINT DEFAULT 0      COMMENT '删除标记 0-正常 1-已删',
    create_time     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_wire_id (wire_id),
    INDEX idx_supplier_id (supplier_id),
    INDEX idx_purchase_date (purchase_date),
    INDEX idx_batch_no (batch_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='进货记录表';

-- 4. 正常消耗记录
CREATE TABLE IF NOT EXISTS tb_usage (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    wire_id         BIGINT       NOT NULL COMMENT '线材ID',
    usage_date      DATE         NOT NULL COMMENT '消耗日期',
    quantity        INT          NOT NULL COMMENT '消耗数量（条）',
    usage_type      VARCHAR(20)  NOT NULL DEFAULT 'service' COMMENT '用途类型 service-服务消耗',
    related_order   VARCHAR(64)           COMMENT '关联服务单号',
    operator        VARCHAR(50)           COMMENT '操作人',
    remark          VARCHAR(500)          COMMENT '备注',
    deleted         TINYINT DEFAULT 0      COMMENT '删除标记 0-正常 1-已删',
    create_time     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_wire_id (wire_id),
    INDEX idx_usage_date (usage_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='消耗记录表';

-- 5. 报废消耗记录
CREATE TABLE IF NOT EXISTS tb_waste (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    wire_id         BIGINT       NOT NULL COMMENT '线材ID',
    waste_date      DATE         NOT NULL COMMENT '报废日期',
    quantity        INT          NOT NULL COMMENT '报废数量（条）',
    reason          VARCHAR(50)  NOT NULL COMMENT '原因 break-断裂 knot-打结 human-人为损坏 other-其他',
    operator        VARCHAR(50)           COMMENT '操作人',
    remark          VARCHAR(500)          COMMENT '备注',
    deleted         TINYINT DEFAULT 0      COMMENT '删除标记 0-正常 1-已删',
    create_time     DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_wire_id (wire_id),
    INDEX idx_waste_date (waste_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='报废记录表';

-- ============================================
-- 线材管理 — 初始数据
-- ============================================

-- 线材
INSERT INTO tb_wire (brand, model, spec, color, type, min_stock) VALUES
('Yonex', 'BG-80', '0.68mm', '白色', 'badminton', 5),
('Yonex', 'BG-65', '0.70mm', '蓝色', 'badminton', 5),
('李宁', 'N90-III', '0.65mm', '黄色', 'badminton', 3),
('Wilson', 'Sensation', '1.25mm', '黑色', 'tennis', 3),
('Luxilon', 'ALU Power', '1.25mm', '银色', 'tennis', 3),
('尤尼克斯', 'AB', '0.61mm', '红色', 'badminton', 4),
('王子', 'Pro', '1.30mm', '绿色', 'tennis', 2),
('李宁', 'N55', '0.68mm', '白色', 'badminton', 5);

-- 供应商
INSERT INTO tb_supplier (name, contact, phone, payment_method, remark) VALUES
('上海羽毛球用品批发', '张经理', '138-0000-1111', 'transfer', 'Yonex 总代理'),
('北京体育器材中心', '李总', '139-0000-2222', 'monthly', '月结，量大优惠'),
('广州网球用品专卖', '王老板', '136-0000-3333', 'cash', '现场现货'),
('二手器材回收商', '赵师傅', '135-0000-4444', 'cash', '价格浮动较大');

-- 进货记录
INSERT INTO tb_purchase (wire_id, supplier_id, purchase_date, quantity, unit_price, total_price, payment_method, batch_no) VALUES
(1, 1, '2026-06-01', 20, 15.00, 300.00, 'transfer', 'YNX-20260601-001'),
(1, 1, '2026-06-10', 15, 16.00, 240.00, 'transfer', 'YNX-20260610-001'),
(2, 1, '2026-06-05', 10, 12.00, 120.00, 'transfer', 'YNX-20260605-001'),
(3, 2, '2026-06-08', 8, 18.00, 144.00, 'monthly', 'LN-20260608-001'),
(4, 3, '2026-06-03', 5, 22.00, 110.00, 'cash', 'WL-20260603-001'),
(5, 3, '2026-06-03', 3, 35.00, 105.00, 'cash', 'LX-20260603-001');

-- 消耗记录
INSERT INTO tb_usage (wire_id, usage_date, quantity, related_order, operator) VALUES
(1, '2026-06-10', 2, 'ORD-20260610-001', '张师傅'),
(1, '2026-06-11', 3, 'ORD-20260611-001', '王师傅'),
(2, '2026-06-11', 1, 'ORD-20260611-002', '张师傅'),
(3, '2026-06-12', 2, 'ORD-20260612-001', '王师傅'),
(4, '2026-06-12', 1, 'ORD-20260612-002', '李师傅');

-- 报废记录
INSERT INTO tb_waste (wire_id, waste_date, quantity, reason, operator) VALUES
(1, '2026-06-10', 1, 'knot', '张师傅'),
(1, '2026-06-11', 1, 'break', '王师傅'),
(3, '2026-06-12', 1, 'human', '王师傅');

-- ============================================
-- V2.1 新增表（二维码 + 财务 + 操作日志）
-- ============================================

-- 库存表
CREATE TABLE IF NOT EXISTS tb_inventory (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    wire_id BIGINT NOT NULL COMMENT '线材ID',
    wire_name VARCHAR(100) COMMENT '线材名称',
    wire_brand VARCHAR(50) COMMENT '品牌',
    wire_model VARCHAR(50) COMMENT '型号',
    total_purchased INT DEFAULT 0 COMMENT '总进货',
    total_used INT DEFAULT 0 COMMENT '总消耗',
    total_wasted INT DEFAULT 0 COMMENT '总报废',
    current_stock INT DEFAULT 0 COMMENT '当前库存',
    avg_cost DECIMAL(10,2) COMMENT '加权均价',
    min_stock INT DEFAULT 0 COMMENT '最低库存预警线',
    status TINYINT DEFAULT 1 COMMENT '状态 0-停用 1-启用',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    INDEX idx_wire_id (wire_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='库存表';

-- 服务进度表
CREATE TABLE IF NOT EXISTS tb_service_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    appointment_id BIGINT NOT NULL COMMENT '预约ID',
    status VARCHAR(20) NOT NULL COMMENT '状态',
    technician_id BIGINT COMMENT '技师ID',
    technician_name VARCHAR(50) COMMENT '技师姓名',
    wire_id BIGINT COMMENT '线材ID',
    wire_name VARCHAR(100) COMMENT '线材名称',
    qr_code_id BIGINT COMMENT '二维码ID',
    start_time DATETIME COMMENT '开始时间',
    estimated_end DATETIME COMMENT '预计完成',
    actual_end DATETIME COMMENT '实际完成',
    pause_reason VARCHAR(200) COMMENT '暂停原因',
    progress_note VARCHAR(500) COMMENT '进度备注',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    INDEX idx_appointment_id (appointment_id),
    INDEX idx_status (status),
    INDEX idx_technician_id (technician_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='服务进度表';

-- 服务历史表
CREATE TABLE IF NOT EXISTS tb_service_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    appointment_id BIGINT COMMENT '预约ID',
    member_id VARCHAR(64) NOT NULL COMMENT '会员ID',
    member_name VARCHAR(50) COMMENT '会员姓名',
    member_phone VARCHAR(20) COMMENT '会员电话',
    service_type VARCHAR(20) NOT NULL COMMENT '服务类型',
    service_date DATE NOT NULL COMMENT '服务日期',
    racket_brand VARCHAR(50) COMMENT '球拍品牌',
    racket_model VARCHAR(50) COMMENT '球拍型号',
    wire_id BIGINT COMMENT '线材ID',
    wire_name VARCHAR(100) COMMENT '线材名称',
    qr_code_id BIGINT COMMENT '二维码ID',
    tension INT COMMENT '磅数',
    used_length DECIMAL(6,2) COMMENT '使用长度(米)',
    cost DECIMAL(10,2) COMMENT '费用',
    technician_id BIGINT COMMENT '技师ID',
    technician_name VARCHAR(50) COMMENT '技师姓名',
    rating TINYINT COMMENT '评分(1-5)',
    review VARCHAR(500) COMMENT '评价',
    review_time DATETIME COMMENT '评价时间',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    INDEX idx_member_id (member_id),
    INDEX idx_service_date (service_date),
    INDEX idx_wire_id (wire_id),
    INDEX idx_technician_id (technician_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='服务历史表';

-- 推荐记录表
CREATE TABLE IF NOT EXISTS tb_recommendation (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    member_id VARCHAR(64) NOT NULL COMMENT '会员ID',
    rec_type VARCHAR(30) NOT NULL COMMENT '推荐类型 wire/accessory/activity',
    rec_item_id BIGINT COMMENT '推荐项目ID',
    rec_item_name VARCHAR(100) COMMENT '推荐项目名称',
    reason VARCHAR(200) COMMENT '推荐理由',
    score DECIMAL(3,2) COMMENT '推荐得分(0-1)',
    status VARCHAR(20) DEFAULT 'shown' COMMENT '状态 shown/clicked/ignored/dismissed',
    clicked_at DATETIME COMMENT '点击时间',
    dismissed_at DATETIME COMMENT '忽略时间',
    expire_at DATETIME COMMENT '过期时间',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by BIGINT COMMENT '创建人',
    INDEX idx_member_id (member_id),
    INDEX idx_rec_type (rec_type),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='推荐记录表';

-- 技师表
CREATE TABLE IF NOT EXISTS tb_technician (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    name VARCHAR(50) NOT NULL COMMENT '姓名',
    phone VARCHAR(20) UNIQUE COMMENT '手机号',
    skill_type VARCHAR(50) COMMENT '技能类型',
    work_schedule VARCHAR(200) COMMENT '排班',
    daily_avg INT DEFAULT 0 COMMENT '日均缠线量',
    total_count INT DEFAULT 0 COMMENT '累计缠线量',
    avg_wastage_rate DECIMAL(5,2) DEFAULT 0 COMMENT '平均损耗率(%)',
    avg_rating DECIMAL(3,2) DEFAULT 0 COMMENT '平均评分',
    status TINYINT DEFAULT 1 COMMENT '状态 0-离职 1-在职',
    hired_date DATE COMMENT '入职日期',
    remark VARCHAR(500) COMMENT '备注',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    INDEX idx_phone (phone),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='技师表';

-- 培训任务表
CREATE TABLE IF NOT EXISTS tb_training_task (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    technician_id BIGINT NOT NULL COMMENT '技师ID',
    technician_name VARCHAR(50) COMMENT '技师姓名',
    training_type VARCHAR(30) NOT NULL COMMENT '培训类型',
    trigger_reason VARCHAR(200) NOT NULL COMMENT '触发原因',
    status VARCHAR(20) DEFAULT 'pending' COMMENT '状态 pending/in_progress/completed',
    assigned_at DATETIME COMMENT '分配时间',
    started_at DATETIME COMMENT '开始时间',
    completed_at DATETIME COMMENT '完成时间',
    result VARCHAR(20) COMMENT '结果 passed/failed',
    score INT COMMENT '考核分数',
    note VARCHAR(500) COMMENT '备注',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    INDEX idx_technician_id (technician_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='培训任务表';

-- 二维码表
CREATE TABLE IF NOT EXISTS tb_qr_code (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    qr_code VARCHAR(64) NOT NULL UNIQUE COMMENT '二维码唯一标识',
    wire_id BIGINT NOT NULL COMMENT '线材ID',
    wire_name VARCHAR(100) COMMENT '线材名称',
    wire_brand VARCHAR(50) COMMENT '品牌',
    wire_model VARCHAR(50) COMMENT '型号',
    purchase_id BIGINT NOT NULL COMMENT '进货记录ID',
    batch_no VARCHAR(30) COMMENT '批次号',
    spool_no INT NOT NULL COMMENT '卷号',
    total_spools INT COMMENT '总卷数',
    wire_length DECIMAL(6,2) COMMENT '单卷长度(米)',
    status VARCHAR(20) DEFAULT 'unused' COMMENT '状态 unused/using/used/damaged',
    print_count INT DEFAULT 0 COMMENT '打印次数',
    printed_at DATETIME COMMENT '首次打印时间',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    INDEX idx_qr_code (qr_code),
    INDEX idx_wire_id (wire_id),
    INDEX idx_purchase_id (purchase_id),
    INDEX idx_batch_no (batch_no),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='二维码表';

-- 扫码记录表
CREATE TABLE IF NOT EXISTS tb_qr_scan_record (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    qr_code_id BIGINT NOT NULL COMMENT '二维码ID',
    qr_code VARCHAR(64) COMMENT '二维码标识',
    action VARCHAR(20) NOT NULL COMMENT '动作 scan_start/scan_end/damage',
    service_history_id BIGINT COMMENT '关联服务记录',
    appointment_id BIGINT COMMENT '关联预约',
    member_id VARCHAR(64) COMMENT '服务会员',
    member_name VARCHAR(50) COMMENT '会员姓名',
    technician_id BIGINT COMMENT '操作技师',
    technician_name VARCHAR(50) COMMENT '技师姓名',
    used_length DECIMAL(6,2) COMMENT '本次使用长度(米)',
    remaining_length DECIMAL(6,2) COMMENT '剩余长度(米)',
    is_offline TINYINT DEFAULT 0 COMMENT '是否离线扫码',
    sync_time DATETIME COMMENT '同步时间',
    note VARCHAR(500) COMMENT '备注',
    scan_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '扫码时间',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by BIGINT COMMENT '创建人',
    INDEX idx_qr_code_id (qr_code_id),
    INDEX idx_action (action),
    INDEX idx_service_history_id (service_history_id),
    INDEX idx_technician_id (technician_id),
    INDEX idx_scan_time (scan_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='扫码记录表';

-- 预约表（V2.1 重建）
DROP TABLE IF EXISTS tb_appointment;
CREATE TABLE IF NOT EXISTS tb_appointment (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    member_id VARCHAR(64) NOT NULL COMMENT '会员ID',
    member_name VARCHAR(50) COMMENT '会员姓名',
    member_phone VARCHAR(20) COMMENT '会员电话',
    service_type VARCHAR(20) NOT NULL COMMENT '服务类型 badminton/tennis',
    appointment_date DATE NOT NULL COMMENT '预约日期',
    time_slot VARCHAR(20) NOT NULL COMMENT '预约时段',
    technician_id BIGINT COMMENT '指定技师ID',
    technician_name VARCHAR(50) COMMENT '技师姓名',
    racket_count INT DEFAULT 1 COMMENT '球拍数量',
    current_tension INT COMMENT '当前磅数',
    expected_tension INT COMMENT '期望磅数',
    wire_id BIGINT COMMENT '指定线材ID',
    wire_name VARCHAR(100) COMMENT '线材名称',
    special_requirements VARCHAR(500) COMMENT '特殊要求',
    status VARCHAR(20) DEFAULT 'pending' COMMENT '状态 pending/confirmed/in_progress/completed/cancelled',
    cancel_reason VARCHAR(200) COMMENT '取消原因',
    remark VARCHAR(500) COMMENT '备注',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    INDEX idx_member_id (member_id),
    INDEX idx_appointment_date (appointment_date),
    INDEX idx_status (status),
    INDEX idx_technician_id (technician_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='预约表';

-- 利润分析表
CREATE TABLE IF NOT EXISTS tb_profit_analysis (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    analysis_type VARCHAR(30) NOT NULL COMMENT '分析类型 service/technician/customer/time',
    dimension_value VARCHAR(50) NOT NULL COMMENT '维度值',
    dimension_label VARCHAR(100) COMMENT '维度标签',
    revenue DECIMAL(12,2) DEFAULT 0 COMMENT '收入',
    material_cost DECIMAL(12,2) DEFAULT 0 COMMENT '材料成本',
    labor_cost DECIMAL(12,2) DEFAULT 0 COMMENT '人工成本',
    gross_profit DECIMAL(12,2) DEFAULT 0 COMMENT '毛利',
    gross_margin DECIMAL(5,2) DEFAULT 0 COMMENT '毛利率(%)',
    order_count INT DEFAULT 0 COMMENT '订单数',
    avg_order_value DECIMAL(10,2) DEFAULT 0 COMMENT '客单价',
    period_start DATE NOT NULL COMMENT '统计起始',
    period_end DATE NOT NULL COMMENT '统计截止',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by BIGINT COMMENT '创建人',
    INDEX idx_analysis_type (analysis_type),
    INDEX idx_dimension_value (dimension_value),
    INDEX idx_period (period_start, period_end)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='利润分析表';

-- 应付账款表
CREATE TABLE IF NOT EXISTS tb_payable (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    supplier_id BIGINT NOT NULL COMMENT '供应商ID',
    supplier_name VARCHAR(100) COMMENT '供应商名称',
    purchase_id BIGINT COMMENT '关联进货记录',
    total_payable DECIMAL(12,2) NOT NULL COMMENT '应付总额',
    paid_amount DECIMAL(12,2) DEFAULT 0 COMMENT '已付金额',
    remaining_amount DECIMAL(12,2) COMMENT '未付金额',
    credit_days INT DEFAULT 30 COMMENT '账期天数',
    due_date DATE NOT NULL COMMENT '到期日期',
    status VARCHAR(20) DEFAULT 'unpaid' COMMENT '状态 unpaid/partial/paid/overdue',
    remark VARCHAR(500) COMMENT '备注',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    INDEX idx_supplier_id (supplier_id),
    INDEX idx_status (status),
    INDEX idx_due_date (due_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='应付账款表';

-- 付款记录表
CREATE TABLE IF NOT EXISTS tb_payable_record (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    payable_id BIGINT NOT NULL COMMENT '应付账款ID',
    supplier_id BIGINT NOT NULL COMMENT '供应商ID',
    paid_amount DECIMAL(12,2) NOT NULL COMMENT '本次付款金额',
    paid_method VARCHAR(20) COMMENT '付款方式',
    paid_by BIGINT COMMENT '付款人',
    paid_by_name VARCHAR(50) COMMENT '付款人姓名',
    paid_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '付款时间',
    remark VARCHAR(500) COMMENT '备注',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by BIGINT COMMENT '创建人',
    INDEX idx_payable_id (payable_id),
    INDEX idx_supplier_id (supplier_id),
    INDEX idx_paid_at (paid_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='付款记录表';

-- 价格趋势表
CREATE TABLE IF NOT EXISTS tb_price_trend (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    wire_id BIGINT NOT NULL COMMENT '线材ID',
    wire_name VARCHAR(100) COMMENT '线材名称',
    supplier_id BIGINT COMMENT '供应商ID',
    supplier_name VARCHAR(100) COMMENT '供应商名称',
    price DECIMAL(10,2) NOT NULL COMMENT '进货价格',
    quantity INT COMMENT '进货数量',
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '记录时间',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by BIGINT COMMENT '创建人',
    INDEX idx_wire_id (wire_id),
    INDEX idx_supplier_id (supplier_id),
    INDEX idx_recorded_at (recorded_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='价格趋势表';

-- 盈亏平衡表
CREATE TABLE IF NOT EXISTS tb_break_even (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    period VARCHAR(7) NOT NULL UNIQUE COMMENT '统计周期 YYYY-MM',
    fixed_cost DECIMAL(12,2) NOT NULL COMMENT '固定成本',
    variable_cost DECIMAL(12,2) NOT NULL COMMENT '变动成本',
    total_revenue DECIMAL(12,2) NOT NULL COMMENT '总收入',
    break_even_orders INT COMMENT '保本订单数',
    break_even_revenue DECIMAL(12,2) COMMENT '保本收入',
    actual_orders INT COMMENT '实际订单数',
    actual_profit DECIMAL(12,2) COMMENT '实际利润',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by BIGINT COMMENT '创建人',
    INDEX idx_period (period)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='盈亏平衡表';

-- 损耗归因表
CREATE TABLE IF NOT EXISTS tb_wastage_attribution (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    wire_id BIGINT NOT NULL COMMENT '线材ID',
    wire_name VARCHAR(100) COMMENT '线材名称',
    technician_id BIGINT COMMENT '技师ID',
    technician_name VARCHAR(50) COMMENT '技师姓名',
    reason VARCHAR(50) NOT NULL COMMENT '损耗原因',
    wastage_qty INT NOT NULL COMMENT '损耗数量',
    service_date DATE NOT NULL COMMENT '服务日期',
    service_history_id BIGINT COMMENT '关联服务记录',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by BIGINT COMMENT '创建人',
    INDEX idx_wire_id (wire_id),
    INDEX idx_technician_id (technician_id),
    INDEX idx_reason (reason),
    INDEX idx_service_date (service_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='损耗归因表';

-- 库存建议表
CREATE TABLE IF NOT EXISTS tb_inventory_suggestion (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    wire_id BIGINT NOT NULL COMMENT '线材ID',
    wire_name VARCHAR(100) COMMENT '线材名称',
    avg_daily_usage DECIMAL(8,2) COMMENT '日均消耗量',
    safety_stock INT COMMENT '安全库存',
    reorder_point INT COMMENT '再订货点',
    suggested_qty INT COMMENT '建议采购量',
    lead_time_days INT COMMENT '到货周期(天)',
    last_calculated_at DATETIME COMMENT '最近计算时间',
    status TINYINT DEFAULT 1 COMMENT '状态 0-已处理 1-待处理',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    INDEX idx_wire_id (wire_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='库存建议表';

-- 库存盘点表
CREATE TABLE IF NOT EXISTS tb_inventory_check (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    check_no VARCHAR(30) NOT NULL UNIQUE COMMENT '盘点单号',
    wire_id BIGINT NOT NULL COMMENT '线材ID',
    wire_name VARCHAR(100) COMMENT '线材名称',
    system_qty INT NOT NULL COMMENT '系统库存',
    actual_qty INT NOT NULL COMMENT '实际库存',
    diff_qty INT COMMENT '差异数量',
    diff_reason VARCHAR(200) COMMENT '差异原因',
    status VARCHAR(20) DEFAULT 'checking' COMMENT '状态 checking/completed/adjusted',
    checked_by BIGINT COMMENT '盘点人',
    checked_at DATETIME COMMENT '盘点时间',
    completed_at DATETIME COMMENT '完成时间',
    remark VARCHAR(500) COMMENT '备注',
    deleted TINYINT DEFAULT 0 COMMENT '删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by BIGINT COMMENT '创建人',
    INDEX idx_check_no (check_no),
    INDEX idx_wire_id (wire_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='库存盘点表';

-- 操作日志表
CREATE TABLE IF NOT EXISTS tb_operation_log (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    operator_id BIGINT NOT NULL COMMENT '操作人ID',
    operator_name VARCHAR(50) COMMENT '操作人姓名',
    module VARCHAR(50) NOT NULL COMMENT '操作模块',
    action VARCHAR(50) NOT NULL COMMENT '操作类型',
    target_type VARCHAR(50) COMMENT '目标类型',
    target_id VARCHAR(64) COMMENT '目标ID',
    description VARCHAR(500) COMMENT '操作描述',
    before_value TEXT COMMENT '变更前值',
    after_value TEXT COMMENT '变更后值',
    ip_address VARCHAR(50) COMMENT '操作IP',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
    INDEX idx_operator_id (operator_id),
    INDEX idx_module (module),
    INDEX idx_action (action),
    INDEX idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='操作日志表';

-- 字典类型表
CREATE TABLE IF NOT EXISTS tb_dict_type (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    type_code VARCHAR(50) NOT NULL UNIQUE COMMENT '类型编码',
    type_name VARCHAR(100) NOT NULL COMMENT '类型名称',
    remark VARCHAR(500) COMMENT '备注',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX idx_type_code (type_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='字典类型表';

-- 字典数据表
CREATE TABLE IF NOT EXISTS tb_dict_data (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    dict_type VARCHAR(50) NOT NULL COMMENT '字典类型',
    dict_code VARCHAR(50) NOT NULL COMMENT '字典编码',
    dict_label VARCHAR(100) NOT NULL COMMENT '字典标签',
    sort_order INT DEFAULT 0 COMMENT '排序',
    status TINYINT DEFAULT 1 COMMENT '状态 0-禁用 1-启用',
    remark VARCHAR(500) COMMENT '备注',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX idx_dict_type (dict_type),
    INDEX idx_dict_code (dict_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='字典数据表';

-- ============================================
-- 索引优化
-- ============================================

-- 积分记录：按会员+时间查询
ALTER TABLE tb_points_record ADD INDEX idx_member_time (member_id, create_time);

-- 服务历史：按会员+日期查询
ALTER TABLE tb_service_history ADD INDEX idx_member_date (member_id, service_date);

-- 预约：按日期+状态查询
ALTER TABLE tb_appointment ADD INDEX idx_date_status (appointment_date, status);

-- 进货记录：按线材+日期查询
ALTER TABLE tb_purchase ADD INDEX idx_wire_date (wire_id, purchase_date);

-- 消耗记录：按线材+日期查询
ALTER TABLE tb_usage ADD INDEX idx_wire_date (wire_id, usage_date);

-- 报废记录：按线材+日期查询
ALTER TABLE tb_waste ADD INDEX idx_wire_date (wire_id, waste_date);

-- 应付账款：按供应商+状态查询
ALTER TABLE tb_payable ADD INDEX idx_supplier_status (supplier_id, status);

-- 库存：按线材唯一查询
ALTER TABLE tb_inventory ADD UNIQUE INDEX uk_wire_id (wire_id);
